import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from "react-toastify";

function StudentPrivateRoute() {

  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });

  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    if (!role || role.trim() !== 'student') {
      generateError("Not a Student");
    }
  })

  if (!role || !userId) {
    return <Navigate to="/" replace />
  }

  if (role.trim() !== 'student') {
    const path = "/" + role.trim();
    return <Navigate to={path} replace />;
  }

  return <Outlet />;
}

export default StudentPrivateRoute;
