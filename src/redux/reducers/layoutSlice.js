import { createSlice } from "@reduxjs/toolkit";
import i18n from "../../app/localization/i18n";

const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    sideMenuCollapsed: false,
    colorBgContainer: "",
    preferredLanguage: "en",
  },
  reducers: {
    toggleCollapseSideMenu: (state) => {
      state.sideMenuCollapsed = !state.sideMenuCollapsed;
    },
    setPreferredLanguage: (state, action) => {
      switch (action.payload) {
        case "en":
          i18n.changeLanguage("en");
          state.preferredLanguage = "en";
          break;
        case "tr":
          i18n.changeLanguage("tr");
          state.preferredLanguage = "tr";
          break;
        default:
          state.preferredLanguage = "en";
          i18n.changeLanguage("en");
      }
    },
  },
});

export default layoutSlice;
