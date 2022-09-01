import React, { Fragment, useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { AddCircleOutline, Edit } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  ContactsType,
  ContactType,
  deleteContact,
  selectContacts,
  setContacts,
} from '../../app/contactsSlice';
import { URLS } from '../constants';
import { LIST_OF_CONTACTS } from './constants';
import { Modal } from '../Modal/Modal';
import { logoutUser, selectAuth } from '../../app/authSlice';
import './Contacts.css';
import { DEFAULT_VALUES } from '../Modal/constants';

const IMAGES_PATH = '/images';

export const Contacts = () => {
  const contacts = useAppSelector(selectContacts);
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] =
    useState<ContactType>(DEFAULT_VALUES);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.userId) {
      navigate('/');
    } else {
      fetch(`${URLS.CONTACTS}?userId=${auth.userId}`)
        .then((response) => response.json())
        .then((data: ContactsType) => {
          dispatch(setContacts(data));
        })
        .catch((e) => {
          throw new Error(e.message);
        });
    }
  }, [contacts]);

  const listOfContacts =
    contacts.length !== 0 &&
    contacts.map(({ name, phone, gender, id }: ContactType) => {
      return (
        <Fragment key={id}>
          <ListItem>
            <form></form>
            <ListItemAvatar>
              <Avatar
                alt={name}
                src={`${IMAGES_PATH}/${
                  gender === 'female' ? 'avatar1' : 'avatar2'
                }.jpg`}
                sx={{ width: '4rem', height: '4rem' }}
              />
            </ListItemAvatar>
            <ListItemText primary={name} secondary={phone} />
            <ListItemSecondaryAction style={{ left: 'auto', right: '15%' }}>
              <IconButton
                edge='end'
                aria-label='edit'
                onClick={editContactHandler}
                data-id={id}
              >
                <Edit />
              </IconButton>
            </ListItemSecondaryAction>
            <ListItemSecondaryAction>
              <IconButton
                edge='end'
                aria-label='delete'
                onClick={deleteContactHandler}
                data-id={id}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider variant='inset' component='li' />
        </Fragment>
      );
    });

  function deleteContactHandler(event: React.MouseEvent<HTMLButtonElement>) {
    if (event.currentTarget.type === 'button') {
      const id = event.currentTarget.dataset.id || '';

      fetch(`${URLS.CONTACTS}/${id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then(() => {
          dispatch(deleteContact(id));
        })
        .catch((e) => {
          throw new Error(e.message);
        });
    }
  }

  function editContactHandler(event: React.MouseEvent<HTMLButtonElement>) {
    if (event.currentTarget.type === 'button') {
      const id = event.currentTarget.dataset.id || '';
      const contact = contacts.find((item: ContactType) => item.id === id);

      if (contact) {
        setEditingContact(contact);
      }
      setIsModalOpen(true);
    }
  }

  function addContactHandler() {
    setEditingContact(DEFAULT_VALUES);
    setIsModalOpen(true);
  }

  function logoutHandler() {
    dispatch(logoutUser());
    navigate('../');
  }

  return (
    <>
      <Button variant='contained' color='secondary' onClick={logoutHandler}>
        Log out
      </Button>
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        contact={editingContact}
        setContact={setEditingContact}
      />
      <h1>{LIST_OF_CONTACTS}</h1>
      <List sx={{ width: '90%', maxWidth: 450 }}>{listOfContacts}</List>
      <IconButton
        color='primary'
        aria-label='add to shopping cart'
        onClick={addContactHandler}
        size='large'
      >
        <AddCircleOutline fontSize='inherit' />
      </IconButton>
    </>
  );
};
