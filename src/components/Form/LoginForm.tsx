import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAppDispatch } from '../../app/hooks';
import { loginUser } from '../../app/authSlice';
import { FORM_HEADING, IDS, LABELS, NAMES, SUBMIT_BUTTON } from './constants';
import './LoginForm.css';
import { URLS } from '../constants';

export const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const clickShowPasswordHandler = () => {
    setIsPasswordShown((prevState) => !prevState);
  };

  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch(URLS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email: login, password: password }),
      headers: { 'Content-type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(
          loginUser({
            token: data.accessToken,
            userId: data.user.id,
          })
        );
        navigate('contacts');
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <form className={'login-form'} onSubmit={submitFormHandler}>
      <h1>{FORM_HEADING}</h1>
      <TextField
        id={IDS.LOGIN}
        name={NAMES.LOGIN}
        type='text'
        value={login}
        onChange={loginChangeHandler}
        label={LABELS.LOGIN}
        variant='outlined'
        fullWidth
      ></TextField>
      <TextField
        id={IDS.PASSWORD}
        name={NAMES.PASSWORD}
        type={isPasswordShown ? 'text' : 'password'}
        value={password}
        onChange={passwordChangeHandler}
        label={LABELS.PASSWORD}
        variant='outlined'
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={clickShowPasswordHandler}
                edge='end'
              >
                {isPasswordShown ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
      <Button variant='contained' type='submit' disabled={!login || !password}>
        {SUBMIT_BUTTON}
      </Button>
    </form>
  );
};
