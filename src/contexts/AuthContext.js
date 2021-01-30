import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthUser(user);
      setLoading(false);
    });

    return unsubscribe; //unsubscribe from user whenever component is unmounted
  }, []);

  const value = {
    authUser,
    signUp,
    login,
    logout,
    resetPassword,
    setAuthUser,
  };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
