import React, { useEffect, useState } from 'react';

import { Typography } from '@mui/material';

export function TypingAnimation({ message }:{message:string}) {
  const [displayedMessage, setDisplayedMessage] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < message.length) {
        setDisplayedMessage((prevMessage) => {
          currentIndex += 1;
          return prevMessage + message[currentIndex - 1];
        });
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust the interval speed as needed
  }, [message]);

  return (
    <Typography
      component="span"
      sx={{
        display: 'inline-block',
        overflow: 'hidden',
        fontSize: 16,
        animation: 'typingAnimation 0.2s steps(20, end)',
        '@keyframes typingAnimation': {
          from: { width: 0 },
          to: { width: '100%' },
        },
      }}
    >
      {displayedMessage}
    </Typography>
  );
}
