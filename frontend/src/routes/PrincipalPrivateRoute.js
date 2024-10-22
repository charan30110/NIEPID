import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {  toast } from "react-toastify";

function PrincipalPrivateRoute() {

    const generateError = (error) =>
        toast.error(error, {
          position: "top-right",
        });

  const role = localStorage.getItem('role');

  if (role.trim() !== 'principal') {
    generateError("Not a Principal");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PrincipalPrivateRoute;
