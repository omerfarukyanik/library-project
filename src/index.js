import { App, ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./app/localization/i18n";
import { Provider } from "react-redux";
import store from "./redux";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { RouterProvider } from "react-router-dom";
import { router as appRouter } from "./router/AppRouter";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews } from "./dev";

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
      <App>
        <StyleProvider hashPriority="high">
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <DevSupport ComponentPreviews={ComponentPreviews}>
                <RouterProvider router={appRouter} />
              </DevSupport>
            </I18nextProvider>
          </Provider>
        </StyleProvider>
      </App>
    </ConfigProvider>
  </React.StrictMode>
);
