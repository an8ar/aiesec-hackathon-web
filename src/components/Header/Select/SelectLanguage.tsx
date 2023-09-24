import React, { useState } from 'react';

import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

export function SelectLanguage() {
//   const { i18n } = useTranslation();
  const [value, setValue] = useState('kz');

  const handleChange = (e: SelectChangeEvent<string>) => {
    setValue(e.target.value);
  };

  return (
    <Select
      value={value}
      variant="outlined"
      onChange={handleChange}
      label="Язык"
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
      <MenuItem
        value="kz"
      >
        KZ
      </MenuItem>
      <MenuItem
        value="ru"
      >
        RU
      </MenuItem>
      <MenuItem
        value="en"
      >
        EN
      </MenuItem>
    </Select>
  );
}
