import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export type AuthState = {
  userId: string;
  token: string;
};

const initialState: AuthState = {
  userId: '',
  token: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<AuthState>) => {
      state.userId = action.payload.userId.toString();
      state.token = action.payload.token;
    },
    logoutUser: () => initialState,
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
