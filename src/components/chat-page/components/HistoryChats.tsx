import {
  OrganizationChannel,
  OrganizationChannelData,
} from '@/interfaces/entities';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

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
        alignSelf: 'stretch',
        pb: '16px',
      }}
    >
      {chats.slice(0, 6).map((chat, index) => (
        <Box
          key={index}
          tabIndex={0}
          sx={{
            width: isMobile ? '100%' : 'calc(33.33% - 8px)', // Adjusting width to fit 3 items per row on desktop
            padding: isMobile ? '8px 16px' : '16px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '4px' : '16px',
            cursor: 'pointer',
            '&:focus-visible': {
              outline: 'none',
              backgroundColor: 'rgba(204, 0, 0, 0.08)',
              border: '2px solid rgba(145, 158, 171, 0.4)',
            },
          }}
          onClick={() => moveToChannelDetail({ ...chat, selected: false })}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              moveToChannelDetail({ ...chat, selected: false });
            }
          }}
        >
          <Typography
            sx={{
              fontFamily: 'var(--font-medium)',
              fontSize: '14px',
              fontStyle: 'normal',
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
              fontFamily: 'var(--font-medium)',
              fontSize: '12px',
              fontStyle: 'normal',
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
      ))
      }
    </Box >
  );
};

export default HistoryChats;
