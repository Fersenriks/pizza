import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchStatus } from '../../constants/fetchStatuses';
import { RootState } from '../store';

interface FetchPizzasParams {
  categoryId: number;
  pageCount: number;
  sortType: Sort;
}

type ReturnedData = {
  items: PizzaItem[];
  count: number;
};

type Sort = {
  label: string;
  sortValue: 'rating' | 'price' | 'title';
};

type PizzaItem = {
  count: number;
  title: string;
  price: number;
  id: number;
  imageUrl: string;
  category: number;
  sizes: number[];
  types: number[];
};

interface PizzaSliceState {
  items: PizzaItem[];
  count: number;
  loading: boolean;
  status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
  items: [],
  count: 0,
  loading: false,
  status: fetchStatus.loading,
};

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: FetchPizzasParams) => {
    const { categoryId, pageCount, sortType } = params;

    const { data } = await axios.get<ReturnedData>(
      `https://62cb703e3e924a012866f7d4.mockapi.io/items?${categoryId && `category=${categoryId}`}${
        sortType.sortValue &&
        `&sortBy=${sortType.sortValue}&order=asc&page=${pageCount + 1}&limit=8`
      }`
    );

    return data;
  }
);

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.loading = true;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      const { payload } = action;

      state.items = payload.items;
      state.count = payload.count / Math.round(8);
      state.loading = false;
      state.status = fetchStatus.success;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.loading = false;
      state.items = [];
      state.status = fetchStatus.error;
    });
  },
  // extraReducers: {
  //   [fetchPizzas.pending]: (state: RootState) => {
  //     state.loading = true;
  //     state.items = fetchStatus.loading;
  //   },
  //   [fetchPizzas.fulfilled]: (state: RootState, action) => {
  //     state.items = action.payload.items;
  //     state.count = action.payload.count / Math.round(8);
  //     state.loading = false;
  //     state.status = fetchStatus.success;
  //   },
  //   [fetchPizzas.rejected]: (state: RootState) => {
  //     state.loading = false;
  //     state.items = [];
  //     state.status = fetchStatus.error;
  //   },
  // },
});

export const selectPizzas = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
