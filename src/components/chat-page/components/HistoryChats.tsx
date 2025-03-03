import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Checkbox,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { StarRounded, Delete as DeleteIcon } from '@mui/icons-material';
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

  // State to track hovered channel
  const [hoveredChannelId, setHoveredChannelId] = useState<string | null>(null);
  // State to track selected channels (by ID)
  const [selectedChannels, setSelectedChannels] = useState<{
    [channelId: string]: boolean;
  }>({});

  const handleMouseEnter = (channelId: string) => {
    setHoveredChannelId(channelId);
  };

  const handleMouseLeave = () => {
    setHoveredChannelId(null);
  };

  const toggleChannel = (channelId: string) => {
    setSelectedChannels((prev) => ({
      ...prev,
      [channelId]: !prev[channelId],
    }));
  };

  const handleDelete = (channelId: string) => {
    console.log('Delete channel:', channelId);
    // Add your delete logic here.
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: 2,
        width: '100%',
      }}
    >
      {chats.slice(0, 6).map((channel) => {
        const isHovered = hoveredChannelId === channel.organizationChannelId;
        const isSelected = !!selectedChannels[channel.organizationChannelId];
        const isHoveredOrSelected = isHovered || isSelected;

        return (
          <Paper
            key={channel.organizationChannelId}
            onMouseEnter={() => handleMouseEnter(channel.organizationChannelId)}
            onMouseLeave={handleMouseLeave}
            elevation={0}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              height: '84px', // Fixed height to prevent shift
              border: '1px solid var(--Secondary-Dark-Gray, #4A4A4A)',
              borderRadius: 2,
              position: 'relative',
              gap: 2,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'rgba(255, 0, 0, 0.05)',
              },
            }}
            onClick={() => moveToChannelDetail({ ...channel, selected: false })}
          >
            {/* Checkbox on hover/selection */}
            {isHoveredOrSelected && (
              <Box
                sx={{
                  position: 'absolute',
                  left: '-13px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  pointerEvents: 'auto',
                  p: 0,
                  bgcolor: '#fff',
                  borderRadius: 1,
                }}
              >
                <Checkbox
                  checked={isSelected}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleChannel(channel.organizationChannelId);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    color: 'var(--Primary-Black, #212B36)',
                    p: 0,
                    '&.Mui-checked': {
                      color: 'var(--Primary-Black, #212B36)',
                    },
                  }}
                />
              </Box>
            )}

            {/* Left box with title and date */}
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                sx={{
                  color: '#000',
                  fontFamily: 'Open Sans',
                  fontSize: '14px',
                  fontWeight: 700,
                  mb: 1,
                  textAlign: 'left',
                  '.group:hover &': { color: '#990000' },
                }}
              >
                {channel.organizationChannelTitle.length > 5
                  ? `${channel.organizationChannelTitle.substring(0, 5)}...`
                  : channel.organizationChannelTitle}
              </Typography>
              <Typography
                sx={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 1,
                  overflow: 'hidden',
                  color: 'text.secondary',
                  textOverflow: 'ellipsis',
                  fontFamily: 'Open Sans',
                  fontSize: '12px',
                  textAlign: 'left',
                  fontWeight: 400,
                }}
              >
                {new Date(
                  channel.organizationChannelCreateDate
                ).toLocaleDateString()}
              </Typography>
            </Box>

            {/* Right side: fixed width container for icons */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <IconButton size="small" sx={{ padding: '8px' }}>
                <StarRounded
                  sx={{
                    width: '25px',
                    height: '25px',
                    color: '#000',
                  }}
                />
              </IconButton>
              {isHoveredOrSelected && (
                <IconButton
                  size="small"
                  sx={{
                    color: '#CC0000',
                    transform: 'translateX(10px)',
                    padding: '8px',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isSelected) {
                      toggleChannel(channel.organizationChannelId);
                    }
                    handleDelete(channel.organizationChannelId);
                  }}
                >
                  <DeleteIcon
                    sx={{
                      width: '25px',
                      height: '25px',
                    }}
                  />
                </IconButton>
              )}
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
};

export default HistoryChats;
