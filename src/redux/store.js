import { configureStore } from "@reduxjs/toolkit";
import layoutSlice from "./reducers/layoutSlice";

export const store = configureStore({
  reducer: {
    layout: layoutSlice.reducer,
  },
});

export const { toggleCollapseSideMenu, setPageContent } = layoutSlice.actions;
