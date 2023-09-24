/* eslint-disable no-restricted-imports */
import React, { useEffect } from 'react';

import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { JERRYS } from '~/constants/jerry';
import { setJerry } from '~/features/Slices/jerrySlice';
import { useAppSelector } from '~/store';

export function SelectJerry() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { jerry: jerrySelect } = useAppSelector((state) => state.jerrySlice);

  const handleChange = (e: SelectChangeEvent<string>) => {
    setSearchParams({ jerryId: e.target.value });
    const selectedJerry = JERRYS.find((item) => item.ID === e.target.value);
    if (selectedJerry) {
      setJerry(selectedJerry);
    }
  };

  const selectValue = searchParams.get('jerryId') ?? jerrySelect?.ID ?? '';

  useEffect(() => {
    if (jerrySelect) {
      searchParams.set('jerryId', jerrySelect.ID);
      setSearchParams(searchParams);
    }
  }, [jerrySelect, searchParams]);

  const jerrys = JERRYS.find((item) => item.ID === selectValue);

  localStorage.setItem('jerry', JSON.stringify(jerrys));

  return (
    <Select
      value={selectValue}
      variant="outlined"
      onChange={handleChange}
      label="Jerry"
      sx={{
        backgroundColor: '#293749',
        color: 'white',
        px: 3,
        py: 2,
        borderRadius: 4,
        maxHeight: 55,
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
