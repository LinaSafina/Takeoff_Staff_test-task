import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Modal } from './Modal';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

describe('Modal', () => {
  const successModalHandler = jest.fn();
  const modalCloseHandler = jest.fn();
  const setIsOpen = jest.fn();
  const setContact = jest.fn();

  const emptyContact = {
    name: '',
    phone: '',
    gender: '',
    id: '',
    userId: '',
  };

  const contactWithData = {
    name: 'Ivan',
    phone: '89999999999',
    gender: 'female',
    id: '1',
    userId: '55',
  };

  test('renders Add contact heading, Add and Cancel buttons when contact has empty fields', () => {
    render(
      <Provider store={store}>
        <Modal
          isOpen={true}
          setIsOpen={setIsOpen}
          setContact={setContact}
          contact={emptyContact}
        />
      </Provider>
    );
    const addButton = screen.getByText(/^add$/i);
    const cancelButton = screen.getByText(/^cancel$/i);
    const addContactHeading = screen.getByText(/add contact/i);
    expect(addButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(addContactHeading).toBeInTheDocument();
  });

  test('renders Edit contact heading, Save and Cancel buttons when contact has data', () => {
    render(
      <Provider store={store}>
        <Modal
          isOpen={true}
          setIsOpen={setIsOpen}
          setContact={setContact}
          contact={contactWithData}
        />
      </Provider>
    );
    const editButton = screen.getByText(/^save$/i);
    const cancelButton = screen.getByText(/^cancel$/i);
    const editContactHeading = screen.getByText(/edit contact/i);
    expect(editButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(editContactHeading).toBeInTheDocument();
  });

  test("fills inputs with contact's data if contact with data passed", () => {
    render(
      <Provider store={store}>
        <Modal
          isOpen={true}
          setIsOpen={setIsOpen}
          setContact={setContact}
          contact={contactWithData}
        />
      </Provider>
    );
    const nameInput = screen.getByLabelText(/name/i);
    const phoneInput = screen.getByLabelText(/phone number/i);
    expect(nameInput).toHaveValue('Ivan');
    expect(phoneInput).toHaveValue('89999999999');
  });
});
