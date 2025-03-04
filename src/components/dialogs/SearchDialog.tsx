'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import {
  Dialog,
  IconButton,
  Typography,
  List,
  ListItem,
  useMediaQuery,
  useTheme,
  Box,
  InputBase,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Mock data for search suggestions
const POPULAR_EVENTS = [
  { id: 1, title: '(Popular Event)標題-1' },
  { id: 2, title: '(Popular Event)標題-2' },
  { id: 3, title: '(Popular Event)標題-3' },
  { id: 4, title: '(Popular Event)標題-4' },
  { id: 5, title: '(Popular Event)標題-5' },
  { id: 6, title: '(Popular Event)標題-6' },
];

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchDialog({ open, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState(POPULAR_EVENTS);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions(POPULAR_EVENTS);
    } else {
      const filtered = POPULAR_EVENTS.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
    }
  }, [searchTerm]);

  const handleClose = () => {
    setSearchTerm('');
    onClose();
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="search-dialog-title"
      sx={{
        '& .MuiDialog-container': {
          height: isMobile ? 'auto' : '100%',
        },
        '& .MuiDialog-paper': {
          width: '100%',
          maxWidth: '650px',
          height: isMobile ? '100vh ' : '296px',
          borderRadius: isMobile ? '0px' : '8px',
          background: '#FFFFFF',
          boxShadow: ' -40px 40px 80px -8px rgba(0, 0, 0, 0.24)',
          margin: 0,
          overflow: 'hidden',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
        },
        '& .MuiBackdrop-root': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Box
        id="search-dialog-title"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 16px 20px 24px',
          height: '64px',
          borderBottom: '1px solid',
          borderColor: '#E5E7EB',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <InputBase
          placeholder="搜尋活動"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            color: '#212B36',
            fontFamily: 'DFPHeiBold-B5',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '24px',
            '&::placeholder': {
              color: '#212B36',
            },
          }}
        />

        <IconButton
          edge="end"
          onClick={handleClose}
          aria-label="close"
          sx={{
            color: '#212B36',
            display: 'flex',
            justifyItems: 'center',
            alignItems: 'center',
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <List
        sx={{
          padding: '8px',
          width: '100%',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '12px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '12px',
            backgroundColor: '#637381',
            '&:hover': {
              backgroundColor: '#4a5a68',
            },
          },
          '&::-webkit-scrollbar-track': {
            borderRadius: '12px',
            background: 'transparent ',
          },
          '&::-webkit-scrollbar-button': {
            display: 'none !important',
          },
          scrollbarWidth: 'thin',
          scrollbarColor: '#637381 ',
          overscrollBehavior: 'contain',
          msOverflowStyle: 'auto',
        }}
      >
        {suggestions.map((event) => (
          <ListItem
            key={event.id}
            sx={{
              padding: '16px 8px',
              cursor: 'pointer',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
              borderBottom: 'none',
            }}
          >
            <Typography
              sx={{
                overflow: 'hidden',
                color: '#212B36',
                textOverflow: 'ellipsis',
                fontFamily: '"Public Sans"',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '22px',
                width: '100%',
              }}
            >
              {event.title}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
