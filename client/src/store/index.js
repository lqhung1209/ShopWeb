import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './popup';
import categoriesReducer from './categories';
import authReducer from './auth';
import cartReducer from './cart';

const store = configureStore({
  reducer: {
    popup: popupReducer,
    categories: categoriesReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;
