/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useApp } from 'contexts/AppState.context.jsx';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import Flex from 'components/basic-components/Flex';
import { CircularProgress } from '@mui/joy';
import { auth, db } from '../../firebase/firebase.config';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
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

  const addUserToFirestore = async (user) => {
    const userRef = doc(db, 'users', user.email);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      const { displayName, email, photoURL, uid } = user;
      const createdAt = serverTimestamp();
      try {
        await setDoc(userRef, {
          displayName,
          email,
          photoURL,
          createdAt,
          uid,
          access: false,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const signInWithGoogle = async () => {
    setAppLoading(true);
    try {
      const { user } = await signInFunc(auth, googleProvider);
      const userRef = doc(db, 'users', user.email);
      const docSnap = await getDoc(userRef);
      !docSnap.exists() && addUserToFirestore(user);
      return user;
    } catch (error) {
      console.log(error);
    } finally {
      setAppLoading(false);
    }
  };

  const signOut = async () => {
    setAppLoading(true);
    try {
      await auth.signOut();
      setLoginError(null);
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
