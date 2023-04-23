import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer.js";
import CartReducer from "./CartReducer";

const rootReducer = combineReducers({
  cart: CartReducer,
  auth: AuthReducer,
});

export const Store = configureStore({
  reducer: rootReducer,
});

export default Store;

