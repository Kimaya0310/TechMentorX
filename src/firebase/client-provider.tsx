'use client';

import { useState, useEffect } from 'react';
import { initializeFirebase } from '.';
import { FirebaseProvider } from './provider';
import { UserProvider } from './auth/use-user';

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [firebaseInstances, setFirebaseInstances] = useState<ReturnType<
    typeof initializeFirebase
  > | null>(null);

  useEffect(() => {
    // Initialize Firebase on the client side
    const instances = initializeFirebase();
    setFirebaseInstances(instances);
  }, []);

  if (!firebaseInstances) {
    // You can render a loading state here if needed
    return null;
  }

  return (
    <FirebaseProvider {...firebaseInstances}>
      <UserProvider>{children}</UserProvider>
    </FirebaseProvider>
  );
}
