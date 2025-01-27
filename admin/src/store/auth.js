import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = { isLoggedIn: false, user: '', isAdmin: false };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    onAuth(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
      state.isAdmin = action.payload.isAdmin;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
