import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  pageCount: 0,
  sortType: { label: 'Popularity', sortValue: 'rating' },
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
      state.pageCount = 0;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setSortValue(state, action) {
      state.sortType = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = +action.payload.categoryId;
      state.pageCount = +action.payload.pageCount;
      state.sortType = action.payload.sortType;
    },
  },
});

export const { setCategoryId, setSortValue, setPageCount, setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
