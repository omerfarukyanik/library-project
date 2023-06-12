import { createSlice } from "@reduxjs/toolkit";
import i18n from "../../app/localization/i18n";

const credentialsSlice = createSlice({
  name: "credentials",
  initialState: {
    userLoggedIn: false,
    adminLoggedIn: false,
    csrfToken: null,
  },
  reducers: {
    logOut: (state) => {
      state.adminLoggedIn = false;
      state.userLoggedIn = false;
      state.csrfToken = null;
    },
    userLogOut: (state) => {
      state.userLoggedIn = false;
    },
    userLogin: (state) => {
      state.userLoggedIn = true;
    },
    adminLogOut: (state) => {
      state.adminLoggedIn = false;
    },
    adminLogin: (state) => {
      state.adminLoggedIn = true;
    },
    setCSRFToken: (state, action) => {
      state.csrfToken = action.payload.csrfToken;
    },
  },
});

export default credentialsSlice;
