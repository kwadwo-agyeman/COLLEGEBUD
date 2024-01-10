import React from 'react';
import { useLocation,Navigate,Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ControlAcess = () => {
    const {auth} = useAuth();
    const location = useLocation();
  return (
    auth?.username ?
    <Outlet/> : <Navigate to="/" state={{from: location}} replace/>
  )
}

export default ControlAcess
