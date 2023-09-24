/* eslint-disable max-len */
import React from 'react';

import { ChevronLeft } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RouteIcon from '@mui/icons-material/Route';
import {
  Paper, Typography, Box, Accordion, AccordionSummary, AccordionDetails, IconButton,
} from '@mui/material';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { IEvents, useGetSelfEventQuery } from '~/api/events/api';
import { RightDrawer } from '~/components/right-drawer';
import { Qrcode } from '~/features/qrcode';

import { MapFilter } from './map-filter';

export function SelfEvent() {
  const { t } = useTranslation();
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
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }}>
      <Box>
        <Typography
          sx={{
            textDecoration: 'underline', color: 'white', display: 'flex', mb: 0.5, cursor: 'pointer',
          }}
          variant="h6"
          onClick={() => navigate('/')}
        >
          <ChevronLeft />
          Назад
        </Typography>
      </Box>
      <Box style={{
        marginTop: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
      }}
      >
        {data && data.events.map((event: IEvents) => (
          <Paper
            key={event.id}
            elevation={3}
            style={{
              backgroundColor: '#405768',
              color: 'white',
              borderRadius: '8px',
              marginBottom: '20px',
              maxHeight: '250px',
              display: 'flex',
              position: 'relative',
              flexDirection: 'column',
              overflow: 'scroll',
            }}
          >
            <img
              src={event.banner_url}
              alt="event"
              style={{
                width: '100%',
                maxHeight: '100px',
                borderRadius: '8px',
                objectFit: 'cover',

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
              onClick={
            () => {
              setOpen(true);
              setId(event.id);
            }
          }
            >
              <RouteIcon />
            </IconButton>
            <Box sx={{ px: 2, mt: 1 }}>
              <Typography variant="h6" gutterBottom>
                {event.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Создано:
                {' '}
                {moment(event.datetime).format('MMMM Do YYYY, h:mm a')}
              </Typography>
              <Box style={{ flex: '1' }}>
                <Typography variant="body1" gutterBottom>
                  Адресс:
                  {event.city}
                  ,
                  {' '}
                  {event.address}
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
            </Box>
          </Paper>
        ))}
      </Box>
      <Box sx={{ mb: 20 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Хотите добавить свое событие?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>

              <Typography variant="h5">
                Чтобы добавить свой ивент, перейдите по QR-коду
              </Typography>
              <Box onClick={() => navigate('/self-event-form')}>
                <Qrcode url="http://169.254.37.115:5173/self-event-form" />
              </Box>

            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      <RightDrawer
        open={open}
        onClose={onClose}
        onOpen={() => setOpen(true)}
      >
        <MapFilter id={id} value={value} />
      </RightDrawer>
    </Box>
  );
}
