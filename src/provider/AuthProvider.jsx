import { createContext } from "react"
import PropTypes from 'prop-types'


export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {

    const authInfo = {
        name:"alex"
    }

  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
    children:PropTypes.children.node
}

export default AuthProvider
