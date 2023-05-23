import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LibraryApp from "./LibraryApp";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
        },
      }}
    >
      <StyleProvider hashPriority="high">
        <LibraryApp />
      </StyleProvider>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
