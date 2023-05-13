// rxslice
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartProduct: [], // mãng
  totalAmount: 0,
  totalQuantity: 0,
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
      state.totalQuantity++; // Quantity
      if (!existingProduct) {
        state.cartProduct.push({
          id: newProduct.id,
          productName: newProduct.productName,
          img: newProduct.img,
          quantity: 1,
          totalPrice: newProduct.price,
        });
      } else {
        existingProduct.quantity++;
        existingProduct.totalPrice =
          Number(existingProduct.totalPrice) + Number(newProduct.price);
      }

      // TODO: fix // fix done //
      state.totalAmount = state.cartProduct.reduce(
        (total, product) =>
          total + Number(product.totalPrice) * Number(product.quantity),
        0
      );

      console.log(state.totalQuantity);
      console.log(newProduct);
      console.log("total", state.totalAmount);
      console.table("all", state.cartProduct);
    },

    removeProduct: (state, action) => {
      const productId = action.payload;

      const existingProduct = state.cartProduct.find(
        (product) => product.id === productId
      );
      console.log("removeProduct", existingProduct);
      if (existingProduct) {
        const productQuantity = existingProduct.quantity;
        const productPrice = existingProduct.totalPrice;
        state.cartProduct = state.cartProduct.filter(
          (product) => product.id !== productId
        );
        state.totalQuantity -= productQuantity;
        state.totalAmount -= productPrice * productQuantity;
      }
    },

    //+
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.cartProduct.find((p) => p.id === productId);
      if (product) {
        product.quantity++;
        state.totalQuantity++;
        state.totalAmount += Number(product.totalPrice);
      }
    },
    //-
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.cartProduct.find((p) => p.id === productId);
      if (product) {
        product.quantity--;
        state.totalQuantity--;
        state.totalAmount -= Number(product.totalPrice);
        if (product.quantity === 0) {
          state.cartProduct = state.cartProduct.filter(
            (p) => p.id !== productId
          );
        }
      }
    },

    clearCart: (state, action) => {
      state.cartProduct = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});
export const { clearCart } = CartReducer.actions;

export const cartActions = CartReducer.actions;

export default CartReducer.reducer;
