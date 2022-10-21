import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SortValuesEnum } from './pizzaSlice';

export type Sort = {
  label: string;
  sortValue: SortValuesEnum;
};

export type SortSliceState = {
  categoryId: number;
  pageCount: number;
  sortBy: Sort;
};

const initialState: SortSliceState = {
  categoryId: 0,
  pageCount: 0,
  sortBy: { label: 'Popularity', sortValue: SortValuesEnum.RATING },
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
      state.sortBy = action.payload;
    },
    setFilters(state, action: PayloadAction<SortSliceState>) {
      state.categoryId = +action.payload.categoryId;
      state.pageCount = +action.payload.pageCount;
      state.sortBy = action.payload.sortBy;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSortValue, setPageCount, setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
