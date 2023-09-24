import React from 'react';

import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { JERRYS } from '~/constants/jerry';

export function SelectJerry() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: SelectChangeEvent<string>) => {
    setSearchParams({ jerryId: e.target.value });
  };

  const selectValue = searchParams.get('jerryId') ?? undefined;

  return (
    <Select
      value={selectValue}
      variant="outlined"
      onChange={handleChange}
      label="Jerry"
      sx={{
        backgroundColor: '#293749',
        color: 'white',
        padding: 1,
        maxHeight: 40,
        '& legend': { display: 'none' },
        '& fieldset': { top: 0 },

      }}
    >
      {JERRYS.map((jerry) => (
        <MenuItem key={jerry.ID} value={jerry.ID}>
          {jerry.name}
        </MenuItem>
      ))}
    </Select>
  );
}
