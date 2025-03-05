'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion, AnimatePresence } from 'framer-motion';

const selectButtonVariants = {
  initial: { x: 500, opacity: 1 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 },
};

const selectAllVariants = {
  initial: { x: -500, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
};

interface FinanceDetailSolutionHistoryData {
  id: string;
  date: string;
  title: string;
  selected: boolean;
}

const dummyData: FinanceDetailSolutionHistoryData[] = [
  {
    id: '1',
    date: '02/05/2025',
    title: 'Allen / Title1',
    selected: false,
  },
  {
    id: '2',
    date: '02/05/2025',
    title: 'Allen / Title2',
    selected: false,
  },
  {
    id: '3',
    date: '02/05/2025',
    title: 'Allen / Title3',
    selected: false,
  },
  {
    id: '4',
    date: '02/05/2025',
    title: 'Allen / Title',
    selected: false,
  },
];

export default function FinanceSearchCombined() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const loadingRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [isV2, setIsV2] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const [channels, setChannels] = useState<FinanceDetailSolutionHistoryData[]>(
    []
  );
  const [hoveredChannelId, setHoveredChannelId] = useState<string | null>();

  const handleMouseEnter = (id: string) => {
    setHoveredChannelId(id);
  };

  const handleMouseLeave = () => {
    setHoveredChannelId(null);
  };

  const selectedChannels = channels.filter((ch) => ch.selected);
  const handleToggleV2 = () => setIsV2((prev) => !prev);
  const handleSelectAll = () =>
    setChannels((prev) => prev.map((ch) => ({ ...ch, selected: true })));
  const handleCancelAll = () => {
    setChannels((prev) => prev.map((ch) => ({ ...ch, selected: false })));
    setIsV2(true);
  };

  const toggleChannel = (id: string) =>
    setChannels((prev) =>
      prev.map((ch) => (ch.id === id ? { ...ch, selected: !ch.selected } : ch))
    );

  const filteredChannels = channels.filter(
    (ch) =>
      ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.date.includes(searchQuery)
  );

  useEffect(() => {
    const formattedChannels = dummyData.map((chat) => ({
      ...chat,
      id: chat.id,
      date: new Date(chat.date).toLocaleString(),
      selected: false,
    }));
    setChannels(formattedChannels);
    setHasMore(false);
  }, []);

  const fetchMoreData = useCallback(async () => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setHasMore(false);
    } catch (error) {
      console.error('Error loading channels:', error);
      setHasMore(false);
    } finally {
      setIsFetching(false);
    }
  }, [isFetching, hasMore]);

  useEffect(() => {
    if (!loadingRef.current) return;
    observer.current = new IntersectionObserver(
      (entries) => {
        if (
          entries[0]?.isIntersecting &&
          hasMore &&
          !isFetching &&
          !searchQuery.trim()
        ) {
          fetchMoreData();
        }
      },
      {
        threshold: 0.3,
        root: scrollContainerRef.current,
      }
    );
    if (loadingRef.current) {
      observer.current.observe(loadingRef.current);
    }
    return () => {
      if (observer.current && loadingRef.current) {
        observer.current.unobserve(loadingRef.current);
      }
    };
  }, [fetchMoreData, hasMore, isFetching, channels.length, searchQuery]);

  return (
    <Box
      className="checkbox-visible"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        bgcolor: '#ffffff',
        overflow: 'hidden',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 800,
          maxHeight: '90vh',
          overflow: 'hidden',
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
            <Box
              ref={scrollContainerRef}
              sx={{
                width: '100%',
                maxheight: 'calc(100vh - 140px)',
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
                    hoveredChannelId === channel.id || channel.selected;
                  return (
                    <Paper
                      className="group"
                      key={channel.id}
                      onMouseEnter={() => handleMouseEnter(channel.id)}
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
                              toggleChannel(channel.id);
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
                          {channel.title}
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
                          {new Date(channel.date).toLocaleString()}
                        </Typography>
                      </Box>
                      {isHoveredOrSelected && (
                        <IconButton
                          size="small"
                          sx={{ color: '#CC0000' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!channel.selected) {
                              toggleChannel(channel.id);
                            }
                          }}
                        >
                          <DeleteIcon sx={{ width: '25px', height: '25px' }} />
                        </IconButton>
                      )}
                    </Paper>
                  );
                })}
                {hasMore && !searchQuery.trim() && (
                  <Box
                    ref={loadingRef}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      p: 2,
                    }}
                  >
                    <CircularProgress size={24} color="primary" />
                  </Box>
                )}
              </Stack>
            </Box>
          </>
        ) : (
          <>
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
            <Box
              ref={scrollContainerRef}
              sx={{
                width: '100%',
                maxheight: 'calc(100vh - 140px)',
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
                    key={channel.id}
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
                        onChange={() => toggleChannel(channel.id)}
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
                        {channel.title}
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
                        {new Date(channel.date).toLocaleString()}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      sx={{
                        color: '#CC0000',
                      }}
                      onClick={() => {
                        if (!channel.selected) {
                          toggleChannel(channel.id);
                        }
                      }}
                    >
                      <DeleteIcon sx={{ width: '25px', height: '25px' }} />
                    </IconButton>
                  </Paper>
                ))}
                {hasMore && !searchQuery.trim() && (
                  <Box
                    ref={loadingRef}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      p: 2,
                    }}
                  >
                    <CircularProgress size={24} color="primary" />
                  </Box>
                )}
              </Stack>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
