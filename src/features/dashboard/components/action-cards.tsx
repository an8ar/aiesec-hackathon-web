import React from 'react';

import DiscountIcon from '@mui/icons-material/Discount';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TheatersIcon from '@mui/icons-material/Theaters';
import {
  Box, Card, CardContent, Typography,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

export function ActionCards() {
  const navigate = useNavigate();
  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', gap: 2,
    }}
    >
      <Card sx={{
        background: 'linear-gradient(to right, #4f7dc1, #34313b)',
        cursor: 'pointer',
        cursor: 'pointer',
        borderRadius: '16px',
        ':hover': {
          opacity: 0.8,
        },
        ':hover': {
          opacity: 0.8,
        },
        height: '40%',
        px: 4,
        py: 4,
      }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 50,
          height: 50,

          borderRadius: '50%',
          background: 'linear-gradient(to right, #4f7dc1, #2aacf2)',
        }}
        >
          <TheatersIcon
            sx={{
              color: 'white',
            }}
          />
        </Box>
        <CardContent sx={{ mt: 1, p: 0 }}>
          <Typography variant="h5" sx={{ color: 'white' }}>
            Афиша
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2 }}>
        <Card
          sx={{
            background: 'linear-gradient(to right, #6bb386, #384a4c)',
            px: 4,
            cursor: 'pointer',
            ':hover': {
              opacity: 0.8,
            },
            borderRadius: '16px',
            height: '100%',
            py: 4,

          }}
          onClick={() => navigate('/afisha')}
        <Card
          sx={{
            background: 'linear-gradient(to right, #6bb386, #384a4c)',
            px: 4,
            cursor: 'pointer',
            ':hover': {
              opacity: 0.8,
            },
            borderRadius: '16px',
            height: '100%',
            py: 4,

          }}
          onClick={() => navigate('/afisha')}
        >
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: '50%',
            background: 'linear-gradient(to right, #79f5f1, #2bf5c9)',
          }}
          >
            <DiscountIcon sx={{ color: 'white' }} />
          </Box>

          <CardContent sx={{ mt: 1, p: 0 }}>
            <Typography variant="h5" sx={{ color: 'white' }}>
              Скидки
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{
          background: 'linear-gradient(to right, #449ad6, #303d4d)',
          px: 4,
          cursor: 'pointer',
          ':hover': {
            opacity: 0.8,
          },
          cursor: 'pointer',
          ':hover': {
            opacity: 0.8,
          },
          borderRadius: '16px',
          height: '100%',
          py: 4,
        }}
        >
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: '50%',
            background: 'linear-gradient(to right, #2bf9e6, #31b4f1)',
          }}
          >
            <PersonAddIcon sx={{ color: 'white' }} />
          </Box>
          <CardContent sx={{ mt: 1, p: 0 }}>
            <Typography variant="h5" sx={{ color: 'white' }}>
              <Link
                to="/create"
                style={{
                  textDecoration: 'none', color: 'white', fontSize: 'inherit',
                }}
              >
                Создай сам
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
