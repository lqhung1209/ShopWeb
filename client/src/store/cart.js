import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
  quantity: 1,
  quantityAdded: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    getCart(state, action) {
      state.quantityAdded = action.payload;
    },
    resetQuantity(state) {
      state.quantity = 1;
    },
    updateCart(state, action) {
      if (action.payload.method === 'increase') {
        //điều chỉnh quantity ở Shop Page
        if (!action.payload.itemPos) {
          state.quantity++;
        }
        //điều chỉnh quantity ở Cart Page
        else {
          const itemPos = action.payload.itemPos - 1;
          state.quantityAdded[itemPos].quantity++;
        }
      } else if (action.payload.method === 'decrease') {
        //điều chỉnh quantity ở Shop Page
        if (!action.payload.itemPos) {
          //quantity tối thiểu là 1
          if (state.quantity > 1) {
            state.quantity--;
          } else {
            state.quantity = 1;
          }
        }
        //điều chỉnh quantity ở Cart Page
        else {
          const itemPos = action.payload.itemPos - 1;
          //quantity tối thiểu là 1
          if (state.quantityAdded[itemPos].quantity > 1) {
            state.quantityAdded[itemPos].quantity--;
          } else {
            state.quantityAdded[itemPos].quantity = 1;
          }
        }
      }
    },
    deleteCart(state, action) {
      const itemPos = action.payload.itemPos - 1;
      state.quantityAdded.splice(itemPos, 1);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
