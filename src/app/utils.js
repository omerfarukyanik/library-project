import { message, theme } from "antd";
import i18n from "./localization/i18n";
import { Navigate } from "react-router-dom";
import React from "react";

const t = i18n.t;
export const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error(t("upload.profile.picture.jpg.png.upload.error"));
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error(t("upload.profile.picture.size.error"));
  }
  return isJpgOrPng && isLt2M;
};

export const isUserLoggedIn = () => {
  console.log(localStorage.getItem("login-type"));
  return localStorage.getItem("login-type") !== null;
};

export const forceLoginPage = (component) => {
  return isUserLoggedIn() ? component : <Navigate to={"/"} />;
};
export const getThemeBackgroundColorToken = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return colorBgContainer;
};
