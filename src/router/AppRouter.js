import { createBrowserRouter } from "react-router-dom";
import AppUserAccount from "../app/pages/AppUserAccount";
import React from "react";
import ErrorPage from "../app/pages/ErrorPage";
import LibraryApp from "../LibraryApp";
import LoginPage, { loginLoader } from "../app/pages/LoginPage";
import AdminLoginPage from "../app/pages/AdminLoginPage";
import SignUpPage from "../app/pages/SingUpPage";
import AdminUsersDetailPage from "../app/pages/AdminUsersDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    loader: loginLoader,
  },
  {
    path: "/admin",
    element: <AdminLoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <LibraryApp />,
    errorElement: <ErrorPage />,
    children: [
      {
        //path: "user/:username",
        path: "user",
        element: <AppUserAccount />,
      },
      {
        path: "user-details",
        element: <AdminUsersDetailPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
