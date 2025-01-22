import React from 'react';
import { Box, Typography } from '@mui/material';
import { OrganizationChannel } from '@/interfaces/entities';

interface HistoryChatsProps {
  chats: OrganizationChannel[];
}

const HistoryChats: React.FC<HistoryChatsProps> = ({ chats }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '12px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {chats.slice(0, 6).map((chat, index) => (
        <Box
          key={index}
          sx={{
            maxWidth: 'calc(33.33% - 16px)', // Adjusting width to fit 3 items per row
            padding: '16px',
            flex: '1 1 calc(33.33% - 16px)', // Ensuring flex basis is 33.33%
            border: '1px solid #ccc',
            borderRadius: '8px',
            textAlign: 'left',
            boxSizing: 'border-box', // Ensuring padding and border are included in width
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'var(--font-open-sans)',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal',
            }}
          >
            {chat.organizationChannelTitle}
          </Typography>
          <Typography
            sx={{
              overflow: 'hidden',
              color: 'var(--Secondary-Dark-Gray, #4A4A4A)',
              textOverflow: 'ellipsis',
              fontFamily: 'DFPHeiMedium-B5',
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
              alignSelf: 'stretch',
            }}
          >
            {new Date(chat.organizationChannelCreateDate).toLocaleString()}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default HistoryChats;
