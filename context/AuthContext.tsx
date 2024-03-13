'use client'
import React, { useState, useContext, createContext, useEffect } from 'react';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    UserCredential,
    GoogleAuthProvider,
    signInWithPopup,
    getRedirectResult,
    sendEmailVerification,
    sendPasswordResetEmail,
    updateProfile
} 
from 'firebase/auth';

import { auth, db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';



const AuthContext = createContext<{
    user: User | null,
    signUp: (email: string, password: string,name:string) => void,
    logIn: (email: string, password: string) => Promise<UserCredential>,
    logOut: () => Promise<void>,
    GoogleAuth: () => Promise<UserCredential> 
    ForgotPassword: (email: string) => Promise<void> 
    error:string|null
} | null>(null);


export function AuthContextProvider({children}:{children:React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const unsubcribe = onAuthStateChanged(auth,(currentUser)=>{
        return setUser(currentUser)
      })
    
      return () => {
        unsubcribe();
      }
    }, [])
    

    async function signUp(email: string, password: string, name?: string ) {
        try {
            const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db,"users", email),{
              watchLater:[]
            })
            await updateProfile(newUserCredential.user, { displayName: name });
            await sendEmailVerification(newUserCredential.user);

        } catch (error:any) {
          setError(error?.message);
        }
    }

    async function ForgotPassword(email:string) {
      sendPasswordResetEmail(auth,email).then(()=>{
        alert('password reset link has been sent')
      })
      .catch((error)=>{
        setError(error.message);
        throw error;
      })
    } 

    async function GoogleAuth(){
        const provider = new GoogleAuthProvider();

        try {
          const result = await signInWithPopup(auth, provider);
          if (result.user.email) {
            await setDoc(doc(db, "users", result.user.email), {
              watchLater: []
            });
          } else {
            console.error("User email is null")
            throw new Error("User email is null")
          }
           return result
     
        } catch (error:any) {
          setError(error?.message);
        throw error;
        }

    }

    async function logIn(email: string, password: string): Promise<UserCredential> {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential
        } catch (error: any) {
            setError(error?.message);
            throw error;
        }
    }
    
    function logOut(){
        return signOut(auth)
    }
    
    


  return (<AuthContext.Provider value={{user,signUp,logIn,logOut,GoogleAuth,ForgotPassword,error}}>{children}</AuthContext.Provider>)
}

export function UserAuth(){
  const context = useContext(AuthContext);
  
  return {
      ...context,
      error: context?.error
  };
}
