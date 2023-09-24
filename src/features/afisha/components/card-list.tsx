import React from 'react';

import RouteIcon from '@mui/icons-material/Route';
import {
  Box, Card, CardContent, CardMedia, Chip, IconButton, Tooltip, Typography,
} from '@mui/material';

import { StarRatings } from '~/components/StarRatings';
import { getFormattedTime } from '~/utils/getFormattedTime';

import { Promotion } from '../type';

type Props={
    promotions: Promotion[]
}

export default function CardList({ promotions }:Props) {
  return (
    <Box sx={{
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4,
    }}
    >
      {promotions.map((promotion) => (
        <Card
          key={promotion.id}
          sx={{ display: 'flex', flexDirection: 'column', background: '#405768' }}
        >
          <CardMedia
            component="img"
            height={150}
            width={300}
            src={promotion.banner_url}
          />
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
            title={promotion.address}
          >
            <p>
              До
              {' '}
              {promotion.address}
              {' '}
              %
            </p>
          </Tooltip>
          <IconButton sx={{
            position: 'absolute',
            top: 10,
            right: 4,
            backgroundColor: '#293749',
            borderRadius: '50%',
            color: 'white',
          }}
          >
            <RouteIcon />
          </IconButton>
          <Box style={{
            position: 'absolute',
            top: 100,
            right: 4,
            padding: '4px',
            backgroundColor: '#293749',
            color: 'white',
            borderRadius: '16px',
          }}
          >
            До
            {' '}
            {promotion.discount}
            %
          </Box>
          <CardContent sx={{ p: 0, mt: 2, px: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
              <Typography variant="h6" sx={{ color: 'white' }}>
                {promotion.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'white' }}>
                Находится от вас в:
                {' '}
                {promotion.distance}
              </Typography>
              <Typography variant="body2" sx={{ color: 'white' }}>
                Действует до:
                {' '}
                {getFormattedTime(promotion.expires)}
              </Typography>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              >
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 1,
                }}
                >
                  <StarRatings rating={promotion.reviews_rate} />
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
                    {promotion.reviews_rate}
                    {' '}
                    /
                    {' '}
                    {promotion.reviews_number}
                    {' '}
                    отзывов
                  </Typography>
                </Box>
                <Chip
                  variant="filled"
                  label={`${promotion.price} тг`}
                  sx={{
                    fontSize: 16, px: 1, backgroundColor: '#293749', color: 'white',
                  }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
