import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./pages/Login";

import PrivateRoute from "./routes/PrivateRoute"
import AdminPrivateRoute from "./routes/AdminPrivateRoute"
import PrincipalPrivateRoute from "./routes/PrincipalPrivateRoute"
import TeacherPrivateRoute from "./routes/TeacherPrivateRoute"
import StudentPrivateRoute from "./routes/StudentPrivateRoute"

import Admin from "./pages/Dashboards/Admin"
import Principal from "./pages/Dashboards/Principal"
import Teacher from "./pages/Dashboards/Teacher"
import Student from "./pages/Dashboards/Student"

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<AdminPrivateRoute />}>
            <Route exact path="/admin" element={<Admin />} />
          </Route>
          <Route element={<PrincipalPrivateRoute />}>
            <Route exact path="/principal" element={<Principal />} />
          </Route>
          <Route element={<TeacherPrivateRoute />}>
            <Route exact path="/teacher" element={<Teacher />} />
          </Route>
          <Route element={<StudentPrivateRoute />}>
            <Route exact path="/student" element={<Student />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
