// rxslice
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartProduct: {},
  totalAmount: 0,
  totalQuantity:0,
};

/////////////////////////
const CartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = action.payload;
      const existingProduct = state.cartProduct.find(
        (product) => product.id === newProduct.id
      );

      state.totalQuantity++;

      if (!existingProduct) {
        state.cartProduct.push({
          id: newProduct.id,
          productName: newProduct.productName,
          image: newProduct.img,
          quantity: 1,
          totalPrice: newProduct.price,
        });
      } else {
        existingProduct.quantity++;
        existingProduct.totalPrice =
          Number(existingProduct.totalPrice) + Number(newProduct.price);
      }
      state.totalAmount = state.cartProduct.reduce(
        (total, product) =>
          total + Number(product.price) * Number(product.quantity)
      );

      console.log(state.totalQuantity);
      console.log(state.cartProduct);
      console.log(newProduct);
    },
  },
});

export const cartActions = CartReducer.actions;

export default CartReducer.reducer;
