'use client';

import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot, DocumentData, Firestore } from 'firebase/firestore';
import { useAuth, useFirestore } from '@/firebase/provider';

// Augment the Firebase User type with our custom profile data
export type AppUser = User & DocumentData;

const UserContext = createContext<{ user: AppUser | null; loading: boolean }>({
  user: null,
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const firestore = useFirestore();
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth || !firestore) {
      // Firebase services might not be available yet
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in, listen to their profile document
        const userDocRef = doc(firestore as Firestore, `users/${authUser.uid}`);
        const unsubSnapshot = onSnapshot(userDocRef, (userDoc) => {
          if (userDoc.exists()) {
            // Combine auth data with Firestore data
            setUser({ ...authUser, ...userDoc.data() } as AppUser);
          } else {
            // This case can happen during signup before the doc is created
            // or if the doc is deleted. We'll provide the basic auth user.
            setUser(authUser as AppUser);
          }
          setLoading(false);
        });
        return () => unsubSnapshot(); // Unsubscribe from the document snapshot
      } else {
        // User is signed out
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Unsubscribe from auth state changes
  }, [auth, firestore]);

  const value = useMemo(() => ({ user, loading }), [user, loading]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
