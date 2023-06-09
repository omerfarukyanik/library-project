import { configureStore } from "@reduxjs/toolkit";
import layoutSlice from "./reducers/layoutSlice";
import { layoutApi } from "./api/layoutApi";
import { loginApi } from "./api/loginApi";

export const store = configureStore({
  reducer: {
    layout: layoutSlice.reducer,
    [layoutApi.reducerPath]: layoutApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(layoutApi.middleware),
});

export const { toggleCollapseSideMenu, setPageContent, setPreferredLanguage } =
  layoutSlice.actions;
