import React, { useState } from 'react';

import { Tabs, Tab, Box } from '@mui/material';
// import { useTranslation } from 'react-i18next';

function TabsComponent() {
//   const { i18n } = useTranslation();
  const [value, setValue] = useState('kz');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ backgroundColor: 'white', marginLeft: 10 }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab
          label="Қазақ тілі"
          value="kz"
          sx={{ minWidth: '120px' }}
          style={{
            color: 'black',
          }}
        />
        <Tab
          style={{
            color: 'black',
          }}
          label="Русский язык"
          value="ru"
          sx={{ minWidth: '120px' }}
        />
      </Tabs>
    </Box>
  );
}

export default TabsComponent;
