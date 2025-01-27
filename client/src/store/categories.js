import { createSlice } from '@reduxjs/toolkit';

const initialCategoriesState = { data: '' };

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialCategoriesState,
  reducers: {
    toggleCategories(state, action) {
      state.data = action.payload;
    },
  },
});

export const categoriesActions = categoriesSlice.actions;

export default categoriesSlice.reducer;
