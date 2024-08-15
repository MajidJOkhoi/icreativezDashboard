import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/PrivateRoute";

import Layout from "./loyout/Layout";
import DashboardLayout from "./loyout/DashboardLayout";
import Home from "./pages/Home";
import BookPage from "./pages/managebook/BookPage";
import CreateBookPage from "./pages/managebook/CreateBookPage";
import EditBook from "./pages/managebook/EditBook";
import DeleteBook from "./pages/managebook/DeleteBook";
import ManageProject from "./pages/manageproject/ManageProject";
import CreateProject from "./pages/manageproject/CreateProject";
import ManageTeam from "./pages/manageuser/ManageTeam";
import AddUser from "./pages/manageuser/AddUser";
import ManageLeave from "./pages/manageleave/ManageLeave";
import ManageAttendance from "./pages/manageattendece/ManageAttendence";
import AttendanceDetails from "./pages/manageattendece/AttendenceDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddTimeOff from "./pages/manageleave/AddTimeOff";
import TimeOffDetails from "./pages/manageleave/TimeOffDetails";
import CheckPerformance from "./pages/manageperformance/CheckPerformance";


const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { path: "home", element: <Home /> },
          // manage books 
          { path: "books", element: <BookPage /> },
          { path: "books/create", element: <CreateBookPage /> },
          { path: "books/edit/:id", element: <EditBook /> },
          { path: "books/delete/:id", element: <DeleteBook /> },
          // Manage Project Routes
          { path: "projects", element: <ManageProject /> },
          { path: "projects/create", element: <CreateProject /> },

          
          // Manage Team Routes
          { path: "team", element: <ManageTeam /> },
          { path: "team/create", element: <AddUser /> },
          // manage leaves
         
          { path: "leaves", element: <ManageLeave /> },
          { path: "time-off/create", element: <AddTimeOff /> },
          { path: "managetimedetails/:id", element: <TimeOffDetails /> },


          // manage attendance
          { path: "attendance", element: <ManageAttendance /> },
          { path: "attendencedetails/:id", element: <AttendanceDetails /> },

          // performance evaluation
          { path: "performance", element: <CheckPerformance /> },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <Layout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  // </React.StrictMode>
);
