import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from "react-toastify";

function PrincipalPrivateRoute() {

  const generateError = (error) => {
    toast.dismiss()
    toast.error(error, {
      position: "top-right",
    });
  }

  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    if (!role || role.trim() !== 'principal') {
      generateError("Not a Principal");
    }
  })

  if (!role || !userId) {
    return <Navigate to="/" replace />
  }

  if (role.trim() !== 'principal') {
    const path = "/" + role.trim();
    return <Navigate to={path} replace />;
  }

  return <Outlet />;
}

export default PrincipalPrivateRoute;
