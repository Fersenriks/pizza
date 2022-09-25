import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchStatus } from '../../constants/fetchStatuses';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkApi) => {
  const { categoryId, pageCount, sortType } = params;

  const { data } = await axios.get(
    `https://62cb703e3e924a012866f7d4.mockapi.io/items?${categoryId && `category=${categoryId}`}${
      sortType.sortValue && `&sortBy=${sortType.sortValue}&order=asc&page=${pageCount + 1}&limit=8`
    }`
  );
  console.log(data);

  // if (data.items.length) {
  //   return thunkApi.rejectWithValue('kek');
  // }

  return thunkApi.fulfillWithValue(data);
});

const initialState = {
  items: [],
  count: 0,
  loading: false,
  status: fetchStatus.loading,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.loading = true;
      state.items = fetchStatus.loading;
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      // console.log(action);
      state.items = action.payload.items;
      state.count = action.payload.count / Math.round(8);
      state.loading = false;
      state.status = fetchStatus.success;
    },
    [fetchPizzas.rejected]: (state, action) => {
      // console.log('rejected');
      state.loading = false;
      state.items = [];
      state.status = fetchStatus.error;
    },
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
