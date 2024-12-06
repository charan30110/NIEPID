import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

function PrivateRoute() {

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const generateError = (error) => {
        toast.error(error, {
            position: "top-right",
        });
    }

    useEffect(() => {
        if (!token || token.trim() === '') {
            generateError("Not Authorized")
            navigate('/');
        }
    },[navigate,token]);
    
    return (
        <>
            {localStorage.getItem('token') ? <Outlet /> : null}
        </>
    );
}

export default PrivateRoute;
