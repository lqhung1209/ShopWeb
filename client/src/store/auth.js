import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = { isLoggedIn: false, user: '' };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    onAuth(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
