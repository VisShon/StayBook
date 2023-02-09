import { auth } from "../app/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import Button from "../components/Button";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export type AuthContextProps = {
  username: string | undefined;
  profilePicture: string | undefined;
  userToken: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  Login: Function;
  Logout: Function;
  createUserWithEmail: Function;
  signInWithEmail: Function;
  addName: Function;
};

type props = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({ children }: props) => {
  const Login = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const Logout = () => {
    return auth.signOut();
  };

  const createUserWithEmail = (email: any, password: any) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const addName = (username: any) => {
    if (!auth.currentUser) {
      console.log("Returning null")
      return null;
    }
    setUsername(username);
    console.log("Returning updateProfile");
    return updateProfile(auth.currentUser, {
      displayName: username,
    });
  };

  const signInWithEmail = (email: any, password: any) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const [username, setUsername] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [phone, setPhone] = useState<string | undefined>();
  const [profilePicture, setProfilePicture] = useState<string | undefined>();
  const [userToken, setUserToken] = useState<string | undefined>();

  useEffect(() => {
    const unscubscribe = auth.onAuthStateChanged((user) => {
      setUsername(user?.displayName!);
      setEmail(user?.email!);
      sessionStorage.setItem("email", user?.email!);
      setPhone(user?.phoneNumber!);
      setProfilePicture(user?.photoURL!);
      user?.getIdToken().then((idToken) => {
        setUserToken(idToken);
        sessionStorage.setItem("user", idToken);
      });
    });
    return unscubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        username,
        email,
        phone,
        Login,
        Logout,
        createUserWithEmail,
        signInWithEmail,
        profilePicture,
        userToken,
        addName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
