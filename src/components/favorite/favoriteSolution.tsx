'use client';

import { useState, useEffect, useContext } from 'react';
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
import DeleteConfirmationModal from '../dialogs/DeleteConfirmationModal';
import { useChatChannels } from '@/utils/hooks/useChatChannels';
import {
  OrganizationChannel,
  OrganizationChannelData,
} from '@/interfaces/entities';
import { useRouter } from 'next/navigation';
import ChannelContentContext from '../channel-context-provider/ChannelContentContext';
import { motion, AnimatePresence } from 'framer-motion';
import { StarRounded } from '@mui/icons-material';

// Updated motion variants:
// They start at x:0 (their original position) and when exiting, slide out.
const selectButtonVariants = {
  initial: { x: 500, opacity: 1 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 }, // Slide to right on exit
};

const selectAllVariants = {
  initial: { x: -500, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
};

export default function FavoriteSolution() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { setSelectedChannel } = useContext(ChannelContentContext);

  // isV2 controls which view is shown
  const [isV2, setIsV2] = useState(true);
  const [channels, setChannels] = useState<OrganizationChannelData[]>([]);
  const [hoveredChannelId, setHoveredChannelId] = useState<string | null>();
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);

  const { data: chatsData } = useChatChannels({
    organizationId: '4aba77788ae94eca8d6ff330506af944',
  });

  const handleMouseEnter = (id: string) => {
    setHoveredChannelId(id);
  };

  const handleMouseLeave = () => {
    setHoveredChannelId(null);
  };

  const handleConfirmDelete = () => {
    setChannels((prev) => prev.filter((ch) => !ch.selected));
    setOpen(false);
  };
  const handleDelete = () => setOpen(true);

  const selectedChannels = channels.filter((ch) => ch.selected);

  // Toggle between the two views
  const handleToggleV2 = () => setIsV2((prev) => !prev);

  const handleSelectAll = () =>
    setChannels((prev) => prev.map((ch) => ({ ...ch, selected: true })));

  // When Cancel is clicked, clear selections and toggle back to the first view.
  const handleCancelAll = () => {
    setChannels((prev) => prev.map((ch) => ({ ...ch, selected: false })));
    setIsV2(true);
  };

  const toggleChannel = (id: string) =>
    setChannels((prev) =>
      prev.map((ch) =>
        ch.organizationChannelId === id ? { ...ch, selected: !ch.selected } : ch
      )
    );

  const filteredChannels = channels
    .filter(
      (ch) =>
        ch.organizationChannelTitle
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        ch.organizationChannelCreateDate.includes(searchQuery)
    )
    .slice(0, 5); // Limit to 5 channels

  const moveToChannelDetail = (channel: OrganizationChannelData) => {
    setSelectedChannel(channel);
    const searchParams = new URLSearchParams({
      organizationChannelId: channel.organizationChannelId,
    });

    router.push(`/chat?${searchParams.toString()}`);
  };

  useEffect(() => {
    if (chatsData) {
      const formattedChannels = chatsData.map((chat: OrganizationChannel) => ({
        ...chat,
        id: chat.organizationChannelId,
        date: new Date(chat.organizationChannelCreateDate).toLocaleString(),
        selected: false,
      }));
      setChannels(formattedChannels);
    }
  }, [chatsData]);

  return (
    <Box
      className="checkbox-visible"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#ffffff',
        overflow: 'hidden',
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
          display: 'flex',
          alignItems: 'flex-start',
          position: 'relative',
          gap: '16px',
          alignSelf: 'stretch',
          flexDirection: 'column',
        }}
      >
        {/* Search Input */}
        <TextField
          aria-label="Search Channel"
          fullWidth
          placeholder="搜尋頻道"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    color: 'var(--Primary-Black, #212B36)',
                    fontFamily: 'Open Sans',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal',
                    '& .highlight': {
                      color: 'error.main',
                      px: 0.5,
                    },
                  }}
                >
                  您目前有 <span>{filteredChannels.length ?? 0}</span> 個頻道
                </Typography>
                {/* Animate the "選擇" button.
                    It starts at its original position (x:0) and when exiting, slides right. */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key="select-button"
                    variants={selectButtonVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      aria-label="Select"
                      variant="text"
                      onClick={handleToggleV2}
                      sx={{
                        color: 'primary.main',
                        fontFamily: 'Open Sans',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: 'normal',
                        minWidth: 'auto',
                        borderRadius: '8px',
                      }}
                      className="highlight"
                    >
                      選擇
                    </Button>
                  </motion.div>
                </AnimatePresence>
              </Box>
            </Box>
            {/* Channel List */}
            <Box
              sx={{
                width: '100%',
                overflowY: 'auto',
                paddingRight: '8px',
                paddingLeft: isMobile ? '0px' : '10px',
                '&::-webkit-scrollbar': { width: '4px' },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#c1c1c1',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: '#a8a8a8',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#f1f1f1',
                  borderRadius: '4px',
                },
              }}
            >
              <Stack spacing={1} sx={{ width: '100%' }}>
                {filteredChannels.map((channel) => {
                  const isHoveredOrSelected =
                    hoveredChannelId === channel.organizationChannelId ||
                    channel.selected;
                  return (
                    <Paper
                      className="group"
                      key={channel.organizationChannelId}
                      onMouseEnter={() =>
                        handleMouseEnter(channel.organizationChannelId)
                      }
                      onMouseLeave={handleMouseLeave}
                      elevation={0}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        border: '1px solid var(--Secondary-Dark-Gray, #4A4A4A)',
                        borderRadius: 2,
                        position: 'relative',
                        gap: '16px',
                        alignSelf: 'stretch',
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: 'rgba(255, 0, 0, 0.05)',
                        },
                      }}
                      onClick={() => {
                        moveToChannelDetail(channel);
                      }}
                    >
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
                          }}
                        >
                          <Checkbox
                            checked={channel.selected || false}
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
                      <Box>
                        <Typography
                          sx={{
                            color: '#000',
                            fontFamily: 'Open Sans',
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: 'normal',
                            marginBottom: '10px',
                            '.group:hover &': { color: '#990000' },
                          }}
                        >
                          {channel.organizationChannelTitle}
                        </Typography>
                        <Typography
                          sx={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 1,
                            alignSelf: 'stretch',
                            overflow: 'hidden',
                            color: 'text.secondary',
                            textOverflow: 'ellipsis',
                            fontFamily: 'Open Sans',
                            fontSize: '12px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                          }}
                        >
                          {new Date(
                            channel.organizationChannelCreateDate
                          ).toLocaleString()}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <IconButton size="small">
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
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!channel.selected) {
                                toggleChannel(channel.organizationChannelId);
                              }
                              handleDelete();
                            }}
                          >
                            <DeleteIcon
                              sx={{ width: '25px', height: '25px' }}
                            />
                          </IconButton>
                        )}
                      </Box>
                    </Paper>
                  );
                })}
              </Stack>
            </Box>
          </>
        ) : (
          <>
            {/* Action Bar with "全選", "取消", and "刪除" buttons */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%',
                py: '1px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center',
                  py: 0.5,
                }}
              >
                <Typography
                  sx={{
                    color: '#CC0000',
                    fontFamily: 'Open Sans',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal',
                    '& .highlight': {
                      color: 'error.main',
                      px: 0.5,
                    },
                  }}
                >
                  當前已選擇 <span>{selectedChannels.length}</span> 個頻道
                </Typography>
              </Box>
              <Stack direction="row" spacing={1} sx={{ width: 'auto' }}>
                {/* Animate the "全選" box.
                    It starts at its original position (x:0) and when exiting, slides left. */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key="select-all-box"
                    variants={selectAllVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      onClick={handleSelectAll}
                      sx={{
                        color: '#CC0000',
                        fontFamily: 'Open Sans',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        borderRadius: '8px',
                        padding: '4px 8px',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'rgba(204, 0, 0, 0.1)' },
                      }}
                    >
                      全選
                    </Box>
                  </motion.div>
                </AnimatePresence>
                <Button
                  aria-label="Cancel"
                  variant="outlined"
                  sx={{
                    fontFamily: 'Open Sans',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal',
                    color: 'black',
                    border: '1px solid var(--Primary-Black, #212B36)',
                    borderRadius: '8px',
                    padding: '4px 8px',
                  }}
                  onClick={handleCancelAll}
                >
                  取消
                </Button>
                <Button
                  aria-label="Delete"
                  variant="contained"
                  disabled={selectedChannels.length === 0}
                  onClick={handleDelete}
                  sx={{
                    fontFamily: 'Open Sans',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal',
                    bgcolor: 'red.500',
                    color: '#ffffff',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    '&:hover': { bgcolor: 'grey.400' },
                  }}
                >
                  刪除
                </Button>
              </Stack>
            </Box>
            {/* Channel List */}
            <Box
              sx={{
                width: '100%',
                overflowY: 'auto',
                paddingRight: '8px',
                paddingLeft: isMobile ? '0px' : '10px',
                '&::-webkit-scrollbar': { width: '4px' },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#c1c1c1',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: '#a8a8a8',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#f1f1f1',
                  borderRadius: '4px',
                },
              }}
            >
              <Stack spacing={1} sx={{ width: '100%' }}>
                {filteredChannels.map((channel) => (
                  <Paper
                    key={channel.organizationChannelId}
                    elevation={0}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(255, 0, 0, 0.05)',
                      position: 'relative',
                      border: '1px solid var(--Secondary-Dark-Gray, #4A4A4A)',
                      gap: '16px',
                      alignSelf: 'stretch',
                      cursor: 'pointer',
                    }}
                  >
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
                      }}
                    >
                      <Checkbox
                        checked={channel.selected}
                        onChange={() =>
                          toggleChannel(channel.organizationChannelId)
                        }
                        sx={{
                          color: 'var(--Primary-Black, #212B36)',
                          p: 0,
                          '&.Mui-checked': {
                            color: 'var(--Primary-Black, #212B36)',
                          },
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          color: '#990000',
                          fontFamily: 'Open Sans',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: 700,
                          lineHeight: 'normal',
                          marginBottom: '10px',
                        }}
                      >
                        {channel.organizationChannelTitle}
                      </Typography>
                      <Typography
                        sx={{
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 1,
                          alignSelf: 'stretch',
                          overflow: 'hidden',
                          color: 'var(--Secondary-Dark-Gray, #4A4A4A)',
                          textOverflow: 'ellipsis',
                          fontFamily: 'DFPHeiMedium-B5',
                          fontSize: '12px',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          lineHeight: 'normal',
                        }}
                      >
                        {new Date(
                          channel.organizationChannelCreateDate
                        ).toLocaleString()}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      sx={{
                        color: '#CC0000',
                      }}
                      onClick={() => {
                        if (!channel.selected) {
                          toggleChannel(channel.organizationChannelId);
                        }
                        handleDelete();
                      }}
                    >
                      <DeleteIcon sx={{ width: '25px', height: '25px' }} />
                    </IconButton>
                  </Paper>
                ))}
              </Stack>
            </Box>
          </>
        )}
        <DeleteConfirmationModal
          open={open}
          onClose={() => setOpen(false)}
          onDelete={handleConfirmDelete}
          channelName={selectedChannels}
        />
      </Box>
    </Box>
  );
}
