/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { SelectJerry } from './Select/SelectJerry';
import { SelectLanguage } from './Select/SelectLanguage';

export default function HeaderComponent() {
  const { t } = useTranslation();
  const [localTime, setLocalTime] = useState('');
  const [weather, setWeather] = useState('');

  useEffect(() => {
    const fetchLocalTime = async () => {
      const currentTime = new Date().toLocaleTimeString(undefined, { timeStyle: 'short' });
      setLocalTime(currentTime);
    };
    const fetchWeatherData = async () => {
      try {
        // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
        const apiKey = '6c56a12d157f2f8f9226bc3442ae755b';
        const response = await axios.get(
          // eslint-disable-next-line max-len
          `https://api.openweathermap.org/data/2.5/weather?q=Astana&units=Metric&appid=${apiKey}`,
        );

        // Extract relevant weather information from the response
        const weatherData = response.data.weather[0];
        const temperature = response.data.main.temp.toFixed(0);

        // Update the 'weather' state with the fetched data
        setWeather(`${weatherData.main} (${temperature}°C)`);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLocalTime();
    fetchWeatherData();
  }, []);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#405768',
        color: 'white',
        mt: 2,
        borderRadius: 2,
      }}
    >
      <Toolbar sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        textColor: 'white',
      }}
      >
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          {localTime}
        </Typography>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 4,
          color: 'white',
          flexGrow: 1,
        }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: 'flex',
              background: '#293749',
              px: 3,
              py: 2,
              borderRadius: 8,
              alignItems: 'center',
            }}
          >
            <WifiOutlinedIcon sx={{
              marginRight: '5px',
            }}
            />
            {' '}
            {t('freeWifi')}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              background: '#293749',
              px: 3,
              py: 2,
              borderRadius: 8,
            }}
          >
            {weather}
          </Typography>
          <SelectLanguage />
          <SelectJerry />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
