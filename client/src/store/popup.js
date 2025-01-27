import { createSlice } from '@reduxjs/toolkit';

const initialPopupState = { isOpen: false, data: {} };

const popupSlice = createSlice({
  name: 'popup',
  initialState: initialPopupState,
  reducers: {
    showPopup(state, action) {
      state.isOpen = true;
      state.data = action.payload;
    },
    hidePopup(state) {
      state.isOpen = false;
    },
  },
});

export const popupActions = popupSlice.actions;

export default popupSlice.reducer;
