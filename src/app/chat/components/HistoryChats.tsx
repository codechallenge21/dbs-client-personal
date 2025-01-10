import React from 'react';
import { Box, Typography } from '@mui/material';

export interface Chat {
  title: string;
  date: string;
}

interface HistoryChatsProps {
  chats: Chat[];
}

const HistoryChats: React.FC<HistoryChatsProps> = ({ chats }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '16px',
      }}
    >
      {chats.map((chat, index) => (
        <Box
          key={index}
          sx={{
            maxWidth: 'calc(33.33% - 16px)', // Adjusting width to fit 3 items per row
            padding: '16px',
            flex: '1 1 calc(33.33% - 16px)', // Ensuring flex basis is 33.33%
            border: '1px solid #ccc',
            borderRadius: '8px',
            margin: '10px 0',
            textAlign: 'left',
            boxSizing: 'border-box', // Ensuring padding and border are included in width
          }}
        >
          <Typography variant="h6">{chat.title}</Typography>
          <Typography variant="body2">{chat.date}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default HistoryChats;
