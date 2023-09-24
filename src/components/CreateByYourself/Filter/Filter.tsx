/* eslint-disable max-len */
import React from 'react';

import {
  MenuItem, Paper, TextField, Typography, CircularProgress, Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

import { IEvents, useGetEventsQuery } from '~/api/events/api';
import { RightDrawer } from '~/components/right-drawer';

import { MapFilter } from './MapFilter';

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

export function Filter() {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [value, setValue] = React.useState('jerry3');
  const { data, isLoading, isError } = useGetEventsQuery(value);
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const [id, setId] = React.useState('' as string);

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        marginTop: '20px',
      }}
      >
        <TextField
          id="outlined-select-currency"
          select
          sx={{
            width: '400px',
            marginBottom: '20px',
          }}
          label="Select a City"
          variant="outlined"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          fullWidth
        >
          {jerries.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <DatePicker
          label="Select a Date"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => (
            <TextField
              sx={{
                width: '400px',
                marginBottom: '20px',
                marginLeft: '20px',
              }}
              {...params}
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>

      <div style={{
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
            <div style={{ flex: '1' }}>
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
            </div>
          </Paper>
        ))}
        <RightDrawer
          open={open}
          onClose={onClose}
          onOpen={() => setOpen(true)}
        >
          <MapFilter id={id} value={value} />
        </RightDrawer>
      </div>
    </div>
  );
}
