import { App, Layout } from "antd";
import React from "react";
import AppSideMenu from "./app/AppSideMenu";
import "antd/dist/reset.css";
import "./App.css";
import AppContent from "./app/AppContent";

const LibraryApp = () => {
  return (
    <App>
      <Layout style={{ minHeight: "100vh" }}>
        <AppSideMenu />
        <AppContent />
      </Layout>
    </App>
  );
};

export default LibraryApp;
