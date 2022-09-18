import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action) {
      console.log(action);
      state.items.push(action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price + sum;
      }, 0);
    },
    removePizza(state, action) {},
    deletePizzas(state, action) {},
  },
});

export const { addPizza } = cartSlice.actions;
export default cartSlice.reducer;
