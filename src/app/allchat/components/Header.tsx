import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowBackIosNewRounded } from '@mui/icons-material';

export default function Header() {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          padding: '8px 16px',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <IconButton sx={{ padding: '0px' }}>
            <ArrowBackIosNewRounded sx={{ color: 'black', margin: '8px' }} />
          </IconButton>
          <Typography
            sx={{
              color: '#212B36',
              textAlign: 'center',
              fontFamily: 'DFPHeiBold-B5',
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
            }}
          >
            歷史紀錄
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
