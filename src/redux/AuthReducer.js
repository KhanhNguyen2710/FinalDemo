import { createSlice } from "@reduxjs/toolkit";

const AuthReducer = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    username: "",
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.username = action.payload;
      console.log("acc", state.username);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.username = "";
    },
  },
});

export const { login, logout } = AuthReducer.actions;
export default AuthReducer.reducer;
