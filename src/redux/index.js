import { configureStore } from "@reduxjs/toolkit";
import layoutSlice from "./reducers/layoutSlice";
import credentialsSlice from "./reducers/credentialsSlice";
import { credentialsApi } from "./api/credentialsApi";
import { layoutApi } from "./api/layoutApi";

const store = configureStore({
  reducer: {
    layout: layoutSlice.reducer,
    [credentialsSlice.name]: credentialsSlice.reducer,
    [credentialsApi.reducerPath]: credentialsApi.reducer,
    [layoutApi.reducerPath]: layoutApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(credentialsApi.middleware)
      .concat(layoutApi.middleware),
});

export const { toggleCollapseSideMenu, setPreferredLanguage } =
  layoutSlice.actions;
export const {
  userLogOut,
  userLogin,
  adminLogOut,
  adminLogin,
  setCSRFToken,
  logOut,
} = credentialsSlice.actions;

export default store;
