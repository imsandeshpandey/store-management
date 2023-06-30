/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useApp } from 'contexts';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import Flex from 'components/basic-components/Flex';
import { CircularProgress } from '@mui/joy';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, db } from 'firebase-local';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const googleProvider = new GoogleAuthProvider();
export const AuthProvider = ({ children }) => {
  const { appLoading, setAppLoading, userAgent, setLoginError } = useApp();
  const [user, setUser] = useState(null);

  const signInFunc = userAgent === 'mobile' ? signInWithRedirect : signInWithPopup;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (appUser) => {
      if (appUser) {
        const userRef = doc(db, 'users', appUser.email);
        const docSnap = await getDoc(userRef);
        setUser({ ...appUser, access: docSnap.data()?.access });
      } else {
        setUser(null);
      }
      setAppLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, 'users', user?.email), (doc) => {
        setUser({ ...user, access: doc?.data()?.access });
      });
      return unsub;
    }
  }, [user?.access]);

  const setUserData = async (user) => {
    const ref = doc(db, 'users', user.email);
    const docSnap = await getDoc(ref);

    try {
      if (!docSnap.exists()) {
        await setDoc(ref, {
          access: false,
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          provider: 'Google',
          role: '',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async (callback) => {
    setAppLoading(true);
    try {
      await auth.signOut();
      setLoginError(null);
      callback();
    } catch (error) {
      console.log(error);
    } finally {
      setAppLoading(false);
    }
  };

  const signInWithGoogle = async (callback) => {
    setAppLoading(true);
    try {
      const res = await signInFunc(auth, googleProvider);
      const user = res.user;
      setUserData(user);
      callback(user);
      setAppLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setAppLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signOut,
      }}>
      {appLoading ? (
        <Flex height="100vh" width="100vw" center>
          <CircularProgress size="lg" />
        </Flex>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
