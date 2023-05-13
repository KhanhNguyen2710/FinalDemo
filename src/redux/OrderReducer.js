import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 historyOrder: [],
 totalAmountOrder: null,
}

const OrderReducer = createSlice({
  name: "order",
  initialState,
  reducers: {

    storeOrder:(state, action) =>{
      state.historyOrder = action.payload;
      console.log(" order",action.payload);
    },




    amountOrder(state, action) {
      const array = [];
      state.historyOrder.map((item) => {
        const { amountOrder } = item;
        return array.push(amountOrder);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalAmountOrder = totalAmount;
    },
  },
});

export const { storeOrder, amountOrder } = OrderReducer.actions;

export const selectHistoryOrder = (state) => state.order.historyOrder;
export const selectTotalAmountHistory = (state) => state.order.totalAmountOrder;

export default OrderReducer.reducer;