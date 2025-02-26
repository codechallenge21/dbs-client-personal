'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  Tab,
  Tabs,
  Table,
  Button,
  useTheme,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  useMediaQuery,
  TableContainer,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import {
  MicRounded,
  StarRounded,
  SearchRounded,
  UploadRounded,
  MenuRounded,
  CheckCircleRounded,
  RotateRightRounded,
  PendingActionsRounded,
  StarBorderRounded,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { OrganizationChannel } from '@/interfaces/entities';
import apis from '@/utils/hooks/apis/apis';
import EditDialog from '@/components/dialogs/EditDialog';
import UploadDialog from '@/components/uploadDialog/page';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import DeleteDialog from '@/components/dialogs/DeleteDialog';
import { useAudioChannels } from '@/utils/hooks/useAudioChannels';
import EditableItem from '@/components/editable-item/EditableItem';
import ToolbarDrawer from '@/components/toolbar-drawer-new/ToolbarDrawer';
import UploadScreen from './UploadScreen';
import LoginDialog from '@/components/dialogs/LoginDialog';
import SignupDialog from '@/components/dialogs/SignupDialog';
import { useLoginContext } from '@/context/LoginContext';

const ChannelsList = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isLoginOpen, setIsLoginOpen, isSignupOpen, setIsSignupOpen } =
    useLoginContext();

  const [tabValue, setTabValue] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [toolsAnchor, setToolsAnchor] = useState<null | HTMLElement>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(
    isMobile ? false : true
  );
  const [openUpload, setOpenUpload] = React.useState(false);
  const [favoriteChannels, setFavoriteChannels] = useState<{
    [key: number]: boolean;
  }>({});
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [channelList, setChannelList] = useState<OrganizationChannel[]>([]);
  const itemsPerPage = 10;

  const {
    data: channelsData = [],
    mutate: mutateAudioChannels,
    isValidating: isLoadingChannels,
  } = useAudioChannels(
    {
      organizationId: 'yMJHyi6R1CB9whpdNvtA',
    },
    {
      startIndex: page,
      size: itemsPerPage,
    }
  );

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef(null);

  const { excute: deleteChannel } = useAxiosApi(apis.deleteChannel);
  const { excute: updateChannelDetail } = useAxiosApi(apis.updateChannelDetail);

  const handleLoginDialogClose = () => {
    setIsLoginOpen(false);
  };

  const handleCloseToolsMenu = useCallback(() => {
    setToolsAnchor(null);
    setActiveIndex(null);
  }, []);

  const handleDeleteChannelOpenConfirmDialog = useCallback(
    (event: React.MouseEvent) => {
      setToolsAnchor(null);
      event.stopPropagation();
      setIsDeleteDialogOpen(true);
    },
    []
  );

  const handleCloseDeleteDialog = useCallback((event: React.MouseEvent) => {
    setToolsAnchor(null);
    event.stopPropagation();
    setIsDeleteDialogOpen(false);
  }, []);

  const handleDeleteChannelConfirm = useCallback(
    async (event: React.MouseEvent) => {
      event.stopPropagation();
      deleteChannel({
        organizationId: 'yMJHyi6R1CB9whpdNvtA',
        organizationChannelId:
          channelsData?.[activeIndex!]?.organizationChannelId || '',
      })
        .then(() => {
          setIsDeleteDialogOpen(false);
          handleCloseToolsMenu();
          if (mutateAudioChannels) {
            mutateAudioChannels();
          }
        })
        .catch(() => {});
    },
    [
      activeIndex,
      channelsData,
      deleteChannel,
      mutateAudioChannels,
      handleCloseToolsMenu,
    ]
  );

  const handleEditChannelConfirm = useCallback(
    async (newTitle: string) => {
      await updateChannelDetail({
        organizationId: 'yMJHyi6R1CB9whpdNvtA',
        organizationChannelId:
          channelsData?.[activeIndex!]?.organizationChannelId || '',
        organizationChannelTitle: newTitle,
      });
      setIsEditDialogOpen(false);
      if (mutateAudioChannels) mutateAudioChannels();
    },
    [updateChannelDetail, channelsData, activeIndex, mutateAudioChannels]
  );

  const handleOpenEditChannelDialog = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setIsEditDialogOpen(true);
    setToolsAnchor(null);
  }, []);

  const handleCloseEditDialog = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setIsEditDialogOpen(false);
    setToolsAnchor(null);
  }, []);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    event.stopPropagation();
    setToolsAnchor(event.currentTarget);
    setActiveIndex(index);
  };

  const handleCloseUploadDialog = () => {
    setOpenUpload(false);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleRowClick = (channel: OrganizationChannel) => {
    if (handleShowDetail) handleShowDetail(channel);
  };

  const handleShowDetail = (channel: OrganizationChannel) => {
    router.push(
      `/channel-summary?organizationChannelId=${channel?.organizationChannelId}`
    );
  };

  const handleToggle = (index: number) => {
    setFavoriteChannels((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    setIsOpenDrawer(!isMobile);
  }, [isMobile]);

  // Initialize channelList with channelsData
  useEffect(() => {
    if (channelsData && channelsData.length > 0 && page === 0) {
      setChannelList(channelsData);
    }
  }, [channelsData, page]);

  // Fetch more data when scrolled to the bottom
  const fetchMoreData = useCallback(async () => {
    if (isFetching || !hasMore) return;

    setIsFetching(true);

    try {
      const nextPage = page + itemsPerPage;
      setPage(nextPage);

      // Use the updated page value in the API call
      const response = await mutateAudioChannels();

      const newChannels = response?.data || [];

      if (newChannels.length > 0) {
        setChannelList((prevChannels) => [...prevChannels, ...newChannels]);
        setHasMore(newChannels.length >= itemsPerPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading channels:', error);
      setHasMore(false);
    } finally {
      setIsFetching(false);
    }
  }, [isFetching, hasMore, page, mutateAudioChannels]);

  // Setup Intersection Observer for infinite scrolling
  useEffect(() => {
    if (!loadingRef.current) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !isFetching) {
          fetchMoreData();
        }
      },
      { threshold: 0.2, root: scrollContainerRef.current }
    );

    if (loadingRef.current) {
      observer.current.observe(loadingRef.current);
    }

    return () => {
      if (observer.current && loadingRef.current) {
        observer.current.unobserve(loadingRef.current);
      }
    };
  }, [fetchMoreData, hasMore, isFetching, channelList.length]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {!isMobile && (
        <Box
          sx={{
            minHeight: '100vh',
            background: 'var(--Primary-, #EBE3DD)',
          }}
        >
          <ToolbarDrawer
            open={isOpenDrawer}
            setIsOpenDrawer={setIsOpenDrawer}
            setIsLoginOpen={setIsLoginOpen}
          >
            <>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                sx={{
                  gap: '40px',
                  height: '48px',
                  display: 'flex',
                  padding: '0px 20px',
                  alignItems: 'center',
                  alignSelf: 'stretch',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                  borderBottom:
                    '2px solid var(--transparent-grey-8, rgba(145, 158, 171, 0.08))',
                  background: 'var(--Primary-White, #FFF)',
                  '& .MuiTabs-flexContainer': {
                    gap: '40px',
                  },
                }}
                TabIndicatorProps={{
                  style: {
                    height: '3px',
                    backgroundColor: '#212B36',
                  },
                }}
              >
                <Tab
                  disableRipple
                  label="智能語音轉文字"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '13px 0px 12px 0px',
                    fontSize: '14px',
                    fontWeight: 700,
                    fontStyle: 'normal',
                    lineHeight: 'normal',
                    fontFamily: 'Open Sans',
                    color: 'var(--Text-Secondary, #637381)',
                    '&.Mui-selected': {
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '22px',
                      fontStyle: 'normal',
                      fontFamily: 'DFPHeiBold-B5',
                      color: 'var(--Text-Secondary, #212B36)',
                    },
                  }}
                />
                <Tab
                  disableRipple
                  label="家系圖"
                  disabled
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '13px 0px 12px 0px',
                    fontSize: '14px',
                    fontWeight: 700,
                    fontStyle: 'normal',
                    lineHeight: 'normal',
                    fontFamily: 'Open Sans',
                    color: 'var(--Text-Secondary, #637381)',
                    '&.Mui-selected': {
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '22px',
                      fontStyle: 'normal',
                      fontFamily: 'DFPHeiBold-B5',
                      color: 'var(--Text-Secondary, #212B36)',
                    },
                  }}
                />
                <Tab
                  disableRipple
                  disabled
                  label="問答語音錄音"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '13px 0px 12px 0px',
                    fontSize: '14px',
                    fontWeight: 700,
                    fontStyle: 'normal',
                    lineHeight: 'normal',
                    fontFamily: 'Open Sans',
                    color: 'var(--Text-Secondary, #637381)',
                    '&.Mui-selected': {
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '22px',
                      fontStyle: 'normal',
                      fontFamily: 'DFPHeiBold-B5',
                      color: 'var(--Text-Secondary, #212B36)',
                    },
                  }}
                />
                <Tab
                  disableRipple
                  label="個別與實時錄音"
                  disabled
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '13px 0px 12px 0px',
                    fontSize: '14px',
                    fontWeight: 700,
                    fontStyle: 'normal',
                    lineHeight: 'normal',
                    fontFamily: 'Open Sans',
                    color: 'var(--Text-Secondary, #637381)',
                    '&.Mui-selected': {
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '22px',
                      fontStyle: 'normal',
                      fontFamily: 'DFPHeiBold-B5',
                      color: 'var(--Text-Secondary, #212B36)',
                    },
                  }}
                />
              </Tabs>
              <Box
                sx={{
                  gap: '40px',
                  flex: '1 0 0',
                  display: 'flex',
                  minHeight: 'calc(100dvh - 81px)',
                  maxHeight: 'calc(100dvh - 81px)',
                  padding: '16px 32px',
                  alignItems: 'center',
                  alignSelf: 'stretch',
                  flexDirection: 'column',
                  backgroundColor: 'white',
                  borderBottomLeftRadius: '8px',
                  borderBottomRightRadius: '8px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between', // Keep title on left & icons on right for big screens
                    alignItems: 'center',
                    alignSelf: 'stretch',
                    flexWrap: 'wrap', // Allows wrapping when screen is small
                    gap: '16px',
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: '32px',
                      fontStyle: 'normal',
                      lineHeight: 'normal',
                      fontFamily: 'DFPHeiBold-B5',
                      color: 'var(--Primary-Black, #212B36)',
                      textAlign: 'left', // Always left-aligned
                      flex: '1 1 auto', // Makes sure title takes available space
                    }}
                    gutterBottom
                  >
                    智能語音轉文字
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      width: { xs: '100%', md: 'auto' }, // Full width on small screens, auto on big screens
                      justifyContent: { xs: 'flex-start', md: 'flex-end' }, // Left-align when wrapped, right-align on big screens
                      alignItems: 'center',
                      gap: '16px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <IconButton
                      role="button"
                      aria-label="search"
                      sx={{
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '50px',
                        justifyContent: 'center',
                      }}
                    >
                      <SearchRounded />
                    </IconButton>
                    <IconButton
                      role="button"
                      aria-label="Start Recording"
                      sx={{
                        gap: '8px',
                        display: 'flex',
                        color: '#5C443A',
                        padding: '6px 12px',
                        background: 'white',
                        borderRadius: '8px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--Secondary-, #5C443A)',
                      }}
                    >
                      <MicRounded sx={{ color: '#5C443A' }} />
                      <Typography>開始錄音</Typography>
                    </IconButton>
                    <IconButton
                      role="button"
                      aria-label="Upload File"
                      sx={{
                        gap: '8px',
                        display: 'flex',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'var(--Secondary-, #5C443A)',
                        '&:hover': {
                          background: 'rgba(92, 68, 58, 0.8)',
                        },
                        '&:active': {
                          background: 'rgba(92, 68, 58, 0.6)',
                        },
                      }}
                      onClick={() => setOpenUpload(true)}
                    >
                      <UploadRounded sx={{ color: '#fff' }} />
                      <Typography sx={{ color: '#fff' }}>上傳檔案</Typography>
                    </IconButton>
                  </Box>
                </Box>
                {isLoadingChannels &&
                channelsData?.length === 0 &&
                page === 0 ? (
                  <Box
                    sx={{
                      top: '50%',
                      left: '50%',
                      display: 'flex',
                      position: 'absolute',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <CircularProgress color="primary" />
                  </Box>
                ) : channelList?.length > 0 ? (
                  <TableContainer
                    ref={scrollContainerRef}
                    sx={{
                      maxHeight: 'calc(100vh - 180px)',
                      overflow: 'auto',
                      '&::-webkit-scrollbar': {
                        width: '8px',
                      },
                      '&::-webkit-scrollbar-track': {
                        borderRadius: '10px',
                        background: '#f1f1f1',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        borderRadius: '10px',
                        background: '#888',
                      },
                      '&::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                      },
                    }}
                  >
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              padding: '0px',
                              fontWeight: 400,
                              fontSize: '16px',
                              overflow: 'hidden',
                              fontStyle: 'normal',
                              lineHeight: 'normal',
                              textOverflow: 'ellipsis',
                              fontFamily: 'DFPHeiBold-B5',
                              color: 'var(--Text-Primary, #212B36)',
                              borderBottom:
                                '1px dashed var(--Components-Divider, rgba(145, 158, 171, 0.20))',
                              background: 'var(--Background-Paper, #FFF)',
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 400,
                                fontSize: '16px',
                                overflow: 'hidden',
                                padding: '16px 0px',
                                fontStyle: 'normal',
                                lineHeight: 'normal',
                                textOverflow: 'ellipsis',
                                fontFamily: 'DFPHeiBold-B5',
                                color: 'var(--Text-Primary, #212B36)',
                              }}
                            >
                              標題
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: '0px',
                              fontWeight: 400,
                              fontSize: '16px',
                              overflow: 'hidden',
                              fontStyle: 'normal',
                              lineHeight: 'normal',
                              textOverflow: 'ellipsis',
                              fontFamily: 'DFPHeiBold-B5',
                              color: 'var(--Text-Primary, #212B36)',
                              borderBottom:
                                '1px dashed var(--Components-Divider, rgba(145, 158, 171, 0.20))',
                              background: 'var(--Background-Paper, #FFF)',
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 400,
                                fontSize: '16px',
                                overflow: 'hidden',
                                padding: '16px 0px',
                                fontStyle: 'normal',
                                lineHeight: 'normal',
                                textOverflow: 'ellipsis',
                                fontFamily: 'DFPHeiBold-B5',
                                color: 'var(--Text-Primary, #212B36)',
                              }}
                            >
                              狀態
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: '0px',
                              fontWeight: 400,
                              fontSize: '16px',
                              overflow: 'hidden',
                              fontStyle: 'normal',
                              lineHeight: 'normal',
                              textOverflow: 'ellipsis',
                              fontFamily: 'DFPHeiBold-B5',
                              color: 'var(--Text-Primary, #212B36)',
                              borderBottom:
                                '1px dashed var(--Components-Divider, rgba(145, 158, 171, 0.20))',
                              background: 'var(--Background-Paper, #FFF)',
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 400,
                                fontSize: '16px',
                                overflow: 'hidden',
                                padding: '16px 0px',
                                fontStyle: 'normal',
                                lineHeight: 'normal',
                                textOverflow: 'ellipsis',
                                fontFamily: 'DFPHeiBold-B5',
                                color: 'var(--Text-Primary, #212B36)',
                              }}
                            >
                              建立時間
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: '0px',
                              borderBottom:
                                '1px dashed var(--Components-Divider, rgba(145, 158, 171, 0.20))',
                              background: 'var(--Background-Paper, #FFF)',
                            }}
                          ></TableCell>
                          <TableCell
                            sx={{
                              padding: '0px',
                              borderBottom:
                                '1px dashed var(--Components-Divider, rgba(145, 158, 171, 0.20))',
                              background: 'var(--Background-Paper, #FFF)',
                            }}
                          ></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {channelList?.map((channel, index) => (
                          <TableRow
                            key={index}
                            onClick={() => handleRowClick(channel)}
                            sx={{
                              cursor: 'pointer',
                              height: '56px !important',
                              borderBottom:
                                '1px dashed var(--Components-Divider, rgba(145, 158, 171, 0.20))',
                              background: 'var(--Background-Paper, #FFF)',
                            }}
                          >
                            <TableCell
                              sx={{
                                width: '50%',
                                padding: '0px',
                                border: 'none',
                                height: '51px !important',
                              }}
                            >
                              <Typography
                                sx={{
                                  fontFamily: 'DFPHeiBold-B5',
                                  fontWeight: 400,
                                  fontSize: '16px',
                                  lineHeight: '16px',
                                  letterSpacing: '0%',
                                  textAlign: 'left',
                                  WebkitLineClamp: 1,
                                  overflow: 'hidden',
                                  padding: '16px 0px',
                                  fontStyle: 'normal',
                                  display: '-webkit-box',
                                  textOverflow: 'ellipsis',
                                  WebkitBoxOrient: 'vertical',
                                  color: 'var(--Text-Primary, #212B36)',
                                }}
                              >
                                {channel?.organizationChannelTitle}
                              </Typography>
                            </TableCell>
                            <TableCell
                              sx={{
                                width: '18%',
                                padding: '0px',
                                border: 'none',
                                height: '51px !important',
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                {channel.organizationChannelTranscriptList[0]
                                  ?.organizationChannelTranscriptStatus ===
                                'COMPLETE' ? (
                                  <CheckCircleRounded
                                    sx={{ color: ' #118D57' }}
                                  />
                                ) : channel.organizationChannelTranscriptList[0]
                                    ?.organizationChannelTranscriptStatus ===
                                  'PROCESSING' ? (
                                  <RotateRightRounded
                                    sx={{ color: 'rgba(0, 102, 204, 1)' }}
                                  />
                                ) : channel.organizationChannelTranscriptList[0]
                                    ?.organizationChannelTranscriptStatus ===
                                  'PENDING' ? (
                                  <PendingActionsRounded
                                    sx={{ color: 'rgba(33, 43, 54, 1)' }}
                                  />
                                ) : (
                                  <PendingActionsRounded
                                    sx={{ color: 'rgba(33, 43, 54, 1)' }}
                                  />
                                )}
                                <span
                                  style={{
                                    fontFamily: 'DFPHeiBold-B5',
                                    fontWeight: 400,
                                    fontSize: '16px',
                                    lineHeight: '16px',
                                    letterSpacing: '0%',
                                    overflow: 'hidden',
                                    fontStyle: 'normal',
                                    textOverflow: 'ellipsis',
                                    marginLeft: '12px',
                                    color: 'var(--Primary-Black, #212B36)',
                                  }}
                                >
                                  {channel.organizationChannelTranscriptList[0]
                                    ?.organizationChannelTranscriptStatus ===
                                  'COMPLETE'
                                    ? '完成'
                                    : channel
                                        .organizationChannelTranscriptList[0]
                                        ?.organizationChannelTranscriptStatus ===
                                      'PROCESSING'
                                    ? ' 上傳中...'
                                    : channel
                                        .organizationChannelTranscriptList[0]
                                        ?.organizationChannelTranscriptStatus ===
                                      'PENDING'
                                    ? '正在摘要...'
                                    : ''}
                                </span>
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{
                                width: '18%',
                                padding: '0px',
                                border: 'none',
                                height: '51px !important',
                              }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: 400,
                                  fontSize: '16px',
                                  fontStyle: 'normal',
                                  padding: '16px 0px',
                                  lineHeight: 'normal',
                                  fontFamily: 'DFPHeiBold-B5',
                                  color: 'var(--Text-Primary, #212B36)',
                                }}
                              >
                                {new Date(
                                  channel.organizationChannelCreateDate
                                ).toLocaleString()}
                              </Typography>
                            </TableCell>
                            <TableCell
                              sx={{
                                width: '7%',
                                border: 'none',
                                padding: '0px 0px 0px 40px',
                                textAlign: 'center',
                                height: '51px !important',
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggle(index);
                              }}
                            >
                              <IconButton
                                role="button"
                                aria-label="favorite"
                                sx={{ padding: '0px' }}
                              >
                                {favoriteChannels[index] ? (
                                  <StarRounded sx={{ color: 'black' }} />
                                ) : (
                                  <StarBorderRounded sx={{ color: 'black' }} />
                                )}
                              </IconButton>
                            </TableCell>
                            <TableCell
                              sx={{
                                width: '7%',
                                border: 'none',
                                padding: '0px 18px 0px 0px',
                                textAlign: 'center',
                                height: '51px !important',
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <EditableItem
                                key={channel.organizationChannelId}
                                index={index}
                                toolsAnchor={toolsAnchor}
                                activeIndex={activeIndex}
                                handleMenuOpen={handleMenuOpen}
                                setToolsAnchor={setToolsAnchor}
                                handleCloseToolsMenu={handleCloseToolsMenu}
                                handleOpenEditChannelDialog={
                                  handleOpenEditChannelDialog
                                }
                                handleDeleteChannelOpenConfirmDialog={
                                  handleDeleteChannelOpenConfirmDialog
                                }
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'right',
                                }}
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                        {hasMore && (
                          <TableRow ref={loadingRef}>
                            <TableCell
                              colSpan={5}
                              align="center"
                              sx={{ border: 'none', p: 2 }}
                            >
                              <CircularProgress size={24} color="primary" />
                            </TableCell>
                          </TableRow>
                        )}

                        {/* End message when no more data */}
                        {!hasMore && channelList.length > 0 && (
                          <TableRow>
                            <TableCell
                              colSpan={5}
                              align="center"
                              sx={{ border: 'none' }}
                            >
                              <Typography
                                variant="body2"
                                sx={{ p: 2, color: 'gray' }}
                              >
                                No more data available.
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  channelsData?.length === 0 && <UploadScreen />
                )}
              </Box>
            </>
          </ToolbarDrawer>
        </Box>
      )}
      {isMobile && (
        <>
          <ToolbarDrawer
            open={isOpenDrawer}
            setIsOpenDrawer={setIsOpenDrawer}
            setIsLoginOpen={setIsLoginOpen}
          >
            <Box
              sx={{
                padding: '8px 16px',
                overflowY: 'auto',
                background: 'var(--Primary-White, #FFF)',
              }}
            >
              <Box
                sx={{
                  flexShrink: 0,
                  width: '100%',
                  display: 'flex',
                  padding: '0px',
                  alignItems: 'center',
                  borderRadius: '8px 0px 0px 8px',
                  background: 'var(--Primary-White, #FFF)',
                }}
              >
                <IconButton
                  role="button"
                  aria-label="menu"
                  onClick={() => setIsOpenDrawer(true)}
                >
                  <MenuRounded sx={{ color: 'black' }} />
                </IconButton>
                <Typography
                  sx={{
                    flex: '1 0 0',
                    height: '40px',
                    display: 'flex',
                    minHeight: '32px',
                    alignItems: 'center',
                    padding: '8px',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '16px',
                    letterSpacing: '0%',
                  }}
                >
                  工具箱
                  <ArrowDropDownIcon
                    sx={{ marginLeft: '5px', marginBottom: '3px' }}
                  />
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                padding: '0 20px',
                background: 'var(--Primary-White, #FFF)',
              }}
            >
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                sx={{
                  '& .MuiTabs-flexContainer': {
                    gap: '20px',
                    overflowX: 'hidden',
                  },
                }}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: '#212B36',
                  },
                }}
              >
                <Tab
                  label="智能語音轉文字"
                  sx={{
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '22px',
                    fontStyle: 'normal',
                    fontFamily: 'DFPHeiBold-B5',
                    color: 'var(--Text-Secondary, #637381))',
                    '&.Mui-selected': {
                      color: 'var(--Primary-Black, #212B36)',
                    },
                    padding: '12px 0px',
                  }}
                />
                <Tab
                  label="家系圖"
                  disabled
                  sx={{
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '22px',
                    fontStyle: 'normal',
                    fontFamily: 'DFPHeiBold-B5',
                    color: 'var(--Text-Secondary, #637381)',
                    '&.Mui-selected': {
                      color: 'var(--Primary-Black, #212B36)',
                    },
                    padding: '12px 0px',
                    minWidth: 'auto',
                  }}
                />
                <Tab
                  label="問答語音錄音"
                  disabled
                  sx={{
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '22px',
                    fontStyle: 'normal',
                    fontFamily: 'DFPHeiBold-B5',
                    color: 'var(--Text-Secondary, #637381)',
                    '&.Mui-selected': {
                      color: 'var(--Primary-Black, #212B36)',
                    },
                    padding: '12px 0px',
                    minWidth: 'auto',
                  }}
                />
                <Tab
                  label="個別與實時錄音"
                  disabled
                  sx={{
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '22px',
                    fontStyle: 'normal',
                    fontFamily: 'DFPHeiBold-B5',
                    color: 'var(--Text-Secondary, #637381)',
                    '&.Mui-selected': {
                      color: 'var(--Primary-Black, #212B36)',
                    },
                    padding: '12px 0px',
                    minWidth: 'auto',
                  }}
                />
              </Tabs>
            </Box>
            <Box
              sx={{
                display: 'flex',
                padding: '16px',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: '16px',
                flex: '1 0 0',
                alignSelf: 'stretch',
                background: 'var(--Primary-White, #FFF)',
                height: 'calc(100dvh - 105px)',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: '32px',
                  fontStyle: 'normal',
                  lineHeight: 'normal',
                  fontFamily: 'DFPHeiBold-B5',
                  color: '#212B36',
                }}
              >
                歡迎使用 語音轉文字
              </Typography>
              <Box
                sx={{
                  gap: '16px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <IconButton role="button" aria-label="search">
                  <SearchRounded sx={{ color: '#212B36' }} />
                </IconButton>
                <Button
                  role="button"
                  aria-label="Start Recording"
                  disabled
                  sx={{
                    gap: '8px',
                    display: 'flex',
                    boxShadow: 'none',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--Secondary-, #5C443A)',
                    '& .MuiButton-startIcon': {
                      margin: 0,
                    },
                  }}
                  startIcon={<MicRounded sx={{ color: '#5C443A' }} />}
                >
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      textAlign: 'center',
                      fontStyle: 'normal',
                      fontFamily: 'DFPHeiBold-B5',
                      color: 'var(--Secondary-, #5C443A)',
                    }}
                  >
                    開始錄音
                  </Typography>
                </Button>
                <Button
                  role="button"
                  aria-label="Upload File"
                  sx={{
                    gap: '8px',
                    color: '#FFF',
                    display: 'flex',
                    boxShadow: 'none',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--Secondary-, #5C443A)',
                    '& .MuiButton-startIcon': {
                      margin: 0,
                    },
                  }}
                  startIcon={<UploadRounded sx={{ color: '#FFF' }} />}
                  onClick={() => setOpenUpload(true)}
                >
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      textAlign: 'center',
                      fontStyle: 'normal',
                      fontFamily: 'DFPHeiBold-B5',
                      color: '#FFF',
                    }}
                  >
                    上傳檔案
                  </Typography>
                </Button>
              </Box>
              {isLoadingChannels && channelsData?.length === 0 && page === 0 ? (
                <Box
                  sx={{
                    top: '50%',
                    left: '50%',
                    display: 'flex',
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <CircularProgress color="primary" />
                </Box>
              ) : channelList?.length > 0 ? (
                <Box
                  ref={scrollContainerRef}
                  sx={{
                    width: '100%',
                    maxHeight: 'calc(100vh - 230px)',
                    overflow: 'auto',
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      borderRadius: '10px',
                      background: '#f1f1f1',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      borderRadius: '10px',
                      background: '#888',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      background: '#555',
                    },
                  }}
                >
                  <Box
                    // ref={scrollContainerRef}
                    sx={{
                      gap: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {channelList?.map((channel, index) => (
                      <Card
                        key={index}
                        sx={{
                          padding: '16px',
                          display: 'flex',
                          alignSelf: 'stretch',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          borderRadius: '16px',
                          background: 'var(--Primary-White, #FFF)',
                          boxShadow:
                            '0px 12px 24px -4px rgba(17, 68, 85, 0.12), 0px 0px 2px 0px rgba(17, 68, 85, 0.12)',
                        }}
                        onClick={() => handleRowClick(channel)}
                      >
                        <CardContent
                          sx={{
                            padding: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            paddingBottom: '0 !important',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box
                            sx={{
                              mb: '8px',
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 400,
                                fontSize: '24px',
                                fontStyle: 'normal',
                                lineHeight: '36px',
                                whiteSpace: 'normal',
                                wordBreak: 'break-word',
                                fontFamily: 'DFPHeiBold-B5',
                                color: 'var(--Primary-Black, #212B36)',
                              }}
                            >
                              {channel?.organizationChannelTitle}
                            </Typography>
                            <EditableItem
                              key={channel.organizationChannelId}
                              index={index}
                              toolsAnchor={toolsAnchor}
                              activeIndex={activeIndex}
                              handleMenuOpen={handleMenuOpen}
                              setToolsAnchor={setToolsAnchor}
                              handleCloseToolsMenu={handleCloseToolsMenu}
                              handleOpenEditChannelDialog={
                                handleOpenEditChannelDialog
                              }
                              handleDeleteChannelOpenConfirmDialog={
                                handleDeleteChannelOpenConfirmDialog
                              }
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <IconButton
                                role="button"
                                aria-label="favorite"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggle(index);
                                }}
                                sx={{ padding: '0px', marginRight: '8px' }}
                              >
                                {favoriteChannels[index] ? (
                                  <StarRounded sx={{ color: 'black' }} />
                                ) : (
                                  <StarBorderRounded sx={{ color: 'black' }} />
                                )}
                              </IconButton>
                              <Typography
                                sx={{
                                  fontWeight: 400,
                                  fontSize: '16px',
                                  overflow: 'hidden',
                                  lineHeight: '24px',
                                  fontStyle: 'normal',
                                  textAlign: 'center',
                                  textOverflow: 'ellipsis',
                                  fontFamily: 'DFPHeiMedium-B5',
                                  color: 'var(--Primary-Black, #212B36)',
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
                              }}
                            >
                              {channel.organizationChannelTranscriptList[0]
                                ?.organizationChannelTranscriptStatus ===
                              'COMPLETE' ? (
                                <CheckCircleRounded
                                  sx={{ color: ' rgba(52, 199, 89, 1)' }}
                                />
                              ) : channel.organizationChannelTranscriptList[0]
                                  ?.organizationChannelTranscriptStatus ===
                                'PROCESSING' ? (
                                <RotateRightRounded
                                  sx={{ color: 'rgba(0, 102, 204, 1)' }}
                                />
                              ) : channel.organizationChannelTranscriptList[0]
                                  ?.organizationChannelTranscriptStatus ===
                                'PENDING' ? (
                                <PendingActionsRounded
                                  sx={{ color: 'rgba(33, 43, 54, 1)' }}
                                />
                              ) : (
                                <PendingActionsRounded
                                  sx={{ color: 'rgba(33, 43, 54, 1)' }}
                                />
                              )}
                              <span
                                style={{
                                  fontFamily: 'DFPHeiMedium-B5',
                                  fontWeight: 400,
                                  fontSize: '16px',
                                  lineHeight: '24px',
                                  letterSpacing: '0%',
                                  overflow: 'hidden',
                                  fontStyle: 'normal',
                                  textOverflow: 'ellipsis',
                                  marginLeft: '12px',
                                  color: 'var(--Primary-Black, #212B36)',
                                }}
                              >
                                {channel.organizationChannelTranscriptList[0]
                                  ?.organizationChannelTranscriptStatus ===
                                'COMPLETE'
                                  ? '完成'
                                  : channel.organizationChannelTranscriptList[0]
                                      ?.organizationChannelTranscriptStatus ===
                                    'PROCESSING'
                                  ? ' 上傳中...'
                                  : channel.organizationChannelTranscriptList[0]
                                      ?.organizationChannelTranscriptStatus ===
                                    'PENDING'
                                  ? '正在摘要...'
                                  : ''}
                              </span>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                    {hasMore && (
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

                    {/* End message */}
                    {!hasMore && channelList.length > 0 && (
                      <Typography
                        variant="body2"
                        sx={{
                          p: 2,
                          color: 'gray',
                          textAlign: 'center',
                        }}
                      >
                        No more data available.
                      </Typography>
                    )}
                  </Box>
                </Box>
              ) : (
                channelsData?.length === 0 && <UploadScreen />
              )}
            </Box>
          </ToolbarDrawer>
        </>
      )}
      <LoginDialog
        open={isLoginOpen}
        setIsSignupOpen={setIsSignupOpen}
        onClose={handleLoginDialogClose}
      />
      <SignupDialog
        open={isSignupOpen}
        setIsLoginOpen={setIsLoginOpen}
        onClose={() => setIsSignupOpen(false)}
      />
      <UploadDialog open={openUpload} onClose={handleCloseUploadDialog} />
      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteChannelConfirm}
        deletableName={
          channelsData?.[activeIndex!]?.organizationChannelTitle || ''
        }
      />
      <EditDialog
        open={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        onConfirm={handleEditChannelConfirm}
        editableName={
          channelsData?.[activeIndex!]?.organizationChannelTitle || ''
        }
      />
      <LoginDialog
        open={isLoginOpen}
        setIsSignupOpen={setIsSignupOpen}
        onClose={handleLoginDialogClose}
      />
      <SignupDialog
        open={isSignupOpen}
        setIsLoginOpen={setIsLoginOpen}
        onClose={() => setIsSignupOpen(false)}
      />
    </>
  );
};

export default ChannelsList;
