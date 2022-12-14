import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export type ContactType = {
  id: string | number;
  name: string;
  phone: string;
  gender: string;
  userId: string;
};

export type ContactsType = ContactType[];

export type ContactsState = {
  contacts: ContactsType;
};

const initialState: ContactsState = {
  contacts: [],
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<ContactType>) => {
      state.contacts.push(action.payload);
    },

    editContact: (state, action: PayloadAction<ContactType>) => {
      const index = state.contacts.findIndex(
        (contact) => contact.id === action.payload.id
      );
      state.contacts[index] = { ...state.contacts[index], ...action.payload };
    },

    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts.splice(
        state.contacts.findIndex((contact) => contact.id === action.payload),
        1
      );
    },

    setContacts: (state, action: PayloadAction<ContactsType>) => {
      state.contacts = action.payload;
    },
  },
});

export const { addContact, editContact, deleteContact, setContacts } =
  contactsSlice.actions;

export const selectContacts = (state: RootState) => state.contacts.contacts;

export default contactsSlice.reducer;
