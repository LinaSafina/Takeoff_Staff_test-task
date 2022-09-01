import { ContactType } from '../../app/contactsSlice';

export type ModalProps = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  contact: ContactType;
  setContact: (contact: ContactType) => void;
};
