import React, { useState } from 'react';

import {
  TextField, Button, Box, Stack,
} from '@mui/material';
import moment from 'moment';

import { usePostSelfEventMutation } from '~/api/events/api';

import { LocationSelector } from './location-selector';

export function SelfEventForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    banner_url: '',
    category: '',
    author: '',
    datetime: '',
    address: '',
    location: '',
    city: '',
  });
  const [postSelfEvent] = usePostSelfEventMutation();
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const now = moment().format('YYYY-MM-DDTHH:mm:ssZ');

    formData.category = 'self-made';
    formData.city = 'Astana';
    formData.datetime = now;
    postSelfEvent(formData);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Название"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Описание"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Ссылка на фото из интернета"
            name="banner_url"
            value={formData.banner_url}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Автор"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <LocationSelector
            onLocationSelect={(locationData) => {
              formData.address = locationData.address;
              formData.location = `${locationData.location.lat} ${locationData.location.lng}`;
            }}
          />
        </Stack>
        <Box p={2}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default SelfEventForm;
