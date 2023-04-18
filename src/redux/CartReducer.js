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
      // so luong
      state.totalQuantity++;

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
        
      );console.log("removeProduct", existingProduct);
      if (existingProduct) {
        if (existingProduct.quantity === 1) {
        // Nếu sản phẩm chỉ còn 1 thì xoá 
          state.cartProduct = state.cartProduct.filter(
          (product) => product.id !== productId
          );
        } else {
          // Nếu sản phẩm còn nhiều hơn 1 thì giảm số lượng đi 1
          existingProduct.quantity--;
          existingProduct.totalPrice -= existingProduct.price;
        }
      }
      state.totalQuantity--;
      state.totalAmount -= existingProduct.price * existingProduct.quantity;

    },
  },
});

export const cartActions = CartReducer.actions;

export default CartReducer.reducer;
