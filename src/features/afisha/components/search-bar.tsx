import React from 'react';

import { Search } from '@mui/icons-material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  Box, Chip, IconButton, InputAdornment, TextField,
} from '@mui/material';

export function SearchBar() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 2,
      py: 1,
      px: 2,
      background: 'linear-gradient(to right, #4f7dc1, #34313b)',
    }}
    >
      <TextField
        id="outlined-start-adornment"
        sx={{
          flexGrow: 1,
          border: 'white',
          '& label.Mui-focused': {
            color: 'white',
          },
          '& label.Mui-default': {
            color: 'white',
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
          borderColor: 'white',
        }}
        InputProps={{
          endAdornment:
  <InputAdornment position="end">
    <Search style={{ color: 'white' }} />
  </InputAdornment>,
        }}
        InputLabelProps={{ disabled: true }}
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
            py: 2,
            color: 'white',
            cursor: 'pointer',
          }}
        />
        <Chip
          variant="filled"
          label="Завтра"
          sx={{
            fontSize: 24,
            px: 4,
            py: 2,
            color: 'white',
            cursor: 'pointer',
          }}
        />
        <Chip
          variant="filled"
          label="Послезавтра"
          sx={{
            fontSize: 24,
            px: 4,
            py: 2,
            color: 'white',
            cursor: 'pointer',
          }}
        />
      </Box>
    </Box>
  );
}
