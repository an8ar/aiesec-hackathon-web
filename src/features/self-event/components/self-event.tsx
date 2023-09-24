/* eslint-disable max-len */
import React from 'react';

import {
  Paper, Typography, CircularProgress, Button, Box, IconButton,
} from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { IEvents, useGetSelfEventQuery } from '~/api/events/api';
import { Iconify } from '~/components/Iconify';
import { RightDrawer } from '~/components/right-drawer';

import { Qrcode } from 'features/qrcode';

import { MapFilter } from './map-filter';

const jerries = [
  {
    value: 'jerry1',
    label: 'Almaty 1',
  },
  {
    value: 'jerry2',
    label: 'Almaty 2',
  },
  {
    value: 'jerry3',
    label: 'Astana 1',
  },
  {
    value: 'jerry4',
    label: 'Astana 2',
  },
];

export function SelfEvent() {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [value, setValue] = React.useState('jerry3');
  const { data, isLoading, isError } = useGetSelfEventQuery(value);
  const navigate = useNavigate();
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const [id, setId] = React.useState('' as string);

  return (
    <Box>
      <IconButton onClick={() => navigate('/')}>
        <Iconify icon="material-symbols:arrow-back-ios-new" sx={{ width: 24, height: 24 }} />
      </IconButton>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>

        <Typography variant="h5" sx={{ color: 'white' }}>
          Чтобы добавить свой ивент, перейдите по QR-коду
        </Typography>
        <Box onClick={() => navigate('/self-event-form')}>
          <Qrcode url="http://169.254.37.115:5173/self-event-form" />
        </Box>

      </Box>

      <Box style={{
        marginTop: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
      }}
      >
        {isLoading && <CircularProgress />}
        {isError && (
          <Typography variant="h6" color="error">
            Something went wrong...
          </Typography>
        )}
        {data && data.events.filter && data.events.filter((event: IEvents) => { if (selectedDate) return moment(event.datetime).format('MMMM Do YYYY') === moment(selectedDate).format('MMMM Do YYYY'); return true; }).map((event: IEvents) => (
          <Paper
            key={event.id}
            elevation={3}
            style={{
              backgroundColor: '#405768',
              color: 'white',
              width: '400px',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '20px',
              gap: '20px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <img
              src={event.banner_url}
              alt="event"
              style={{
                width: '100%',
                borderRadius: '8px',

              }}
            />
            <Typography variant="h6" gutterBottom>
              {event.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {moment(event.datetime).format('MMMM Do YYYY, h:mm a')}
            </Typography>
            <Box style={{ flex: '1' }}>
              <Typography variant="body1" gutterBottom>
                {event.city}
                ,
                {' '}
                {event.address}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginTop: '20px',
                }}
              >
                Расстояние от вас:
                {' '}
                {event.distance}
              </Typography>
              <Button
                onClick={() => {
                  setOpen(true);
                  setId(event.id);
                }}
                sx={{ marginTop: '20px' }}
              >
                Open Right Drawer

              </Button>
            </Box>
          </Paper>
        ))}
        <RightDrawer
          open={open}
          onClose={onClose}
          onOpen={() => setOpen(true)}
        >
          <MapFilter id={id} value={value} />
        </RightDrawer>
      </Box>
    </Box>
  );
}
