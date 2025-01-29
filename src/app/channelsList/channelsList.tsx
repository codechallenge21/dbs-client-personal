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
  const [favoriteChannels, setFavoriteChannels] = useState<{
    [key: string]: boolean;
  }>({});
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(
    isMobile ? false : true
  );
  const [openUpload, setOpenUpload] = React.useState(false);

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

  const handleStarClick = useCallback(
    (event: React.MouseEvent, channelId: string) => {
      event.stopPropagation();
      setFavoriteChannels((prev) => ({
        ...prev,
        [channelId]: !prev[channelId],
      }));
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
          channelsData?.[activeIndex!].organizationChannelId || '',
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
      `/channelSummary?organizationChannelId=${channel?.organizationChannelId}`
    );
  };

  const toggleDrawer = (newOpen: boolean) => {
    setIsOpenDrawer(newOpen);
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
          <ToolbarDrawer
            open={isOpenDrawer}
            toggleDrawer={toggleDrawer}
            setOpenUpload={setOpenUpload}
          >
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
              <Box
                sx={{
                  minHeight: '96vh',
                  maxHeight: '96vh',
                  overflowY: 'auto',
                  borderRadius: '8px',
                  padding: '16px 32px',
                  backgroundColor: 'white',
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
                      fontWeight: 400,
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
                        display: 'flex',
                        padding: '8px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '50px',
                      }}
                    >
                      <SearchRounded />
                    </IconButton>
                    <Button
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
                      variant="contained"
                      startIcon={<MicRounded />}
                    >
                      開始錄音
                    </Button>
                    <Button
                      sx={{
                        display: 'flex',
                        padding: '6px 12px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        borderRadius: '8px',
                        background: 'var(--Secondary-, #5C443A)',
                      }}
                      variant="contained"
                      color="primary"
                      startIcon={<UploadRounded />}
                      onClick={() => setOpenUpload(true)}
                    >
                      上傳檔案
                    </Button>
                  </Box>
                </Box>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: 400,
                            fontSize: '16px',
                            overflow: 'hidden',
                            fontStyle: 'normal',
                            lineHeight: 'normal',
                            textOverflow: 'ellipsis',
                            fontFamily: 'DFPHeiBold-B5',
                            color: 'var(--Text-Primary, #212B36)',
                          }}
                        >
                          標題
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 400,
                            fontSize: '16px',
                            overflow: 'hidden',
                            fontStyle: 'normal',
                            lineHeight: 'normal',
                            textOverflow: 'ellipsis',
                            fontFamily: 'DFPHeiBold-B5',
                            color: 'var(--Text-Primary, #212B36)',
                          }}
                        >
                          狀態
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 400,
                            fontSize: '16px',
                            overflow: 'hidden',
                            fontStyle: 'normal',
                            lineHeight: 'normal',
                            textOverflow: 'ellipsis',
                            fontFamily: 'DFPHeiBold-B5',
                            color: 'var(--Text-Primary, #212B36)',
                          }}
                        >
                          建立時間
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {channelsData?.map((channel, index) => (
                        <TableRow
                          key={index}
                          sx={{ cursor: 'pointer' }}
                          onClick={() => handleRowClick(channel)}
                          // onClick={() => handleRowClick(channel?.organizationChannelId)}
                        >
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              fontSize: '16px',
                              overflow: 'hidden',
                              fontStyle: 'normal',
                              lineHeight: 'normal',
                              textOverflow: 'ellipsis',
                              fontFamily: 'Public Sans',
                              color: 'var(--Text-Primary, #212B36)',
                            }}
                          >
                            {channel?.organizationChannelTitle}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 400,
                              fontSize: '16px',
                              overflow: 'hidden',
                              fontStyle: 'normal',
                              lineHeight: 'normal',
                              textOverflow: 'ellipsis',
                              fontFamily: 'DFPHeiBold-B5',
                              color: 'var(--Text-Primary, #212B36)',
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
                              fontWeight: 400,
                              fontSize: '16px',
                              overflow: 'hidden',
                              fontStyle: 'normal',
                              lineHeight: 'normal',
                              textOverflow: 'ellipsis',
                              fontFamily: 'DFPHeiBold-B5',
                              color: 'var(--Text-Primary, #212B36)',
                            }}
                          >
                            {new Date(
                              channel.organizationChannelCreateDate
                            ).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={(e) =>
                                handleStarClick(
                                  e,
                                  channel.organizationChannelId
                                )
                              }
                            >
                              {favoriteChannels[
                                channel.organizationChannelId
                              ] ? (
                                <StarRounded sx={{ color: 'black' }} />
                              ) : (
                                <StarBorderRounded sx={{ color: 'black' }} />
                              )}
                            </IconButton>
                          </TableCell>
                          <TableCell>
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
                color: '#5C443A',
                padding: '6px 12px',
                background: 'white',
                borderRadius: '8px',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--Secondary-, #5C443A)',
              }}
              variant="contained"
              startIcon={<MicRounded />}
            >
              開始錄音
            </Button>
            <Button
              sx={{
                display: 'flex',
                padding: '6px 12px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '8px',
                background: 'var(--Secondary-, #5C443A)',
              }}
              variant="contained"
              color="primary"
              startIcon={<UploadRounded />}
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
            >
              <CardContent
                sx={{
                  padding: 0,
                  width: '100%',
                  height: '90%',
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: '0 !important',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{
                    mb: '8px',
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
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      sx={{ mr: '8px', padding: '0px' }}
                      onClick={(e) =>
                        handleStarClick(e, channel.organizationChannelId)
                      }
                    >
                      {favoriteChannels[channel.organizationChannelId] ? (
                        <StarRounded sx={{ color: '#212B36' }} />
                      ) : (
                        <StarBorderRounded sx={{ color: '#212B36' }} />
                      )}
                    </IconButton>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: '16px',
                        overflow: 'hidden',
                        lineHeight: '24px',
                        fontStyle: 'normal',
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
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <UploadDialog open={openUpload} onClose={handleCloseUploadDialog} />
    </>
  );
};

export default ChannelsList;
