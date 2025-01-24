'use client';
import React, { useMemo, useState, useEffect, useCallback } from 'react';
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
  CircularProgress,
} from '@mui/material';
import {
  MicRounded,
  StarRounded,
  SearchRounded,
  UploadRounded,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import {
  OrganizationChannel,
  OrganizationChannelMessage,
} from '@/interfaces/entities';
import apis from '@/utils/hooks/apis/apis';
import { AdvisorType } from '../chat/types';
import EditDialog from '@/components/dialogs/EditDialog';
import UploadDialog from '@/components/uploadDialog/page';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import DeleteDialog from '@/components/dialogs/DeleteDialog';
import { useAudioChannels } from '@/utils/hooks/useAudioChannels';
import EditableItem from '@/components/editable-item/EditableItem';
import ToolbarDrawer from '@/components/toolbar-drawer-new/ToolbarDrawer';
import ChannelContentContext from '@/components/channel-context-provider/ChannelContentContext';

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
  const [selectedChannelId, setSelectedChannelId] = useState<string>();
  const [isLoadingChannel, setIsLoadingChannel] = useState<boolean>(false);
  const [selectedChannel, setSelectedChannel] = useState<OrganizationChannel>();
  const [isInteractingInChat, setIsInteractingInChat] =
    useState<boolean>(false);
  const [chatResponses, setChatResponses] = useState<
    OrganizationChannelMessage[]
  >([]);
  const [advisorType, setAdvisorType] = useState<AdvisorType>(
    AdvisorType.DEFAULT
  );

  const {
    data: channelsData,
    mutate: mutateAudioChannels,
    isValidating: isLoadingChannels,
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
          channelsData?.[activeIndex!].organizationChannelId || '',
      })
        .then(() => {
          setIsDeleteDialogOpen(false);
          handleCloseToolsMenu();
          if (mutateAudioChannels) {
            mutateAudioChannels().then(() => {
              if (selectedChannelId === selectedChannel?.organizationChannelId)
                setSelectedChannel(undefined);
              setSelectedChannelId(undefined);
            });
          }
        })
        .catch(() => {});
    },
    [
      activeIndex,
      channelsData,
      deleteChannel,
      selectedChannelId,
      setSelectedChannel,
      setSelectedChannelId,
      handleCloseToolsMenu,
      selectedChannel?.organizationChannelId,
      mutateAudioChannels,
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

  const [openUpload, setOpenUpload] = React.useState(false);

  const handleShowDetail = (channel: OrganizationChannel) => {
    setSelectedChannel(channel);
    router.push(
      `/channelSummary/detail?organizationChannelId=${channel?.organizationChannelId}`
    );
  };

  const contextValue = useMemo(
    () => ({
      isLoadingChannel,
      setIsLoadingChannel,
      selectedChannel,
      setSelectedChannel,
      isInteractingInChat,
      selectedChannelId,
      setSelectedChannelId,
      setIsInteractingInChat,
      chatResponses,
      setChatResponses,
      advisorType,
      setAdvisorType,
    }),
    [
      isLoadingChannel,
      selectedChannel,
      selectedChannelId,
      setSelectedChannelId,
      isInteractingInChat,
      setIsInteractingInChat,
      chatResponses,
      setChatResponses,
      advisorType,
      setAdvisorType,
    ]
  );

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
    <Box
      sx={{
        minHeight: '100vh',
        background: 'var(--Primary-, #EBE3DD)',
      }}
    >
      <ChannelContentContext.Provider value={contextValue}>
        <ToolbarDrawer
          open={isOpenDrawer}
          toggleDrawer={toggleDrawer}
          setOpenUpload={setOpenUpload}
        >
          {isLoadingChannels ? (
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
          ) : (
            <>
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
                              {
                                channel.organizationChannelTranscriptList[0]
                                  ?.organizationChannelTranscriptStatus
                              }
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
                              <IconButton>
                                <StarRounded sx={{ color: 'black' }} />
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
                  <UploadDialog
                    open={openUpload}
                    onClose={handleCloseUploadDialog}
                  />
                </Box>
              </>
            </>
          )}
        </ToolbarDrawer>
      </ChannelContentContext.Provider>
    </Box>
  );
};

export default ChannelsList;
