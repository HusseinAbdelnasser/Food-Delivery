import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facbookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart,setCart] = useState([])

  

  // Fetch cart data from the backend
  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:6001/carts?email=${user?.email}`);
        const data = await response.json();
        console.log(data)
        setCart(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });

  // create an account
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // signup with gmail
  const signUpWithGmail = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // signup with facebook
  const signupWithFacebook = () => {
    setLoading(true);
    return signInWithPopup(auth, facbookProvider);
  };

  // signup with github
  const signupWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  // login using email & password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout
  const logOut = () => {
    return signOut(auth);
  };

  // update profile
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // check signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      return unsubscribe();
    };
  }, []);


  const authInfo = {
    user,
    createUser,
    signUpWithGmail,
    signupWithFacebook,
    signupWithGithub,
    login,
    logOut,
    updateUserProfile,
    loading,
    cart
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
