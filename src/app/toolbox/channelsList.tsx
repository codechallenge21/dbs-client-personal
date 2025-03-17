'use client';
import DeleteDialog from '@/components/dialogs/DeleteDialog';
import EditDialog from '@/components/dialogs/EditDialog';
import ForgetPasswordDialog from '@/components/dialogs/ForgetPasswordDialog';
import LoginDialog from '@/components/dialogs/LoginDialog';
import SignupDialog from '@/components/dialogs/SignupDialog';
import EditableItem from '@/components/editable-item/EditableItem';
import ToolbarDrawer, {
  customScrollbarStyle,
} from '@/components/toolbar-drawer-new/ToolbarDrawer';
import UploadDialog, {
  FILE_CONFIG,
} from '@/components/uploadDialog/uploadDialog';
import { useLoginContext } from '@/context/LoginContext';
import { SnackbarContext } from '@/context/SnackbarContext';
import { OrganizationChannel } from '@/interfaces/entities';
import { formatDate } from '@/utils/formatDate';
import {
  default as apiExports,
  default as apis,
} from '@/utils/hooks/apis/apis';
import { useAudioChannels } from '@/utils/hooks/useAudioChannels';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import {
  ArrowDropDown,
  CheckCircleRounded,
  MenuRounded,
  PendingActionsRounded,
  RotateRightRounded,
  UploadRounded,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import UploadScreen from './UploadScreen';
import { keyframes } from '@emotion/react';

interface fileProps {
  organizationChannelTitle: string;
  organizationChannelCreateDate: string;
}

const ChannelsList = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { excute: createChannelByAudio, isLoading: isCreating } = useAxiosApi(
    apiExports.createChannelByAudio
  );
  const { isLoginOpen, setIsLoginOpen, isSignupOpen, setIsSignupOpen } =
    useLoginContext();

  const { excute: getChannelDetail, isLoading: isSingleChannelLoading } =
    useAxiosApi(apis.getChannelDetail);

  const [tabValue, setTabValue] = useState(0);
  const [loadingElementVisible, setLoadingElementVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [toolsAnchor, setToolsAnchor] = useState<null | HTMLElement>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(
    isMobile ? false : true
  );
  const [openUpload, setOpenUpload] = useState(false);
  const [, setFavoriteChannels] = useState<{ [key: number]: boolean }>({});
  // Changed from a single file to an array to support multiple file uploads
  const [uploadingFiles, setUploadingFiles] = useState<fileProps[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [channelList, setChannelList] = useState<OrganizationChannel[]>([]);
  const [isForgetPasswordOpen, setIsForgetPasswordOpen] = useState(false);
  const itemsPerPage = 10;
  const { showSnackbar } = useContext(SnackbarContext);
  const currentPageRef = useRef(0);
  const {
    data: channelsData = [],
    mutate: mutateAudioChannels,
    isValidating: isLoadingChannels,
  } = useAudioChannels(
    {
      organizationId: 'yMJHyi6R1CB9whpdNvtA',
    },
    {
      startIndex: currentPageRef.current,
      size: itemsPerPage,
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (error?.status === 401) {
          setHasMore(false);
        }
        if (retryCount >= 3) return;
      },
    }
  );

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLElement | null>(null);

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
      const channelToDeleteId =
        channelList?.[activeIndex!]?.organizationChannelId || '';
      setIsDeleteDialogOpen(false);
      handleCloseToolsMenu();
      deleteChannel({
        organizationId: 'yMJHyi6R1CB9whpdA',
        organizationChannelId: channelToDeleteId,
      })
        .then(() => {
          setChannelList((prevChannelList) =>
            prevChannelList.filter(
              (channel) => channel.organizationChannelId !== channelToDeleteId
            )
          );
          setTimeout(() => {
            mutateAudioChannels();
          }, 0);
        })
        .catch(() => {});
    },
    [
      activeIndex,
      channelList,
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
          channelList?.[activeIndex!]?.organizationChannelId || '',
        organizationChannelTitle: newTitle,
      });
      setIsEditDialogOpen(false);
      setChannelList((prevChannelList) =>
        prevChannelList.map((channel, index) =>
          index === activeIndex
            ? { ...channel, organizationChannelTitle: newTitle }
            : channel
        )
      );
      setTimeout(() => {
        mutateAudioChannels();
      }, 0);
    },
    [updateChannelDetail, channelList, activeIndex, mutateAudioChannels]
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
    if (
      channel.organizationChannelTranscriptList[0]
        ?.organizationChannelTranscriptStatus === 'COMPLETE'
    ) {
      handleShowDetail(channel);
    }
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

  // Updated upload handler to support multiple file uploads.
  const handleUploadFiles = async (files: File[], filesInfo: fileProps[]) => {
    try {
      // Mark all files as currently uploading
      setUploadingFiles((prev) => [...prev, ...filesInfo]);

      // For each file, create a new FormData and call the API concurrently
      const uploadPromises = files.map((file, index) => {
        const formData = new FormData();
        formData.append('file', file); // Use 'file' as the key for individual file upload
        return createChannelByAudio(formData)
          .then((response) => ({ response, index }))
          .catch((error) => {
            console.error('Upload failed for file:', file.name, error);
            return null;
          });
      });

      const uploadResults = await Promise.all(uploadPromises);
      // Filter out any failed uploads
      const successfulUploads = uploadResults.filter(
        (result): result is { response: any; index: number } => result !== null
      );

      // For each successful upload, get channel details
      const channelDetailsPromises = successfulUploads.map(
        ({ response, index }) => {
          const channels = Array.isArray(response.data)
            ? response.data
            : [response.data];
          return Promise.all(
            channels.map((channel: any) =>
              getChannelDetail({
                organizationId: 'yMJHyi6R1CB9whpdNvtA',
                organizationChannelId: channel.organizationChannelId,
              })
            )
          ).then((detailsArray) => ({ details: detailsArray, index }));
        }
      );

      const detailsResults = await Promise.all(channelDetailsPromises);
      // Flatten the retrieved channels and update channelList
      const newChannels = detailsResults.flatMap(({ details }) =>
        details.map((res) => res.data)
      );
      setChannelList((prevChannelList) => [...newChannels, ...prevChannelList]);

      // Remove the files that were successfully uploaded from the uploading state
      setUploadingFiles((prev) =>
        prev.filter(
          (upload) =>
            !successfulUploads.some(
              (_, idx) =>
                filesInfo[idx]?.organizationChannelTitle ===
                upload.organizationChannelTitle
            )
        )
      );
    } catch (err) {
      showSnackbar(FILE_CONFIG.errorMessages.uploadFailed, 'error');
      console.error(err);
    }
  };

  const handleForgetPasswordOpen = useCallback(() => {
    setIsLoginOpen(false);
    setIsForgetPasswordOpen(true);
  }, [setIsLoginOpen]);

  useEffect(() => {
    setIsOpenDrawer(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (
      channelsData &&
      channelsData.length > 0 &&
      currentPageRef.current === 0
    ) {
      setChannelList(channelsData);
      if (channelsData.length < itemsPerPage) {
        setHasMore(false);
      }
    }
  }, [channelsData, currentPageRef.current]);

  const fetchMoreData = useCallback(async () => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);

    try {
      const nextPage = currentPageRef.current + itemsPerPage;
      currentPageRef.current = nextPage;

      setTimeout(async () => {
        const response = await mutateAudioChannels();
        const newChannels = response?.data || [];

        if (newChannels.length > 0) {
          setChannelList((prevChannels) => [...prevChannels, ...newChannels]);
          setHasMore(newChannels.length >= itemsPerPage);
        } else {
          setHasMore(false);
        }
      }, 100);
    } catch (error) {
      console.error('Error loading channels:', error);
      setHasMore(false);
    } finally {
      setIsFetching(false);
    }
  }, [isFetching, hasMore, mutateAudioChannels]);

  useEffect(() => {
    if (!loadingElementVisible || !hasMore) return;

    if (observer.current && loadingRef.current && scrollContainerRef.current) {
      observer.current.unobserve(loadingRef.current);
      observer.current = null;
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !isFetching) {
          fetchMoreData();
        }
      },
      { threshold: 0.2 }
    );

    if (loadingRef.current) {
      observer.current.observe(loadingRef.current);
    }

    return () => {
      if (observer.current && loadingRef.current) {
        observer.current.unobserve(loadingRef.current);
        observer.current = null;
      }
    };
  }, [loadingElementVisible, hasMore, isFetching, fetchMoreData]);

  const rotateAnimation = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  `;

  const LoaderSvg = styled('svg')({
    animation: `${rotateAnimation} 1s linear infinite`,
    transformOrigin: 'center',
  });

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
                  style: { height: '3px', backgroundColor: '#212B36' },
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
                    fontFamily: 'var(--font-bold)',
                    color: 'var(--Text-Secondary, #637381)',
                    '&.Mui-selected': {
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '22px',
                      fontStyle: 'normal',
                      fontFamily: 'var(--font-bold)',
                      color: 'var(--Text-Secondary, #212B36)',
                    },
                  }}
                />
                {/* <Tab
                  disableRipple
                  label="家系圖"
                  disabled
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "13px 0px 12px 0px",
                    fontSize: "14px",
                    fontWeight: 700,
                    fontStyle: "normal",
                    lineHeight: "normal",
                    fontFamily: "var(--font-bold)",
                    color: "var(--Text-Secondary, #637381)",
                    "&.Mui-selected": {
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "22px",
                      fontStyle: "normal",
                      fontFamily: "var(--font-bold)",
                      color: "var(--Text-Secondary, #212B36)",
                    },
                  }}
                /> */}
                {/* <Tab
                  disableRipple
                  disabled
                  label="問答語音錄音"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "13px 0px 12px 0px",
                    fontSize: "14px",
                    fontWeight: 700,
                    fontStyle: "normal",
                    lineHeight: "normal",
                    fontFamily: "var(--font-bold)",
                    color: "var(--Text-Secondary, #637381)",
                    "&.Mui-selected": {
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "22px",
                      fontStyle: "normal",
                      fontFamily: "var(--font-bold)",
                      color: "var(--Text-Secondary, #212B36)",
                    },
                  }}
                /> */}
                {/* <Tab
                  disableRipple
                  label="個別與實時錄音"
                  disabled
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "13px 0px 12px 0px",
                    fontSize: "14px",
                    fontWeight: 700,
                    fontStyle: "normal",
                    lineHeight: "normal",
                    fontFamily: "var(--font-bold)",
                    color: "var(--Text-Secondary, #637381)",
                    "&.Mui-selected": {
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "22px",
                      fontStyle: "normal",
                      fontFamily: "var(--font-bold)",
                      color: "var(--Text-Secondary, #212B36)",
                    },
                  }}
                /> */}
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
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
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
                      fontFamily: 'var(--font-bold)',
                      color: 'var(--Primary-Black, #212B36)',
                      textAlign: 'left',
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
                    {/* <IconButton
                      aria-label="search"
                      sx={{
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "50px",
                        justifyContent: "center",
                      }}
                    >
                      <SearchRounded />
                    </IconButton> */}
                    {/* <IconButton
                      aria-label="Start Recording"
                      sx={{
                        gap: "8px",
                        display: "flex",
                        color: "#5C443A",
                        padding: "6px 12px",
                        background: "white",
                        borderRadius: "8px",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid var(--Secondary-, #5C443A)",
                      }}
                    >
                      <MicRounded sx={{ color: "#5C443A" }} />
                      <Typography>開始錄音</Typography>
                    </IconButton> */}
                    <IconButton
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
                channelList?.length === 0 &&
                currentPageRef.current === 0 &&
                uploadingFiles.length === 0 &&
                !(isCreating || isLoadingChannels || isSingleChannelLoading) ? (
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
                ) : channelList?.length > 0 || uploadingFiles.length > 0 ? (
                  <TableContainer
                    ref={scrollContainerRef}
                    sx={{
                      maxHeight: 'calc(100vh - 180px)',
                      overflow: 'auto',
                      ...customScrollbarStyle,
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
                              fontFamily: 'var(--font-bold)',
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
                                fontFamily: 'var(--font-bold)',
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
                              fontFamily: 'var(--font-bold)',
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
                                fontFamily: 'var(--font-bold)',
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
                              fontFamily: 'var(--font-bold)',
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
                                fontFamily: 'var(--font-bold)',
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
                        {uploadingFiles.length > 0 &&
                          (isCreating ||
                            isLoadingChannels ||
                            isSingleChannelLoading) &&
                          uploadingFiles.map((file, index) => (
                            <TableRow
                              key={`uploading-${index}`}
                              sx={{
                                cursor: 'default',
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
                                    fontFamily: 'var(--font-bold)',
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
                                  {file.organizationChannelTitle}
                                </Typography>
                              </TableCell>
                              <TableCell
                                sx={{
                                  width: '18%',
                                  padding: '0px 8px 0px 0px ',
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
                                  <LoaderSvg
                                    width="20"
                                    height="24"
                                    viewBox="0 0 24 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g
                                      clipPath="url(#paint0_angular_351_18898_clip_path)"
                                      data-figma-skip-parse="true"
                                    >
                                      <g transform="matrix(0 0.012 -0.012 0 12 12)">
                                        <foreignObject
                                          x="-1083.33"
                                          y="-1083.33"
                                          width="2166.67"
                                          height="2166.67"
                                        >
                                          <div
                                            style={{
                                              background:
                                                'conic-gradient(from 90deg,rgba(254, 254, 254, 0.9971) 0deg,rgba(255, 255, 255, 1) 0.257783deg,rgba(119, 187, 255, 1) 89.6679deg,rgba(0, 86, 173, 1) 184.883deg,rgba(0, 40, 80, 0) 270.195deg,rgba(254, 254, 254, 0.9971) 360deg)',
                                              height: '100%',
                                              width: '100%',
                                              opacity: 1,
                                            }}
                                          />
                                        </foreignObject>
                                      </g>
                                    </g>
                                    <path
                                      d="M12 24C9.62662 24 7.30655 23.2962 5.33316 21.9776C3.35977 20.6591 1.8217 18.7849 0.913445 16.5922C0.0051938 14.3995 -0.232446 11.9867 0.230577 9.65891C0.6936 7.33114 1.83649 5.19295 3.51472 3.51472C5.19295 1.83649 7.33115 0.693599 9.65892 0.230576C11.9867 -0.232446 14.3995 0.00519433 16.5922 0.913446C18.7849 1.8217 20.6591 3.35977 21.9776 5.33316C23.2962 7.30655 24 9.62663 24 12H21.6C21.6 10.1013 21.037 8.24524 19.9821 6.66653C18.9272 5.08781 17.4279 3.85736 15.6738 3.13076C13.9196 2.40416 11.9894 2.21404 10.1271 2.58446C8.26492 2.95488 6.55436 3.86919 5.21178 5.21177C3.86919 6.55436 2.95488 8.26491 2.58446 10.1271C2.21404 11.9893 2.40415 13.9196 3.13076 15.6738C3.85736 17.4279 5.08781 18.9272 6.66652 19.9821C8.24524 21.037 10.1013 21.6 12 21.6L12 24Z"
                                      data-figma-gradient-fill='{"type":"GRADIENT_ANGULAR","stops":[{"color":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"position":0.00071606453275308013},{"color":{"r":0.46666666865348816,"g":0.73333370685577393,"b":1.0,"a":1.0},"position":0.24907758831977844},{"color":{"r":0.0,"g":0.33958333730697632,"b":0.67916667461395264,"a":1.0},"position":0.51356458663940430},{"color":{"r":0.0,"g":0.15833333134651184,"b":0.31666666269302368,"a":0.0},"position":0.75054049491882324}],"stopsVar":[{"color":{"r":1.0,"g":1.0,"b":1.0,"a":1.0},"position":0.00071606453275308013},{"color":{"r":0.46666666865348816,"g":0.73333370685577393,"b":1.0,"a":1.0},"position":0.24907758831977844},{"color":{"r":0.0,"g":0.33958333730697632,"b":0.67916667461395264,"a":1.0},"position":0.51356458663940430},{"color":{"r":0.0,"g":0.15833333134651184,"b":0.31666666269302368,"a":0.0},"position":0.75054049491882324}],"transform":{"m00":1.4695762231022014e-15,"m01":-24.0,"m02":24.0,"m10":24.0,"m11":1.4695762231022014e-15,"m12":-1.4695762231022014e-15},"opacity":1.0,"blendMode":"NORMAL","visible":true}'
                                    />
                                    <defs>
                                      <clipPath id="paint0_angular_351_18898_clip_path">
                                        <path d="M12 24C9.62662 24 7.30655 23.2962 5.33316 21.9776C3.35977 20.6591 1.8217 18.7849 0.913445 16.5922C0.0051938 14.3995 -0.232446 11.9867 0.230577 9.65891C0.6936 7.33114 1.83649 5.19295 3.51472 3.51472C5.19295 1.83649 7.33115 0.693599 9.65892 0.230576C11.9867 -0.232446 14.3995 0.00519433 16.5922 0.913446C18.7849 1.8217 20.6591 3.35977 21.9776 5.33316C23.2962 7.30655 24 9.62663 24 12H21.6C21.6 10.1013 21.037 8.24524 19.9821 6.66653C18.9272 5.08781 17.4279 3.85736 15.6738 3.13076C13.9196 2.40416 11.9894 2.21404 10.1271 2.58446C8.26492 2.95488 6.55436 3.86919 5.21178 5.21177C3.86919 6.55436 2.95488 8.26491 2.58446 10.1271C2.21404 11.9893 2.40415 13.9196 3.13076 15.6738C3.85736 17.4279 5.08781 18.9272 6.66652 19.9821C8.24524 21.037 10.1013 21.6 12 21.6L12 24Z" />
                                      </clipPath>
                                    </defs>
                                  </LoaderSvg>
                                  <span
                                    style={{
                                      fontFamily: 'var(--font-bold)',
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
                                    {'上傳中...'}
                                  </span>
                                </Box>
                              </TableCell>
                              <TableCell
                                sx={{
                                  width: '18%',
                                  padding: '0px 0px 0px 8px',
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
                                    fontFamily: 'var(--font-bold)',
                                    color: 'var(--Text-Primary, #212B36)',
                                  }}
                                >
                                  {file.organizationChannelCreateDate}
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
                              >
                                {/* <IconButton
                                  role="button"
                                  aria-label="favorite"
                                  sx={{ padding: "0px" }}
                                >
                                  {
                                    <StarBorderRounded
                                      sx={{ color: "black" }}
                                    />
                                  }
                                </IconButton> */}
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
                              ></TableCell>
                            </TableRow>
                          ))}
                        {channelList?.map((channel, index) => (
                          <TableRow
                            key={index}
                            onClick={() => handleRowClick(channel)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleRowClick(channel);
                              }
                            }}
                            tabIndex={0}
                            role="button"
                            sx={{
                              cursor:
                                channel.organizationChannelTranscriptList[0]
                                  ?.organizationChannelTranscriptStatus ===
                                'COMPLETE'
                                  ? 'pointer'
                                  : 'default',
                              height: '56px !important',
                              borderBottom:
                                '1px dashed var(--Components-Divider, rgba(145, 158, 171, 0.20))',
                              background: 'var(--Background-Paper, #FFF)',
                              '&:focus': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)', // Add button click effect
                              },
                              '&:active': {
                                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Add button click effect
                              },
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
                                  fontFamily: 'var(--font-bold)',
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
                                    sx={{ color: '#0066CC' }}
                                  />
                                ) : (
                                  <PendingActionsRounded
                                    sx={{ color: '#0066CC' }}
                                  />
                                )}
                                <span
                                  style={{
                                    fontFamily: 'var(--font-bold)',
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
                                    ? '摘要中...'
                                    : '摘要中...'}
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
                                  fontFamily: 'var(--font-bold)',
                                  color: 'var(--Text-Primary, #212B36)',
                                }}
                              >
                                {channel.organizationChannelCreateDate
                                  ? formatDate(
                                      new Date(
                                        channel.organizationChannelCreateDate
                                      )
                                    )
                                  : ''}
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
                              {/* <IconButton
                                role="button"
                                aria-label="favorite"
                                sx={{ padding: "0px" }}
                              >
                                {favoriteChannels[index] ? (
                                  <StarRounded sx={{ color: "black" }} />
                                ) : (
                                  <StarBorderRounded sx={{ color: "black" }} />
                                )}
                              </IconButton> */}
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
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.stopPropagation();
                                }
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
                          <TableRow
                            ref={(el) => {
                              loadingRef.current = el;
                              setLoadingElementVisible(!!el);
                            }}
                          >
                            <TableCell
                              colSpan={5}
                              align="center"
                              sx={{ border: 'none', p: 2 }}
                            >
                              {!isCreating && (
                                <CircularProgress size={24} color="primary" />
                              )}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  channelsData?.length === 0 &&
                  channelList?.length === 0 &&
                  uploadingFiles.length === 0 &&
                  !(
                    isCreating ||
                    isLoadingChannels ||
                    isSingleChannelLoading
                  ) && <UploadScreen handleUploadFiles={handleUploadFiles} />
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
                  <ArrowDropDown
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
                TabIndicatorProps={{ style: { backgroundColor: '#212B36' } }}
              >
                <Tab
                  label="智能語音轉文字"
                  sx={{
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '22px',
                    fontStyle: 'normal',
                    fontFamily: 'var(--font-bold)',
                    color: 'var(--Text-Secondary, #637381))',
                    '&.Mui-selected': {
                      color: 'var(--Primary-Black, #212B36)',
                    },
                    padding: '12px 0px',
                  }}
                />
                {/* <Tab
                  label="家系圖"
                  disabled
                  sx={{
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "22px",
                    fontStyle: "normal",
                    fontFamily: "var(--font-bold)",
                    color: "var(--Text-Secondary, #637381)",
                    "&.Mui-selected": {
                      color: "var(--Primary-Black, #212B36)",
                    },
                    padding: "12px 0px",
                    minWidth: "auto",
                  }}
                /> */}
                {/* <Tab
                  label="問答語音錄音"
                  disabled
                  sx={{
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "22px",
                    fontStyle: "normal",
                    fontFamily: "var(--font-bold)",
                    color: "var(--Text-Secondary, #637381)",
                    "&.Mui-selected": {
                      color: "var(--Primary-Black, #212B36)",
                    },
                    padding: "12px 0px",
                    minWidth: "auto",
                  }}
                /> */}
                {/* <Tab
                  label="個別與實時錄音"
                  disabled
                  sx={{
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "22px",
                    fontStyle: "normal",
                    fontFamily: "var(--font-bold)",
                    color: "var(--Text-Secondary, #637381)",
                    "&.Mui-selected": {
                      color: "var(--Primary-Black, #212B36)",
                    },
                    padding: "12px 0px",
                    minWidth: "auto",
                  }}
                /> */}
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
                  fontFamily: 'var(--font-bold)',
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
                {/* <IconButton role="button" aria-label="search">
                  <SearchRounded sx={{ color: "#212B36" }} />
                </IconButton> */}
                {/* <Button
                  role="button"
                  aria-label="Start Recording"
                  disabled
                  sx={{
                    gap: "8px",
                    display: "flex",
                    boxShadow: "none",
                    borderRadius: "8px",
                    padding: "6px 12px",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--Secondary-, #5C443A)",
                    "& .MuiButton-startIcon": {
                      margin: 0,
                    },
                  }}
                  startIcon={<MicRounded sx={{ color: "#5C443A" }} />}
                >
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "24px",
                      textAlign: "center",
                      fontStyle: "normal",
                      fontFamily: "var(--font-bold)",
                      color: "var(--Secondary-, #5C443A)",
                    }}
                  >
                    開始錄音
                  </Typography>
                </Button> */}
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
                      fontFamily: 'var(--font-bold)',
                      color: '#FFF',
                    }}
                  >
                    上傳檔案
                  </Typography>
                </Button>
              </Box>
              {isLoadingChannels &&
              channelList?.length === 0 &&
              currentPageRef.current === 0 &&
              uploadingFiles.length === 0 &&
              !(isCreating || isLoadingChannels || isSingleChannelLoading) ? (
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
              ) : channelList?.length > 0 || uploadingFiles.length > 0 ? (
                <Box
                  ref={scrollContainerRef}
                  sx={{
                    width: '100%',
                    maxHeight: 'calc(100vh - 230px)',
                    overflow: 'auto',
                    ...customScrollbarStyle,
                  }}
                >
                  <Box
                    sx={{
                      gap: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {uploadingFiles.length > 0 &&
                      (isCreating ||
                        isLoadingChannels ||
                        isSingleChannelLoading) &&
                      uploadingFiles.map((file, index) => (
                        <Card
                          key={`uploading-mobile-${index}`}
                          sx={{
                            mb: '16px',
                            height: '146px',
                            padding: '16px',
                            display: 'flex',
                            maxWidth: '384px',
                            minWidth: '300px',
                            alignSelf: 'stretch',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            borderRadius: '16px',
                            background: 'var(--Primary-White, #FFF)',
                            boxShadow:
                              '0px 12px 24px -4px rgba(17, 68, 85, 0.12), 0px 0px 2px 0px rgba(17, 68, 85, 0.12)',
                          }}
                        >
                          <CardContent
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              height: '100%',
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
                                alignItems: 'start',
                                justifyContent: 'space-between',
                              }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: 400,
                                  fontSize: '24px',
                                  fontStyle: 'normal',
                                  lineHeight: 'normal',
                                  whiteSpace: 'normal',
                                  wordBreak: 'break-word',
                                  fontFamily: 'var(--font-bold)',
                                  color: 'var(--Primary-Black, #212B36)',
                                }}
                              >
                                {file.organizationChannelTitle}
                              </Typography>
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
                                {/* <IconButton
                                  role="button"
                                  aria-label="favorite"
                                  sx={{ padding: "0px", marginRight: "8px" }}
                                >
                                  {
                                    <StarBorderRounded
                                      sx={{ color: "black" }}
                                    />
                                  }
                                </IconButton> */}
                                <Typography
                                  sx={{
                                    fontWeight: 400,
                                    fontSize: '16px',
                                    overflow: 'hidden',
                                    lineHeight: '24px',
                                    fontStyle: 'normal',
                                    textAlign: 'center',
                                    textOverflow: 'ellipsis',
                                    fontFamily: 'var(--font-medium)',
                                    color: 'var(--Primary-Black, #212B36)',
                                  }}
                                >
                                  {file?.organizationChannelCreateDate}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: 'var(--font-bold)',
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
                                  {'上傳中...'}
                                </span>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      ))}
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
                            display: 'flex',
                            flexDirection: 'column',
                            paddingBottom: '0 !important',
                            justifyContent: 'space-between',
                            height: '100%',
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
                                fontFamily: 'var(--font-bold)',
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
                              {/* <IconButton
                                role="button"
                                aria-label="favorite"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggle(index);
                                }}
                                sx={{ padding: "0px", marginRight: "8px" }}
                              >
                                {favoriteChannels[index] ? (
                                  <StarRounded sx={{ color: "black" }} />
                                ) : (
                                  <StarBorderRounded sx={{ color: "black" }} />
                                )}
                              </IconButton> */}
                              <Typography
                                sx={{
                                  fontWeight: 400,
                                  fontSize: '16px',
                                  overflow: 'hidden',
                                  lineHeight: '24px',
                                  fontStyle: 'normal',
                                  textAlign: 'center',
                                  textOverflow: 'ellipsis',
                                  fontFamily: 'var(--font-medium)',
                                  color: 'var(--Primary-Black, #212B36)',
                                }}
                              >
                                {channel.organizationChannelCreateDate
                                  ? formatDate(
                                      new Date(
                                        channel.organizationChannelCreateDate
                                      )
                                    )
                                  : ''}
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
                                  sx={{ color: '#0066CC' }}
                                />
                              ) : (
                                <PendingActionsRounded
                                  sx={{ color: '#0066CC' }}
                                />
                              )}
                              <span
                                style={{
                                  fontFamily: 'var(--font-medium)',
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
                                  ? '摘要中...'
                                  : '摘要中...'}
                              </span>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                    {hasMore && (
                      <Box
                        ref={(el: HTMLElement) => {
                          loadingRef.current = el;
                          setLoadingElementVisible(!!el);
                        }}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          p: 2,
                        }}
                      >
                        {!isCreating && (
                          <CircularProgress size={24} color="primary" />
                        )}
                      </Box>
                    )}
                  </Box>
                </Box>
              ) : (
                channelsData?.length === 0 &&
                channelList?.length === 0 &&
                uploadingFiles.length === 0 &&
                !(
                  isCreating ||
                  isLoadingChannels ||
                  isSingleChannelLoading
                ) && <UploadScreen handleUploadFiles={handleUploadFiles} />
              )}
            </Box>
          </ToolbarDrawer>
        </>
      )}
      {/* Dialogs */}
      <LoginDialog
        open={isLoginOpen}
        setIsSignupOpen={setIsSignupOpen}
        onClose={handleLoginDialogClose}
        onOpenForgetPassword={handleForgetPasswordOpen}
      />
      <SignupDialog
        open={isSignupOpen}
        setIsLoginOpen={setIsLoginOpen}
        onClose={() => setIsSignupOpen(false)}
      />
      <UploadDialog
        open={openUpload}
        onClose={handleCloseUploadDialog}
        handleUploadFiles={handleUploadFiles}
      />
      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteChannelConfirm}
        deletableName={
          channelList?.[activeIndex!]?.organizationChannelTitle || ''
        }
      />
      <EditDialog
        open={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        onConfirm={handleEditChannelConfirm}
        editableName={
          channelList?.[activeIndex!]?.organizationChannelTitle || ''
        }
      />
      <ForgetPasswordDialog
        open={isForgetPasswordOpen}
        onClose={() => setIsForgetPasswordOpen(false)}
      />
    </>
  );
};

export default ChannelsList;
