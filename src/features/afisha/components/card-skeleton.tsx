import React from 'react';

import { Box, Skeleton } from '@mui/material';

export function CardSkeleton() {
  const cardSkeletons = Array.from({ length: 9 }, (_, index) => (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      backgroundColor: '#405768',
      mt: 2,
      borderRadius: 2,
    }}
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        height={150}
        style={{ background: '#637381' }}
      />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} style={{ background: '#637381' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} style={{ background: '#637381' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} style={{ background: '#637381' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} style={{ background: '#637381' }} />
    </Box>
  ));

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
      {cardSkeletons}
    </Box>
  );
}
