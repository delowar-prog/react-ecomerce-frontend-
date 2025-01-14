import { useState } from 'react'
import { AuthContext } from '../context'

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [Loading, setLoading] = useState(true);
    const authInfo = { user, setUser, Loading, setLoading, isLoggedIn, setIsLoggedIn };

  return (
    <AuthContext.Provider value={authInfo}>
    {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider