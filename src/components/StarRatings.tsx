import React from 'react';

import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

export function StarRatings({ rating }:{rating: number}) {
  const filledStars = Math.min(5, Math.max(0, Math.round(rating)));

  const starsArray = Array.from({ length: 5 }, (_, index) => {
    if (index < filledStars) {
      return <StarIcon key={index} style={{ color: '#FFD700' }} />;
    }
    return <StarOutlineIcon key={index} style={{ color: '#FFD700' }} />;
  });

  return <div>{starsArray}</div>;
}
