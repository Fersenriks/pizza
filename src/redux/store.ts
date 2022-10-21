import { configureStore } from '@reduxjs/toolkit';

import filtersReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import pizzaReducer from './slices/pizzaSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter: filtersReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
