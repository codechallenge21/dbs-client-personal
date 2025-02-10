'use client';

import { Box, CircularProgress, styled } from '@mui/material';

const StyledCircularProgress = styled(CircularProgress)({
  color: '#1976d2',
  '& .MuiCircularProgress-circle': {
    strokeLinecap: 'round',
  },
});

export default function CustomLoader() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'flex-start',
      }}
    >
      <StyledCircularProgress
        size={30}
        thickness={3.6}
        sx={{ color: 'rgb(59, 130, 246)' }}
      />
    </Box>
  );
}
