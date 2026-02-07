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
} from 'firebase/firestore';
import { useFirestore } from '../provider';

export interface UseCollectionOptions {
  where?: [string, any, any][];
  orderBy?: [string, 'asc' | 'desc'];
  limit?: number;
  startAfter?: any;
  endBefore?: any;
  startAt?: any;
}

export function useCollection<T = DocumentData>(
  collectionPath: string,
  options: UseCollectionOptions = {}
) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (!firestore) return;

    let q: Query<DocumentData> = collection(firestore, collectionPath);

    if (options.where) {
      options.where.forEach((w) => {
        q = query(q, where(w[0], w[1], w[2]));
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
      // When using endBefore, we usually want the last N documents.
      // You might need to adjust this logic based on your pagination needs.
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
      },
      (err: FirestoreError) => {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore, collectionPath, JSON.stringify(options)]); // Deep compare options

  return { data, loading, error };
}
