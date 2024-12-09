import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from "react-toastify";

function AdminPrivateRoute() {

  const generateError = (error) => {
    toast.dismiss()
    toast.error(error, {
      position: "top-right",
    });
  }
  
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    if (!role || role.trim() !== 'admin' || !userId) {
      generateError("Not a Admin");
    }
  }, [role, userId])

  if (!role || !userId) {
    return <Navigate to="/" replace />
  }

  if (role.trim() !== 'admin') {
    const path = "/" + role.trim();
    return <Navigate to={path} replace />;
  }

  return <Outlet />;
}

export default AdminPrivateRoute;
