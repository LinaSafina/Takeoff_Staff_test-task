import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import debounce from 'lodash.debounce';
import { SEARCH_INPUT } from './constants';

export const SearchInput = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchParam, setSearchParam] = useSearchParams({ search: '' });

  const delayedSearchHandler = useMemo(
    () =>
      debounce((value) => {
        if (searchParam.get('search') === value) {
          return;
        }

        value ? setSearchParam({ search: value }) : setSearchParam({});
      }, 1000),
    []
  );

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = event.target.value.toLowerCase();
    setSearchValue(enteredValue);
    delayedSearchHandler(enteredValue);
  };

  useEffect(() => {
    return () => delayedSearchHandler.cancel();
  }, [delayedSearchHandler]);

  return (
    <TextField
      autoFocus
      id={SEARCH_INPUT.ID}
      label={SEARCH_INPUT.LABEL}
      type='text'
      variant='outlined'
      margin='normal'
      value={searchValue}
      onChange={searchHandler}
    ></TextField>
  );
};
