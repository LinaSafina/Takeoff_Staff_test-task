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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AddCircleOutline, Edit } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  ContactsType,
  ContactType,
  deleteContact,
  selectContacts,
  setContacts,
} from '../../app/contactsSlice';
import { AVATARS, BUTTONS, URLS } from '../constants';
import { LIST_OF_CONTACTS } from './constants';
import { Modal } from '../Modal/Modal';
import { logoutUser, selectAuth } from '../../app/authSlice';
import './Contacts.css';
import { DEFAULT_VALUES, GENDERS } from '../Modal/constants';
import { SearchInput } from '../Search';

const IMAGES_PATH = '/images';

export const Contacts = () => {
  const allContacts = useAppSelector(selectContacts);
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] =
    useState<ContactType>(DEFAULT_VALUES);
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const [filteredContacts, setFilteredContacts] = useState(allContacts);

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
  }, [allContacts]);

  useEffect(() => {
    const searchValue = searchParam.get('search');
    if (!searchValue) {
      setFilteredContacts(allContacts);
    }

    if (!!searchValue) {
      const newContacts = allContacts.filter(
        ({ name, phone }) =>
          name.toLowerCase().includes(searchValue) ||
          phone.toLowerCase().includes(searchValue)
      );
      setFilteredContacts(newContacts);
    }
  }, [searchParam]);

  const listOfContacts =
    filteredContacts.length !== 0 &&
    filteredContacts.map(({ name, phone, gender, id }: ContactType) => {
      return (
        <Fragment key={id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt={name}
                src={`${IMAGES_PATH}/${
                  gender === GENDERS.FEMALE ? AVATARS.FEMALE : AVATARS.MALE
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
          console.log(e.message);
        });
    }
  }

  function editContactHandler(event: React.MouseEvent<HTMLButtonElement>) {
    if (event.currentTarget.type === 'button') {
      const id = event.currentTarget.dataset.id || '';
      const contact = filteredContacts.find(
        (item: ContactType) => item.id == id
      );

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
    <div className='contacts-wrapper'>
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        contact={editingContact}
        setContact={setEditingContact}
      />
      <h1>{LIST_OF_CONTACTS}</h1>
      <SearchInput />
      <List sx={{ width: '90%', maxWidth: 450 }}>{listOfContacts}</List>
      <IconButton
        color='primary'
        aria-label='add to shopping cart'
        onClick={addContactHandler}
        size='large'
      >
        <AddCircleOutline fontSize='inherit' />
      </IconButton>
      <Button variant='contained' color='secondary' onClick={logoutHandler}>
        {BUTTONS.LOG_OUT}
      </Button>
    </div>
  );
};
