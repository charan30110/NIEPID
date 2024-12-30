import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

import PrivateRoute from "./routes/PrivateRoute"
import AdminPrivateRoute from "./routes/AdminPrivateRoute"
import PrincipalPrivateRoute from "./routes/PrincipalPrivateRoute"
import TeacherPrivateRoute from "./routes/TeacherPrivateRoute"
import StudentPrivateRoute from "./routes/StudentPrivateRoute"

import Admin from "./pages/Dashboards/Admin"
import Principal from "./pages/Dashboards/Principal"
import Teacher from "./pages/Dashboards/Teacher"
import Student from "./pages/Dashboards/Student"

import ViewTeachers from "./pages/Routes/Admin/ViewTeachers";
import ViewStudents from "./pages/Routes/Admin/ViewStudents";
import RegisterStudent from "./pages/Routes/Admin/RegisterStudent";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<AdminPrivateRoute />}>
            <Route exact path="/admin" element={<Admin />} />
            <Route exact path="/admin/viewTeachers" element={<ViewTeachers />} />
            <Route exact path="/admin/viewStudents" element={<ViewStudents />} />
            <Route exact path="/admin/registerStudent" element={<RegisterStudent />} />
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
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
