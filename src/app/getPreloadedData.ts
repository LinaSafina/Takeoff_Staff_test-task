import { AuthState } from './authSlice';
import { ContactsState } from './contactsSlice';

export const getPreloadedUserData: () => {
  auth: AuthState;
} = () => {
  const initialState = { auth: { token: '', userId: '' } };
  try {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');

    if (token && userId) {
      const initialUserData = {
        auth: {
          token,
          userId,
        },
      };
      return initialUserData;
    } else {
      return initialState;
    }
  } catch (e) {
    return initialState;
  }
};
