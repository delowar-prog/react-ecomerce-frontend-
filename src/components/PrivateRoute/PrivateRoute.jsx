import AuthContext from '@/context/AuthProvider';
import React, { useContext } from 'react';
import { Skeleton } from '../ui/skeleton';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {auth,loading} = useContext(AuthContext);
    const location = useLocation();
  if(loading){
  return  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
  }
  if (auth?.user) {
    return children;
  }
  return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;