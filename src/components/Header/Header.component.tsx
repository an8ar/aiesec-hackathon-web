/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';

import TabsComponent from './Tabs/TabsComponent';

export default function HeaderComponent() {
  const [localTime, setLocalTime] = useState('');
  const [weather, setWeather] = useState('');

  useEffect(() => {
    const fetchLocalTime = async () => {
      const currentTime = new Date().toLocaleTimeString();
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'white',
          color: 'black',
        }}
      >
        <Toolbar>
          {/* Display local time */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {localTime}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: 'black',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
            }}
            >
              <WifiOutlinedIcon sx={{
                marginRight: '5px',
              }}
              />
              {' '}
              Free Wifi
            </div>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: 'black',

            }}
          >
            Weather:
            {' '}
            {weather}
          </Typography>
          <TabsComponent />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
