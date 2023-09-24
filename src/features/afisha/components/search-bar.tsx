import React from 'react';

import { Search } from '@mui/icons-material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  Box, Chip, IconButton, InputAdornment, TextField,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { formatDate } from '~/utils/formatDate';
import { getFollowingDay } from '~/utils/getFollowingDay';

export function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentDate = new Date();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      searchParams.set('search', e.target.value);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const textFieldValue = searchParams.get('search');

  const date = searchParams.get('date');
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 2,
      gap: 2,
    }}
    >
      <TextField
        id="outlined-start-adornment"
        placeholder="Ищите любые эвенты в вашем городе"
        value={textFieldValue}
        sx={{
          flexGrow: 1,
          backgroundColor: 'white',
          borderRadius: 1,
          color: 'white',
          maxHeight: 50,
        }}
        InputProps={{
          endAdornment:
  <InputAdornment position="end">
    <Search style={{ color: 'white' }} />
  </InputAdornment>,
        }}
        onChange={onInputChange}
      />
      <Box sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        color: 'white',
      }}
      >
        <IconButton size="large">
          <FilterAltIcon style={{ width: 30, height: 30, color: 'white' }} />
        </IconButton>
        <Chip
          variant="filled"
          label="Сегодня"
          sx={{
            fontSize: 24,
            px: 4,
            py: 3,
            color: 'white',
            border: date === formatDate(currentDate) ? 1 : 0,
            borderColor: 'white',
            cursor: 'pointer',
          }}
          onClick={() => {
            if (date === formatDate(currentDate)) {
              searchParams.delete('date');
            } else {
              searchParams.set('date', formatDate(currentDate));
            }
            setSearchParams(searchParams);
          }}
        />
        <Chip
          variant="filled"
          label="Завтра"
          sx={{
            fontSize: 24,
            px: 4,
            py: 3,
            color: 'white',
            border: date === formatDate(getFollowingDay(currentDate)) ? 1 : 0,
            borderColor: 'white',
            cursor: 'pointer',
          }}
          onClick={() => {
            if (date === formatDate(getFollowingDay(currentDate))) {
              searchParams.delete('date');
            } else {
              searchParams.set('date', formatDate(getFollowingDay(currentDate)));
            }
            setSearchParams(searchParams);
          }}
        />
      </Box>
    </Box>
  );
}
