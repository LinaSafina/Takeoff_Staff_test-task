import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { schema } from './schema-contact';
import { selectAuth } from '../../app/authSlice';
import { addContact, ContactType, editContact } from '../../app/contactsSlice';
import { BUTTONS, URLS } from '../constants';
import {
  DEFAULT_VALUES,
  DIALOG_TITLES,
  GENDERS,
  IDS,
  INPUT_NAMES,
  LABELS,
  MODE,
} from './constants';
import { ModalProps } from './types';

export const Modal = ({
  isOpen,
  setIsOpen,
  contact,
  setContact,
}: ModalProps) => {
  const {
    name: contactName,
    phone: contactPhone,
    gender: contactGender,
    id: contactId,
  } = contact;
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const FORM_INITIAL_VALUES = {
    name: contactName,
    phone: contactPhone,
    gender: contactGender,
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactType>({
    mode: MODE,
    resolver: yupResolver(schema),
    defaultValues: FORM_INITIAL_VALUES,
  });

  useEffect(() => {
    reset(contact);
  }, [contact]);

  const modalCloseHandler = () => {
    setIsOpen(false);
    setContact(DEFAULT_VALUES);
    reset(FORM_INITIAL_VALUES);
  };

  const successModalHandler: SubmitHandler<ContactType> = () => {
    const enteredData = {
      name: watch(INPUT_NAMES.NAME),
      phone: watch(INPUT_NAMES.PHONE),
      userId: auth.userId,
      gender: watch(INPUT_NAMES.GENDER),
    };

    fetch(`${URLS.CONTACTS}/${contactId || ''}`, {
      method: !!contactName ? 'PUT' : 'POST',
      body: JSON.stringify(enteredData),
      headers: { 'Content-type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data: ContactType) => {
        dispatch(!!contactName ? editContact(data) : addContact(data));
        reset(FORM_INITIAL_VALUES);
        setIsOpen(false);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return createPortal(
    <Dialog open={isOpen} onClose={modalCloseHandler}>
      <DialogTitle>
        {contactName ? DIALOG_TITLES.EDIT : DIALOG_TITLES.ADD}
      </DialogTitle>
      <form onSubmit={handleSubmit(successModalHandler)}>
        <DialogContent>
          <TextField
            autoFocus
            {...register(INPUT_NAMES.NAME)}
            id={IDS.NAME}
            label={LABELS.NAME}
            type='text'
            fullWidth
            variant='standard'
            margin='normal'
            error={!!errors[INPUT_NAMES.NAME]?.message}
            helperText={errors[INPUT_NAMES.NAME]?.message}
          />
          <TextField
            autoFocus
            {...register(INPUT_NAMES.PHONE)}
            id={IDS.PHONE}
            label={LABELS.PHONE}
            type='text'
            fullWidth
            variant='standard'
            margin='normal'
            error={!!errors[INPUT_NAMES.PHONE]?.message}
            helperText={errors[INPUT_NAMES.PHONE]?.message}
          />
          <FormControl margin='normal'>
            <RadioGroup aria-labelledby='gender-radio-group' row>
              <FormControlLabel
                value={GENDERS.FEMALE}
                control={<Radio {...register(INPUT_NAMES.GENDER)} />}
                label={LABELS.FEMALE}
              />
              <FormControlLabel
                value={GENDERS.MALE}
                control={<Radio {...register(INPUT_NAMES.GENDER)} />}
                label={LABELS.MALE}
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={modalCloseHandler}>{BUTTONS.CANCEL}</Button>
          <Button
            disabled={
              !watch(INPUT_NAMES.NAME) ||
              !watch(INPUT_NAMES.PHONE) ||
              !watch(INPUT_NAMES.GENDER)
            }
            type='submit'
          >
            {!!contactName ? BUTTONS.SAVE : BUTTONS.ADD}
          </Button>
        </DialogActions>
      </form>
    </Dialog>,
    document.body
  );
};
