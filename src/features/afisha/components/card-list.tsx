import React, { useEffect, useState } from 'react';

import RouteIcon from '@mui/icons-material/Route';
import {
  Box, Card, CardContent, CardMedia, Chip, IconButton, Tooltip, Typography,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { MapFilter } from '~/components/CreateByYourself/Filter/MapFilter';
import { RightDrawer } from '~/components/right-drawer';
import { StarRatings } from '~/components/StarRatings';
import { getFormattedTime } from '~/utils/getFormattedTime';

import { Promotion } from '../type';

type Props={
    promotions: Promotion[]
}

export default function CardList({ promotions }:Props) {
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const [id, setId] = React.useState('' as string);

  const [promotionsList, setPromitions] = useState<Promotion[]>(promotions);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('search');

  const dateQuery = searchParams.get('date');

  useEffect(() => {
    const applyFilter = (input: string) => {
      if (input) {
        const searchTerm = input.replace(/\s/g, '').toLowerCase();

        const filteredPromotions = promotions.filter((promotion) => {
          const titleWithoutSpaces = promotion.title.replace(/\s/g, '').toLowerCase();
          return titleWithoutSpaces.includes(searchTerm);
        });

        setPromitions(filteredPromotions);
      } else if (input === '') {
        setPromitions(promotions);
      }
    };

    if (searchQuery) {
      applyFilter(searchQuery);
    } else {
      setPromitions(promotions); // Set promotions when there's no search query
    }
  }, [searchQuery, promotions]); // Updated dependencies

  useEffect(() => {
    const applyDateFilter = (date: string) => {
      if (date) {
        const filteredPromotions = promotions.filter((promotion) => {
          const expiryDate = promotion.expires.split('T')[0];

          return (new Date(expiryDate) >= new Date(date));
        });
        setPromitions(filteredPromotions);
      } else if (date === '') {
        setPromitions(promotions);
      }
    };

    if (dateQuery) {
      applyDateFilter(dateQuery);
    } else {
      setPromitions(promotions); // Set promotions when there's no search query
    }
  }, [dateQuery, promotions]);
  return (

    <Box>
      {
        promotionsList.length > 0
          ? (
            <Box sx={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4,
            }}
            >
              {promotionsList.map((promotion) => (
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
                      {promotion.address}
                    </p>
                  </Tooltip>
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
              setId(promotion.id);
            }
          }
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
          )
          : (
            <Box>
              <Typography variant="h3" sx={{ color: 'white', textAlign: 'center' }}>
                Нету результатов
              </Typography>
            </Box>
          )
            }
      <RightDrawer
        open={open}
        onClose={onClose}
        onOpen={() => setOpen(true)}
      >
        <MapFilter id={id} />
      </RightDrawer>
    </Box>
  );
}
