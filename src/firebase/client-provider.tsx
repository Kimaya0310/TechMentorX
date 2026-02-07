
'use client';

import { useState, useEffect } from 'react';
import { initializeFirebase } from '.';
import { FirebaseProvider } from './provider';
import { UserProvider } from './auth/use-user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [firebaseInstances, setFirebaseInstances] = useState<ReturnType<
    typeof initializeFirebase
  > | null>(null);
  const [configError, setConfigError] = useState(false);

  useEffect(() => {
    // Initialize Firebase on the client side
    const instances = initializeFirebase();
    if (instances) {
      setFirebaseInstances(instances);
    } else {
      setConfigError(true);
    }
  }, []);

  if (configError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-secondary">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Firebase Configuration Error</CardTitle>
            <CardDescription>
              The application failed to connect to Firebase.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Please ensure your Firebase environment variables (e.g., <code>NEXT_PUBLIC_FIREBASE_API_KEY</code>) are correctly set in your project environment. The app cannot function without them.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!firebaseInstances) {
    // Render a loading state while Firebase is initializing
    return null;
  }

  return (
    <FirebaseProvider {...firebaseInstances}>
      <UserProvider>{children}</UserProvider>
    </FirebaseProvider>
  );
}
