'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      console.error('Firestore Permission Error:', error.toMetric());
      
      toast({
        variant: 'destructive',
        title: 'Permission Denied',
        description: error.message,
      });

      // In a development environment, you could throw the error
      // to make it visible in the Next.js overlay.
      if (process.env.NODE_ENV === 'development') {
        // This will be caught by the Next.js error overlay.
        throw error;
      }
    };

    errorEmitter.on('permission-error', handlePermissionError);

    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [toast]);

  return null;
}
