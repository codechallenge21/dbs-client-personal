'use client';
import React, { useState, useEffect, useCallback } from 'react';
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
  // CircularProgress,
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
import { OrganizationChannel } from '@/interfaces/entities';
import apis from '@/utils/hooks/apis/apis';
import EditDialog from '@/components/dialogs/EditDialog';
import UploadDialog from '@/components/uploadDialog/page';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import DeleteDialog from '@/components/dialogs/DeleteDialog';
import { useAudioChannels } from '@/utils/hooks/useAudioChannels';
import EditableItem from '@/components/editable-item/EditableItem';
import ToolbarDrawer from '@/components/toolbar-drawer-new/ToolbarDrawer';

const ChannelsList = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const {
    data: channelsData,
    mutate: mutateAudioChannels,
    // isValidating: isLoadingChannels,
  } = useAudioChannels({
    organizationId: '4aba77788ae94eca8d6ff330506af944',
  });

  const { excute: deleteChannel } = useAxiosApi(apis.deleteChannel);
  const { excute: updateChannelDetail } = useAxiosApi(apis.updateChannelDetail);

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
        organizationId: '4aba77788ae94eca8d6ff330506af944',
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
        organizationId: '4aba77788ae94eca8d6ff330506af944',
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
          <ToolbarDrawer open={isOpenDrawer} setIsOpenDrawer={setIsOpenDrawer}>
            {/* {isLoadingChannels ? (
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
        ) : ( */}
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
                  label="智能生活轉文字"
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
                  minHeight: '91vh',
                  maxHeight: '91vh',
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
                    alignItems: 'center',
                    alignSelf: 'stretch',
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
                    }}
                    gutterBottom
                  >
                    歡迎使用 語音轉文字
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      width: '458px',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                  >
                    <IconButton
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

                <TableContainer>
                  <Table
                    sx={{
                      overflowY: 'auto',
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
                            收藏
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            padding: '0px',
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
                            更多選擇
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {channelsData?.map((channel, index) => (
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
                                fontWeight: 400,
                                fontSize: '16px',
                                WebkitLineClamp: 1,
                                overflow: 'hidden',
                                padding: '16px 0px',
                                fontStyle: 'normal',
                                lineHeight: 'normal',
                                display: '-webkit-box',
                                textOverflow: 'ellipsis',
                                fontFamily: 'Public Sans',
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
                                gap: 2,
                              }}
                            >
                              {channel.organizationChannelTranscriptList[0]
                                ?.organizationChannelTranscriptStatus ===
                              'COMPLETE' ? (
                                <CheckCircleRounded
                                  sx={{ color: ' rgba(17, 141, 87, 1)' }}
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
                              <span>
                                {
                                  channel.organizationChannelTranscriptList[0]
                                    ?.organizationChannelTranscriptStatus
                                }
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
                              {new Date(channel.organizationChannelCreateDate)
                                .toLocaleDateString('en-CA')
                                .replace(/-/g, '/')}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              width: '7%',
                              border: 'none',
                              padding: '0px 16px',
                              textAlign: 'center',
                              height: '51px !important',
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggle(index);
                            }}
                          >
                            <IconButton sx={{ padding: '0px' }}>
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
                              padding: '0px 16px',
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
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </>
            {/* )} */}
          </ToolbarDrawer>
        </Box>
      )}
      {isMobile && (
        <Box
          sx={{
            padding: 2,
            height: '100vh',
            overflowY: 'auto',
            background: 'var(--Primary-White, #FFF)',
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
              height: '64px',
              width: '375px',
              display: 'flex',
              padding: '8px 16px',
              alignItems: 'center',
              borderRadius: '8px 0px 0px 8px',
              background: 'var(--Primary-White, #FFF)',
            }}
          >
            <IconButton>
              <MenuRounded sx={{ color: 'black' }} />
            </IconButton>
            <Typography
              sx={{
                flex: '1 0 0',
                height: '40px',
                display: 'flex',
                minHeight: '32px',
                alignItems: 'center',
                padding: '4px 0px 4px 8px',
              }}
            >
              工具箱
            </Typography>
          </Box>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{ mb: 2 }}
            TabIndicatorProps={{
              style: {
                backgroundColor: '#212B36',
              },
            }}
          >
            <Tab
              label="智能生活轉文字"
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
              }}
            />
            <Tab
              label="家系圖"
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
              }}
            />
            <Tab
              label="問答語音錄音"
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
              }}
            />
            <Tab
              label="個別與實時錄音"
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
              }}
            />
          </Tabs>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '32px',
              fontStyle: 'normal',
              lineHeight: 'normal',
              fontFamily: 'DFPHeiUBold-B5',
              color: 'var(--Primary-Black, #212B36)',
            }}
          >
            歡迎使用 語音轉文字
          </Typography>
          <Box
            sx={{
              gap: '16px',
              width: '100%',
              display: 'flex',
              margin: '16px 0',
              justifyContent: 'flex-end',
            }}
          >
            <IconButton>
              <SearchRounded sx={{ color: '#212B36' }} />
            </IconButton>
            <Button
              sx={{
                gap: '8px',
                display: 'flex',
                boxShadow: 'none',
                borderRadius: '8px',
                padding: '6px 12px',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--Secondary-, #5C443A)',
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
              }}
              startIcon={<UploadRounded sx={{ color: '#FFF' }} />}
              onClick={() => setOpenUpload(true)}
            >
              上傳檔案
            </Button>
          </Box>
          {channelsData?.map((channel, index) => (
            <Card
              key={index}
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
                    handleOpenEditChannelDialog={handleOpenEditChannelDialog}
                    handleDeleteChannelOpenConfirmDialog={
                      handleDeleteChannelOpenConfirmDialog
                    }
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
                      {new Date(channel.organizationChannelCreateDate)
                        .toLocaleDateString('en-CA')
                        .replace(/-/g, '/')}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {channel.organizationChannelTranscriptList[0]
                      ?.organizationChannelTranscriptStatus === 'COMPLETE' ? (
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
                        ?.organizationChannelTranscriptStatus === 'PENDING' ? (
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
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '24px',
                        overflow: 'hidden',
                        fontStyle: 'normal',
                        textOverflow: 'ellipsis',
                        fontFamily: 'DFPHeiMedium-B5',
                        color: 'var(--Primary-Black, #212B36)',
                      }}
                    >
                      {
                        channel.organizationChannelTranscriptList[0]
                          ?.organizationChannelTranscriptStatus
                      }
                    </span>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

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
    </>
  );
};

export default ChannelsList;
