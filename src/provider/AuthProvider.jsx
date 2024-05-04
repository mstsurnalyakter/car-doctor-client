import { createContext, useEffect, useState } from "react"
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

import PropTypes from 'prop-types'
import auth from "../firebase/firebase.config";


export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true)
      return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () =>{
      return signOut(auth)
    }

    const authInfo = {
      user,
      loading,
      createUser,
      signIn,
      logout,
    };

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            if (currentUser) {
              setUser(currentUser);
              console.log(currentUser);
            }
            setLoading(false)
        })
        return () => unsubscribe();
    },[])

  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
    children:PropTypes.node
}

export default AuthProvider
