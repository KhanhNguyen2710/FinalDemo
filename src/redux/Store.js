import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";
import AuthReducer from "./AuthReducer";
import CheckoutReducer from "./CheckoutReducer";
import OrderReducer from "./OrderReducer";

const rootReducer = combineReducers({
  cart: CartReducer,
  auth: AuthReducer,
  checkout: CheckoutReducer,
  order: OrderReducer,
});

export const Store = configureStore({
  reducer: rootReducer,
});

export default Store;
