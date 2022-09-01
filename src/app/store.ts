import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './authSlice';
import contactsReducer, { ContactsState, ContactType } from './contactsSlice';
import { authMiddleware } from './authMiddleware';
import { getPreloadedUserData } from './getPreloadedData';

const preloadedState = {
  ...getPreloadedUserData(),
  contacts: { contacts: [] },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
  preloadedState: preloadedState,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
