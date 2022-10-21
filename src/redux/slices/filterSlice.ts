import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SortValues } from './pizzaSlice';

export type Sort = {
  label: string;
  sortValue: SortValues.RATING | SortValues.PRICE | SortValues.TITLE;
};

type SortSliceState = {
  categoryId: number;
  pageCount: number;
  sortType: Sort;
};

const initialState: SortSliceState = {
  categoryId: 0,
  pageCount: 0,
  sortType: { label: 'Popularity', sortValue: SortValues.RATING },
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
      state.pageCount = 0;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setSortValue(state, action: PayloadAction<Sort>) {
      state.sortType = action.payload;
    },
    setFilters(state, action: PayloadAction<SortSliceState>) {
      state.categoryId = +action.payload.categoryId;
      state.pageCount = +action.payload.pageCount;
      state.sortType = action.payload.sortType;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSortValue, setPageCount, setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
