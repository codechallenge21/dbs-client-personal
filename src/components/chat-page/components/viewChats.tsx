import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

interface ViewChatsProps {
  onClick: () => void;
}

const ViewChats: React.FC<ViewChatsProps> = ({ onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '2px',
        borderRadius: 1,
        color: 'var(--Text-Primary, #212B36)',
        fontFamily: 'var(--font-open-sans)',
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
            fontFamily: 'var(--font-bold)',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
          }}
        >
          {isMobile ? '歷史...' : '歷史紀錄'}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          padding: '4px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          '&:hover': {
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
          },
          '&:focus-visible': {
            backgroundColor: 'rgba(204, 0, 0, 0.08)', // #CC0000 with 8% opacity
            border: '2px solid rgba(145, 158, 171, 0.4)',
            outline: 'none',
            borderRadius: '5px',
          },
        }}
        tabIndex={0}
        role="button"
        aria-label="View all chats"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick();
          }
        }}
      >
        查看全部
        <ArrowForwardIosIcon sx={{ fontSize: '12px' }} />
      </Box>
    </Box>
  );
};

export default ViewChats;
