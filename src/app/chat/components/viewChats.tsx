import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const ViewChats: React.FC = () => {
  return (
    <Button
      variant="text"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '2px',
        borderRadius: 1,
        color: 'var(--Text-Primary, #212B36)',
        fontFamily: 'Open Sans',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 'normal',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <QuestionAnswerIcon sx={{ marginRight: 1 }} />
        <Typography
          sx={{
            color: 'var(--Primary-Black, #212B36)',
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
      <Box
        sx={{
          display: 'flex',
          padding: '4px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        View All
        <ArrowForwardIosIcon />
      </Box>
    </Button>
  );
};

export default ViewChats;
