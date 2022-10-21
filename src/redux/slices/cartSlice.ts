import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type CartItem = {
  count: number;
  title: string;
  price: number;
  id: number;
  imageUrl: string;
  sizes: number[];
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.items
        .map((item) => item.price * item.count)
        .reduce((sum, acc) => sum + acc, 0);
    },
    incPizza(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count++;
        state.totalPrice += findItem.price;
      }
    },
    decPizza(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem?.count === 0) {
        return;
      }

      if (findItem) {
        state.totalPrice -= findItem.price;
        findItem.count--;
      }
    },
    removePizza(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items
        .map((item) => item.price * item.count)
        .reduce((sum, acc) => sum + acc, 0);
    },
    deletePizzas(state) {
      state.totalPrice = 0;
      state.items = [];
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { addPizza, deletePizzas, incPizza, decPizza, removePizza } = cartSlice.actions;
export default cartSlice.reducer;
