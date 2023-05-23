import { App, Layout } from "antd";
import React from "react";
import AppSideMenu from "./app/AppSideMenu";
import "antd/dist/reset.css";
import "./App.css";

const LibraryApp = () => (
  <Layout>
    <App>
      <AppSideMenu />
    </App>
  </Layout>
);

export default LibraryApp;
