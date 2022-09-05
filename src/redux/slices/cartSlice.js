import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  amount: 0,
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action) {
      state.items.push(action.payload);
    },
    removePizza(state, action) {},
    deletePizzas(state, action) {},
  },
});

export default cartSlice.reducer;
