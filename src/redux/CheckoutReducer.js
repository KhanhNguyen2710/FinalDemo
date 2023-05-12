import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shippingAddress: {}
}

const CheckoutReducer = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload
    }
  }
});

export const { saveShippingAddress } = CheckoutReducer.actions;

export const selectShipping = (state) => state.checkout.shippingAddress;

export default CheckoutReducer.reducer