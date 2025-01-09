import { Box, Typography } from '@mui/material';
import React from 'react';
import { ArrowOutwardRounded } from '@mui/icons-material';

interface SuggestionsProps {
  title: string;
}

const Suggestions: React.FC<SuggestionsProps> = ({ title }) => {
  return (
    <Box onClick={() => console.log('clicked')} sx={{ cursor: 'pointer' }}>
      <Typography
        variant="h6"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--Primary-Black, #000)',
          fontFamily: 'Public Sans',
          fontSize: '13px',
          fontWeight: '700',
          lineHeight: '22px',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '8px',
          gap: '8px',
        }}
      >
        {title}
        <ArrowOutwardRounded sx={{ color: 'white' }} />
      </Typography>
    </Box>
  );
};

export default Suggestions;
