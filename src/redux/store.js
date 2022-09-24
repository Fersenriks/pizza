import { configureStore } from '@reduxjs/toolkit';

import filtersReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import pizzaReducer from './slices/pizzaSlice';

export const store = configureStore({
  reducer: {
    filter: filtersReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
  },
});
