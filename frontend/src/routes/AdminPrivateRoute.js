import React,{useEffect} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {  toast } from "react-toastify";

function AdminPrivateRoute() {

    const generateError = (error) =>
        toast.error(error, {
          position: "top-right",
        });

  const role = localStorage.getItem('role');
  useEffect(() => {
    if (!role || role.trim() !== 'admin') {
      generateError("Not a Admin");
    }
  })

  if (role.trim() !== 'admin') {
    const path = "/" + role.trim();
    return <Navigate to={path} replace />;
  }

  return <Outlet />;
}

export default AdminPrivateRoute;
