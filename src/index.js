import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Main from "./components/Main";
import Profile from "./components/Profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
