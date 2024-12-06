import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

function PrivateRoute() {

    const navigate = useNavigate();
    const [cookies, ,removeCookies] = useCookies();
    const token = localStorage.getItem('token');

    const generateError = (error) => {
        toast.error(error, {
            position: "top-right",
        });
    }

    useEffect(() => {
        if (!cookies.jwt || !cookies.jwt.trim()) {
            removeCookies("jwt")
            localStorage.clear()
            generateError("Not Authorized")
            navigate('/');
        }
    },[navigate,token,cookies,removeCookies]);
    
    return (
        <>
            {cookies.jwt ? <Outlet /> : null}
        </>
    );
}

export default PrivateRoute;
