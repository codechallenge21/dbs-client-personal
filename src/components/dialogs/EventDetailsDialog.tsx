'use client';

import * as React from 'react';
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface EventDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

export default function EventDetailsDialog({
  open,
  onClose,
  title = '詳細內容',
}: EventDetailsDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Drawer
      anchor={isMobile ? 'bottom' : 'right'}
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          display: 'flex',
          maxWidth: isMobile ? '100%' : '430px',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'flex-start',
          flexShrink: 0,
          borderRadius: isMobile ? '8px 8px 0 0' : '8px',
          alignSelf: 'stretch',
          backgroundColor: '#ffffff',
          marginTop: isMobile ? '0' : '16px',
          marginRight: isMobile ? '0' : '16px',
          height: isMobile ? 'auto' : 'calc(100vh - 30px)',
          top: isMobile ? '112px' : '',
        },
      }}
      variant={isMobile ? 'temporary' : 'persistent'}
    >
      <Box
        sx={{
          width: '100%',
          pt: isMobile ? 1 : 0,
          pb: isMobile ? 1 : 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: isMobile ? '48px' : '62px',
          pl: '8px',
          gap: '8px',
        }}
      >
        <Typography
          variant={isMobile ? 'subtitle1' : 'h6'}
          sx={{
            color: 'var(--Primary-Black, #212B36)',
            fontFamily: 'DFPHeiBold-B5',
            fontSize: '24px',
          }}
        >
          {title}
        </Typography>
        <IconButton
          role="button"
          aria-label="close"
          onClick={onClose}
          size={isMobile ? 'small' : 'medium'}
        >
          <CloseIcon sx={{ color: '#212B36' }} />
        </IconButton>
      </Box>
    </Drawer>
  );
}
