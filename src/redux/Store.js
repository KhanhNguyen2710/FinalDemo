import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer.js";
import CartReducer from "./CartReducer";
import CheckoutReducer from "./CheckoutReducer";

const rootReducer = combineReducers({
  cart: CartReducer,
  auth: AuthReducer,
  checkout: CheckoutReducer,
});

export const Store = configureStore({
  reducer: rootReducer,
});

export default Store;

