import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    filter: filtersReducer,
    cart: cartReducer,
  },
});
