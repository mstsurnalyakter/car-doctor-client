import { createContext, useEffect, useState } from "react"
import {createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import PropTypes from 'prop-types'
import auth from "../firebase/firebase.config";


export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
      return createUserWithEmailAndPassword(auth, email, password);
    };

    const authInfo = {
        user,
        loading,
        createUser
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            if (user) {
                setUser(user)
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
