'use client';

import { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Stack,
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export interface Channel {
  id: number;
  title: string;
  date: string;
  selected: boolean;
}

export default function ChannelSearchCombined() {
  const [isV2, setIsV2] = useState(true);
  const [channels, setChannels] = useState<Channel[]>([
    { id: 1, title: '標題 1', date: '2023-01-01', selected: false },
    { id: 2, title: '標題 2', date: '2023-01-02', selected: false },
    { id: 3, title: '標題 3', date: '2023-01-03', selected: false },
    { id: 4, title: '標題 4', date: '2023-01-04', selected: false },
    { id: 5, title: '標題 5', date: '2023-01-05', selected: false },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleConfirmDelete = () => {
    setChannels((prev) => prev.filter((ch) => !ch.selected));
    setOpen(false);
  };
  const handleDelete = () => setOpen(true);

  const selectedChannels = channels.filter((ch) => ch.selected);

  const handleToggleV2 = () => setIsV2((prev) => !prev);

  const handleSelectAll = () =>
    setChannels((prev) => prev.map((ch) => ({ ...ch, selected: true })));

  const handleCancelAll = () =>
    setChannels((prev) => prev.map((ch) => ({ ...ch, selected: false })));

  const toggleChannel = (id: number) =>
    setChannels((prev) =>
      prev.map((ch) => (ch.id === id ? { ...ch, selected: !ch.selected } : ch))
    );

  const filteredChannels = channels.filter(
    (ch) =>
      ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.date.includes(searchQuery)
  );

  return (
    <Box
      className="checkbox-visible"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#ffffff',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 800,
          maxHeight: '90vh',
          overflow: 'auto', // Local scrolling behavior for this component
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: isMobile ? '16px' : 3,
          mx: isMobile ? '' : 2,
        }}
      >
        {/* Search Input */}
        <TextField
          fullWidth
          placeholder="搜尋頻道"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            },
          }}
        />
        {isV2 ? (
          <>
            {/* Selected Channels Count */}
            <Typography
              sx={{
                mb: 2,
                '& .highlight': {
                  color: 'error.main',
                  px: 0.5,
                },
              }}
            >
              你目前有{' '}
              <span className="highlight">
                {filteredChannels.length ? filteredChannels.length : 0}
              </span>{' '}
              個頻道
              <Button
                variant="text"
                onClick={handleToggleV2}
                sx={{ color: 'primary.main' }}
                className="highlight"
              >
                選擇
              </Button>
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              可選擇的頻道
            </Typography>
            <Stack spacing={1}>
              {filteredChannels.map((channel) => (
                <Paper
                  key={channel.id}
                  onMouseEnter={() => toggleChannel(channel.id)}
                  onMouseLeave={() => toggleChannel(channel.id)}
                  elevation={0}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    bgcolor: channel.selected
                      ? 'rgba(255, 0, 0, 0.05)'
                      : 'transparent',
                    position: 'relative', // Add this to support absolute positioning of delete icon
                    pl: 4, // Add left padding to accommodate the checkbox
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {channel.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {channel.date}
                    </Typography>
                  </Box>
                  {channel.selected && (
                    <IconButton
                      size="small"
                      sx={{
                        color: 'error.main',
                        position: 'absolute',
                        top: '5px',
                        right: '4px',
                      }}
                      onClick={() => {
                        // toggleChannel(channel.id);
                        handleDelete();
                      }}
                    >
                      <DeleteIcon sx={{ width: '18px', height: '18px' }} />
                    </IconButton>
                  )}
                </Paper>
              ))}
            </Stack>
          </>
        ) : (
          <>
            {/* Action Bar */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                flexDirection: isMobile ? 'column' : 'row',
              }}
            >
              <Typography sx={{ mb: isMobile ? 1 : 0 }}>
                當前已選擇 {selectedChannels.length} 個頻道
              </Typography>
              <Stack
                direction={isMobile ? 'column' : 'row'}
                spacing={1}
                sx={{ width: isMobile ? '100%' : 'auto' }}
              >
                <Button
                  variant="text"
                  onClick={handleSelectAll}
                  sx={{ color: 'error.main' }}
                >
                  全選
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: 'black',
                    border: '1px solid',
                    borderRadius: '8px',
                    padding: '4px 8px',
                  }}
                  onClick={handleCancelAll}
                >
                  取消
                </Button>
                <Button
                  variant="contained"
                  disabled={selectedChannels.length === 0}
                  onClick={handleDelete}
                  sx={{
                    bgcolor: 'red.500',
                    color: '#ffffff',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    '&:hover': {
                      bgcolor: 'grey.400',
                    },
                  }}
                >
                  刪除
                </Button>
              </Stack>
            </Box>

            {/* Channel List */}
            <Stack spacing={1}>
              {filteredChannels.map((channel) => (
                <Paper
                  key={channel.id}
                  elevation={0}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    bgcolor: channel.selected
                      ? 'rgba(255, 0, 0, 0.05)'
                      : 'transparent',
                    position: 'relative', // Add this to support absolute positioning of delete icon
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      left: '-20px', // Move checkbox half outside the paper
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 2,
                      pointerEvents: 'auto', // Ensure the checkbox is clickable
                    }}
                  >
                    <Checkbox
                      checked={channel.selected}
                      onChange={() => toggleChannel(channel.id)}
                      sx={{
                        color: 'var(--Primary-Black, #212B36)',
                        '&.Mui-checked': {
                          color: 'var(--Primary-Black, #212B36)',
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ flexGrow: 1, pl: 4 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {channel.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {channel.date}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    sx={{
                      color: 'error.main',
                      position: 'absolute',
                      top: '5px',
                      right: '4px',
                    }}
                    onClick={() => {
                      toggleChannel(channel.id);
                      handleDelete();
                    }}
                  >
                    <DeleteIcon sx={{ width: '18px', height: '18px' }} />
                  </IconButton>
                </Paper>
              ))}
            </Stack>
          </>
        )}
        <DeleteConfirmationModal
          open={open}
          onClose={() => setOpen(false)}
          onDelete={handleConfirmDelete}
          ChannelName={selectedChannels}
        />
      </Box>
    </Box>
  );
}
