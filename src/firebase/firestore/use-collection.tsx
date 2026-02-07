
'use client';

import { useState, useEffect } from 'react';
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  endBefore,
  limitToLast,
  startAt,
  Query,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
  WhereFilterOp,
  OrderByDirection,
} from 'firebase/firestore';
import { useFirestore } from '../provider';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

export interface UseCollectionOptions {
  where?: [string, WhereFilterOp, any][];
  orderBy?: [string, OrderByDirection];
  limit?: number;
  startAfter?: any;
  endBefore?: any;
  startAt?: any;
}

export function useCollection<T = DocumentData>(
  collectionPath: string | null,
  options: UseCollectionOptions = {}
) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (!firestore || !collectionPath) {
        setLoading(false);
        setData(null);
        return;
    }

    let q: Query<DocumentData> = collection(firestore, collectionPath);

    if (options.where) {
      options.where.forEach((w) => {
        // Do not add where clauses with empty values, as it throws an error
        if (w[2] !== '' && w[2] !== undefined && w[2] !== null) {
          q = query(q, where(w[0], w[1], w[2]));
        }
      });
    }

    if (options.orderBy) {
      q = query(q, orderBy(options.orderBy[0], options.orderBy[1]));
    }
    
    if (options.startAt) {
        q = query(q, startAt(options.startAt));
    }
    
    if (options.startAfter) {
      q = query(q, startAfter(options.startAfter));
    }

    if (options.endBefore) {
        q = query(q, endBefore(options.endBefore));
    }

    if (options.limit) {
      q = query(q, limit(options.limit));
    } else if (options.endBefore) {
      q = query(q, limitToLast(25)); 
    }


    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const docs = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as T)
        );
        setData(docs);
        setLoading(false);
        setError(null);
      },
      (err: FirestoreError) => {
        const permissionError = new FirestorePermissionError({
            path: collectionPath,
            operation: 'list',
        }, err);
        errorEmitter.emit('permission-error', permissionError);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore, collectionPath, JSON.stringify(options)]); // Deep compare options

  return { data, loading, error };
}
