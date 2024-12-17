'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
export default function LoadingScreen() {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          marginBottom: 2,
          fontWeight: 500
        }}
      >
        正在處理中...
      </Typography>
      
      <Typography
        sx={{
          marginBottom: 3,
          color: 'text.secondary'
        }}
      >
        這可能需要幾秒鐘的時間，請不要離開頁面。
      </Typography>

      <LinearProgress 
        variant="determinate"
      value={100}
        sx={{
          width: '100%',
          maxWidth: '600px',
          height: 8,
          borderRadius: 4,
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
            backgroundColor: '#1976d2'
          },
          backgroundColor: '#e3f2fd'
        }}
      />
    </Box>
  )
}

