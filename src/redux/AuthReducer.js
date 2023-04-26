import { createSlice } from "@reduxjs/toolkit";

const AuthReducer = createSlice({
  name: "auth",

  initialState: {
    isAuthenticated: false,
    userName: null,
    email: null,
    phone: null,
    uid: null,
  },
  reducers: {
    authLogin(state, action) {
      state.isAuthenticated = true;
      console.log("acc", action.payload);
      const { email, userName, userID, photoURL } = action.payload;
      state.email = email;
      state.userName = userName;
      state.uid = userID;
      state.photoURL = photoURL;
      console.log("uid", userID);
    },

    authLogout(state, action) {
      state.isAuthenticated = false;
      state.email = null;
      state.userName = null;
      state.uid = null;
      console.log(state.isAuthenticated);
    },
  },
});

export const { authLogin, authLogout } = AuthReducer.actions;

export const Authenticated = (state) => state.auth.isAuthenticated;
export const AuthEmail = (state) => state.auth.email;
export const AuthUserName = (state) => state.auth.userName;
export const AuthUid = (state) => state.auth.uid;
export const AuthPhone = (state) => state.auth.phone;

export default AuthReducer.reducer;
