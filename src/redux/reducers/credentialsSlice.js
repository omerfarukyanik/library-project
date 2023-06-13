import { createSlice } from "@reduxjs/toolkit";

const credentialsSlice = createSlice({
  name: "credentials",
  initialState: {
    userLoggedIn: false,
    adminLoggedIn: false,
    csrfToken: null,
    username: "",
  },
  reducers: {
    logOut: (state) => {
      state.adminLoggedIn = false;
      state.userLoggedIn = false;
      state.csrfToken = null;
      state.username = "";
    },
    userLogOut: (state) => {
      state.userLoggedIn = false;
    },
    userLogin: (state, action) => {
      state.userLoggedIn = true;
      state.username = action.payload.username;
    },
    adminLogOut: (state) => {
      state.adminLoggedIn = false;
    },
    adminLogin: (state, action) => {
      state.adminLoggedIn = true;
      state.username = action.payload.username;
    },
    setCSRFToken: (state, action) => {
      state.csrfToken = action.payload.csrfToken;
    },
  },
});

export default credentialsSlice;
