import React from 'react'
import { Navigate, Outlet} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = () => {
    const { authData } = useAuth();

    return (
        authData?.accessToken
            ? <Outlet/>
            : <Navigate to='/login'/>
    );
}

export default RequireAuth