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

export default function ChannelSearchCombined() {
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { setSelectedChannel } = useContext(ChannelContentContext);

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

  const handleToggleV2 = () => setIsV2((prev) => !prev);

  const handleSelectAll = () =>
    setChannels((prev) => prev.map((ch) => ({ ...ch, selected: true })));

  const handleCancelAll = () => {
    setChannels((prev) => prev.map((ch) => ({ ...ch, selected: false })));
    handleToggleV2();
  };

  const toggleChannel = (id: string) =>
    setChannels((prev) =>
      prev.map((ch) =>
        ch.organizationChannelId === id ? { ...ch, selected: !ch.selected } : ch
      )
    );

  const filteredChannels = channels.filter(
    (ch) =>
      ch.organizationChannelTitle
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      ch.organizationChannelCreateDate.includes(searchQuery)
  );

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
                <Button
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
              </Box>
            </Box>
            <Box
              sx={{
                width: '100%',
                overflowY: 'auto',
                paddingRight: '8px',
                paddingLeft: '10px',
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
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
                      key={channel.organizationChannelId}
                      onMouseEnter={() =>
                        handleMouseEnter(channel.organizationChannelId)
                      }
                      onMouseLeave={handleMouseLeave}
                      elevation={0}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        p: 2,
                        border: '1px solid var(--Secondary-Dark-Gray, #4A4A4A)',
                        borderRadius: 2,
                        bgcolor: 'rgba(255, 0, 0, 0.05)',
                        position: 'relative',
                        gap: '16px',
                        alignSelf: 'stretch',
                        flexDirection: 'column',
                        cursor: 'pointer',

                        '&:hover': {
                          bgcolor: '#FFF5F5',
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
                            left: '-13px', // Move checkbox half outside the paper
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                            pointerEvents: 'auto', // Ensure the checkbox is clickable
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
                      <Typography
                        sx={{
                          color: '#000',
                          fontFamily: 'Open Sans',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: 700,
                          lineHeight: 'normal',
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
                      {isHoveredOrSelected && (
                        <IconButton
                          size="small"
                          sx={{
                            color: '#CC0000',
                            position: 'absolute',
                            top: '5px',
                            right: '4px',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!channel.selected) {
                              toggleChannel(channel.organizationChannelId);
                            }
                            handleDelete();
                          }}
                        >
                          <DeleteIcon sx={{ width: '18px', height: '18px' }} />
                        </IconButton>
                      )}
                    </Paper>
                  );
                })}
              </Stack>
            </Box>
          </>
        ) : (
          <>
            {/* Action Bar */}
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
                    color: ' #CC0000',
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
              <Stack direction={'row'} spacing={1} sx={{ width: 'auto' }}>
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

                    '&:hover': {
                      bgcolor: 'rgba(204, 0, 0, 0.1)',
                    },
                  }}
                >
                  全選
                </Box>
                <Button
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
                    '&:hover': {
                      bgcolor: 'grey.400',
                    },
                  }}
                >
                  刪除
                </Button>
              </Stack>
            </Box>
            <Box
              sx={{
                width: '100%',
                overflowY: 'auto',
                paddingRight: '8px',
                paddingLeft: '10px',
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
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
              {/* Channel List */}
              <Stack spacing={1} sx={{ width: '100%' }}>
                {filteredChannels.map((channel) => (
                  <Paper
                    key={channel.organizationChannelId}
                    elevation={0}
                    sx={{
                      display: 'flex',
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(255, 0, 0, 0.05)',
                      position: 'relative', // Add this to support absolute positioning of delete icon
                      alignItems: 'flex-start',
                      border: '1px solid var(--Secondary-Dark-Gray, #4A4A4A)',
                      gap: '16px',
                      alignSelf: 'stretch',
                      flexDirection: 'column',
                      cursor: 'pointer',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        left: '-13px', // Move checkbox half outside the paper
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 2,
                        pointerEvents: 'auto', // Ensure the checkbox is clickable
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
                    <Typography
                      sx={{
                        color: '#990000',
                        fontFamily: 'Open Sans',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: 'normal',
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
                    <IconButton
                      size="small"
                      sx={{
                        color: '#CC0000',
                        position: 'absolute',
                        top: '5px',
                        right: '4px',
                      }}
                      onClick={() => {
                        if (!channel.selected) {
                          toggleChannel(channel.organizationChannelId);
                        }
                        handleDelete();
                      }}
                    >
                      <DeleteIcon sx={{ width: '18px', height: '18px' }} />
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
