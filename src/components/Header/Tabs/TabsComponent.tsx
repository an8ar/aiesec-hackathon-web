import React, { useState } from 'react';

import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
// import { useTranslation } from 'react-i18next';

function TabsComponent() {
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
        backgroundColor: 'white',
      }}
    >
      <MenuItem
        value="kz"
        sx={{ minWidth: '120px' }}
      >
        Қазақ тілі
      </MenuItem>
      <MenuItem
        value="ru"
        sx={{ minWidth: '120px' }}
      >
        Русский язык
      </MenuItem>
      <MenuItem
        value="en"
        sx={{ minWidth: '120px' }}
      >
        English
      </MenuItem>
    </Select>
  );
}

export default TabsComponent;
