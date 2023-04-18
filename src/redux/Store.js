import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer";
import CartReducer from "./CartReducer";

const Store = configureStore({
  reducer: {
    cart: CartReducer,
    auth: AuthReducer,
  }, 
});

export default Store;

// export const Auth = configureStore({
//   reducer: {
//     auth: AuthReducer,
//   },
// });
