import { createBrowserRouter } from "react-router-dom";
import AppUserAccount from "../app/pages/AppUserAccount";
import React from "react";
import ErrorPage from "../../../../../WebstormProjects/speedometer/src/app/ErrorPage";
import LibraryApp from "../LibraryApp";
import LoginPage, { loginLoader } from "../app/pages/LoginPage";
import { forceLoginPage } from "../app/utils";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    loader: loginLoader,
  },
  {
    path: "/home",
    element: forceLoginPage(<LibraryApp />),
    errorElement: <ErrorPage />,
    children: [
      {
        //path: "user/:username",
        path: "user",
        element: forceLoginPage(<AppUserAccount />),
      },
    ],
  },
]);
