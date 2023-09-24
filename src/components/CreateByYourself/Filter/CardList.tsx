/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import RouteIcon from '@mui/icons-material/Route';
import {
  Paper, Typography, Tooltip, IconButton, Box,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { IEvents } from '~/api/events/api';
import { RightDrawer } from '~/components/right-drawer';
import { getFormattedTime } from '~/utils/getFormattedTime';

import { MapFilter } from './MapFilter';

export function CardList({ eventsList }:{eventsList:IEvents[]}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const jerryId = searchParams.get('jerryId');

  const [events, setEvents] = useState<IEvents[]>(eventsList);

  const [open, setOpen] = React.useState(false);

  const onClose = () => setOpen(false);

  const [id, setId] = React.useState('' as string);

  const searchQuery = searchParams.get('search');

  const dateQuery = searchParams.get('date');

  useEffect(() => {
    const applyFilter = (input: string) => {
      if (input) {
        const searchTerm = input.replace(/\s/g, '').toLowerCase();

        const filteredEvents = eventsList.filter((event) => {
          const titleWithoutSpaces = event.title.replace(/\s/g, '').toLowerCase();
          return titleWithoutSpaces.includes(searchTerm);
        });

        setEvents(filteredEvents);
      } else {
        setEvents(eventsList); // Set eventsList when there's no search query
      }
    };

    if (searchQuery) {
      applyFilter(searchQuery);
    } else {
      setEvents(eventsList); // Set eventsList when there's no search query
    }
  }, [searchQuery, eventsList]);

  useEffect(() => {
    const applyDateFilter = (date: string) => {
      if (date) {
        const filteredEvents = eventsList.filter((event) => {
          const eventDate = event.datetime.split('T')[0];
          return eventDate === date;
        });
        setEvents(filteredEvents);
      } else {
        setEvents(eventsList); // Set eventsList when there's no date query
      }
    };

    if (dateQuery) {
      applyDateFilter(dateQuery);
    } else {
      setEvents(eventsList); // Set eventsList when there's no date query
    }
  }, [dateQuery, eventsList]);

  return (
    <div>
      <div style={{
        marginTop: '20px',
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: 'repeat(3, 1fr)',
        justifyContent: 'center',
      }}
      >
        {events && events.map((event: IEvents) => (
          <Paper
            key={event.id}
            elevation={3}
            style={{
              backgroundColor: '#405768',
              color: 'white',
              borderRadius: '8px',
              marginBottom: '20px',
              display: 'flex',
              position: 'relative',
              flexDirection: 'column',
            }}
          >
            <Tooltip
              style={{
                position: 'absolute',
                top: 2,
                left: 4,
                maxWidth: '300px',
                textOverflow: 'ellipsis',
                padding: '4px',
                backgroundColor: '#293749',
                color: '#fff',
                borderRadius: '16px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
              title={event.address}
            >
              <p>
                {event.city}
                ,
                {' '}
                {event.address}
              </p>
            </Tooltip>
            <img
              src={event.banner_url}
              alt="event"
              style={{
                width: '100%',
                borderRadius: '8px',
                objectFit: 'cover',
                height: 150,
              }}
            />
            <IconButton
              sx={{
                position: 'absolute',
                top: 10,
                right: 4,
                backgroundColor: '#293749',
                borderRadius: '50%',
                color: 'white',
                ':hover': {
                  opacity: 0.9,
                  backgroundColor: '#293749',
                },
              }}
              onClick={() => {
                setOpen(true);
                setId(event.id);
              }}
            >
              <RouteIcon />
            </IconButton>
            <Box sx={{ px: 2, mt: 1 }}>
              <Typography variant="h6" gutterBottom>
                {event.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Дата:
                {' '}
                {getFormattedTime(event.datetime)}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginTop: '10px',
                }}
              >
                Расстояние от вас:
                {' '}
                {event.distance}
              </Typography>
            </Box>
          </Paper>
        ))}
        {jerryId
          && (
          <RightDrawer
            open={open}
            onClose={onClose}
            onOpen={() => setOpen(true)}
          >
            <MapFilter id={id} value={jerryId} />
          </RightDrawer>
          )}
      </div>
    </div>
  );
}
