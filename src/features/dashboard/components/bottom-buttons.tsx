import React from 'react';

import { Telegram } from '@mui/icons-material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Box from '@mui/material/Box';

export function BottomButtons({
  handleClickOpen, setOpenTelegram,
}: {
  handleClickOpen: () => void;
  setOpenTelegram: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        display: 'flex',
        alignItems: 'center',
        left: '50%',
        gap: 2,
        borderRadius: '50%',
        background: '#6a6b7c',
      }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: '50%',
        cursor: 'pointer',
        background: 'linear-gradient(to right, #4f7dc1, #2aacf2)',
      }}
      >
        <CameraAltIcon
          style={{ color: 'white', cursor: 'pointer' }}
          onClick={
          handleClickOpen
        }
        />
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        cursor: 'pointer',
        borderRadius: '50%',
        background: 'linear-gradient(to right, #4f7dc1, #2aacf2)',
      }}
      >
        <Telegram
          style={{ color: 'white' }}
          onClick={
          () => {
            setOpenTelegram(true);
          }
        }
        />
      </Box>
    </Box>

  );
}
