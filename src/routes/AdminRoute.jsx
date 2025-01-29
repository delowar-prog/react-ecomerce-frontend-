import { useContext } from 'react'
import { AuthContext } from '../Provider/AuthProvider'
import { Navigate } from 'react-router-dom'
import useAdmin from '../hooks/useAdmin'

const AdminRoute = ({children}) => {
    const {user, loading}=useContext(AuthContext)
    const [isAdmin, isAdminLoading]=useAdmin()
    if(loading || isAdminLoading){
        return <p>Loading...</p>
    }
    if(user && isAdmin){
        return children
    }

  return <Navigate to="/"></Navigate>
}

export default AdminRoute
