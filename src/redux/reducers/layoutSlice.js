import { createSlice } from "@reduxjs/toolkit";

const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    pageContent: null,
    sideMenuCollapsed: false,
    colorBgContainer: "",
    preferredLanguage: "en",
  },
  reducers: {
    toggleCollapseSideMenu: (state) => {
      state.sideMenuCollapsed = !state.sideMenuCollapsed;
    },
    setPageContent: (state, action) => {
      state.pageContent = action.payload;
    },
    setPreferredLanguage: (state, action) => {
      switch (action.payload) {
        case "en":
          state.preferredLanguage = "en";
          break;
        case "tr":
          state.preferredLanguage = "tr";
          break;
        default:
          state.preferredLanguage = "en";
      }
    },
  },
});

export default layoutSlice;
