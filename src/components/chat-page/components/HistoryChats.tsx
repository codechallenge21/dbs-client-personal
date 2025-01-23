import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import {
  OrganizationChannel,
  OrganizationChannelData,
} from '@/interfaces/entities';

interface HistoryChatsProps {
  chats: OrganizationChannel[];
  moveToChannelDetail: (channel: OrganizationChannelData) => void;
}

const HistoryChats: React.FC<HistoryChatsProps> = ({
  chats,
  moveToChannelDetail,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
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
            width: isMobile ? '100%' : 'calc(33.33% - 16px)', // Adjusting width to fit 3 items per row on desktop
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            textAlign: 'left',
            boxSizing: 'border-box', // Ensuring padding and border are included in width
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            cursor: 'pointer',
          }}
          onClick={() => moveToChannelDetail({ ...chat, selected: false })}
        >
          <Typography
            sx={{
              fontFamily: 'var(--font-open-sans)',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
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
