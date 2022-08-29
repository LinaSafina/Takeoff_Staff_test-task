import React, { useState } from 'react';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { FORM_HEADING, IDS, LABELS, NAMES, SUBMIT_BUTTON } from './constants';
import styles from './Form.module.css';
import { useNavigate } from 'react-router-dom';

export const Form = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const navigate = useNavigate();

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

  const submitFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = '/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ email: login, password: password }),
        headers: { 'Content-type': 'application/json' },
      });
      const data = await response.json();
      localStorage.setItem('token', data.accessToken);
    } catch (e) {
      console.log(e);
    }

    navigate('contacts');
  };

  return (
    <form className={styles.form} onSubmit={submitFormHandler}>
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
      <Button variant='contained' type='submit'>
        {SUBMIT_BUTTON}
      </Button>
    </form>
  );
};
