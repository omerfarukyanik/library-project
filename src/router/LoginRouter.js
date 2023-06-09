import { createBrowserRouter } from "react-router-dom";
import LibraryApp from "../LibraryApp";
import ErrorPage from "../../../../../WebstormProjects/speedometer/src/app/ErrorPage";
import AppUserAccount from "../app/pages/AppUserAccount";
import React from "react";
import LoginPage from "../app/pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
]);
