import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export enum StatusesEnum {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum SortValuesEnum {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

type Sort = {
  label: string;
  sortValue: SortValuesEnum;
};

export type FetchPizzasParams = {
  categoryId: number;
  pageCount: number;
  sortBy: Sort;
};

export type SearchFilterParams = {
  categoryId: number;
  pageCount: number;
  sortBy: SortValuesEnum;
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

type ReturnedData = {
  items: PizzaItem[];
  count: number;
};

type PizzaSliceState = {
  items: PizzaItem[];
  count: number;
  loading?: boolean;
  status?: StatusesEnum.LOADING | StatusesEnum.SUCCESS | StatusesEnum.ERROR;
};

const initialState: PizzaSliceState = {
  items: [],
  count: 0,
  loading: false,
  status: StatusesEnum.LOADING,
};

export const fetchPizzas = createAsyncThunk<ReturnedData, FetchPizzasParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { categoryId, pageCount, sortBy } = params;
    const limit = 8;

    const { data } = await axios.get(
      `https://62cb703e3e924a012866f7d4.mockapi.io/items?${categoryId && `category=${categoryId}`}${
        sortBy.sortValue &&
        `&sortBy=${sortBy.sortValue}&order=asc&page=${pageCount + 1}&limit=${limit}`
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
    builder.addCase(fetchPizzas.pending, (state) => {
      state.loading = true;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaSliceState>) => {
      const { payload } = action;

      state.items = payload.items;
      state.count = payload.count / Math.round(8);
      state.loading = false;
      state.status = StatusesEnum.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.loading = false;
      state.items = [];
      state.status = StatusesEnum.ERROR;
    });
  },
});

export const selectPizzas = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
