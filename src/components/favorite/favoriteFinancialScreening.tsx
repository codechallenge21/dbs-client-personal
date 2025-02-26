'use client';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Table,
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
  InputAdornment,
  TextField,
  // CircularProgress,
} from '@mui/material';
import {
  StarRounded,
  CheckCircleRounded,
  RotateRightRounded,
  PendingActionsRounded,
  StarBorderRounded,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import { OrganizationChannel } from '@/interfaces/entities';
import apis from '@/utils/hooks/apis/apis';
import EditDialog from '@/components/dialogs/EditDialog';
import UploadDialog from '@/components/uploadDialog/page';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import DeleteDialog from '@/components/dialogs/DeleteDialog';
import { useAudioChannels } from '@/utils/hooks/useAudioChannels';
import EditableItem from '@/components/editable-item/EditableItem';

const FavoriteFinancialScreening = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isClient, setIsClient] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [toolsAnchor, setToolsAnchor] = useState<null | HTMLElement>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

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
        <TableContainer>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              paddingBottom: '16px',
              paddingLeft: '0px',
              paddingRight: '0px',
            }}
          >
            <TextField
              variant="outlined"
              placeholder="搜尋"
              sx={{
                width: '358px',
                height: '48px',
                marginBottom: '5px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#ddd',
                  },
                  '&:hover fieldset': {
                    borderColor: '#aaa',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#000',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
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
                        ?.organizationChannelTranscriptStatus === 'COMPLETE' ? (
                        <CheckCircleRounded sx={{ color: ' #118D57' }} />
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
                          ?.organizationChannelTranscriptStatus === 'COMPLETE'
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
                      handleOpenEditChannelDialog={handleOpenEditChannelDialog}
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
      )}
      {isMobile && (
        <Box
          sx={{
            padding: 1,
            height: '100vh',
            overflowY: 'auto',
            background: 'var(--Primary-White, #FFF)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              paddingBottom: '16px',
              paddingLeft: '0px',
              paddingRight: '0px',
            }}
          >
            <TextField
              variant="outlined"
              placeholder="搜尋"
              sx={{
                width: '100%',
                marginBottom: '5px',
                height: '48px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#ddd',
                  },
                  '&:hover fieldset': {
                    borderColor: '#aaa',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#000',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {channelsData?.map((channel, index) => (
            <Card
              key={index}
              sx={{
                mb: '16px',
                height: 'auto', // Changed from fixed height to auto
                padding: '16px',
                display: 'flex',
                width: '100%', // Changed from fixed width to 100%
                alignSelf: 'stretch',
                flexDirection: 'column',
                alignItems: 'flex-start',
                borderRadius: '16px',
                minHeight: '146px', // Added minHeight instead of fixed height
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
                      fontSize: { xs: '20px', sm: '24px' }, // Responsive font size
                      fontStyle: 'normal',
                      lineHeight: 'normal',
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      fontFamily: 'DFPHeiBold-B5',
                      color: 'var(--Primary-Black, #212B36)',
                      flexGrow: 1, // Allow text to take available space
                      mr: '8px', // Add margin to prevent overlap with icon
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
                    flexWrap: { xs: 'wrap', sm: 'nowrap' }, // Allow wrapping on extra small screens
                    mt: '8px', // Add margin top for spacing when wrapped
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: { xs: '8px', sm: 0 }, // Add bottom margin when wrapped
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
                        fontSize: { xs: '14px', sm: '16px' }, // Responsive font size
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
                      ml: { xs: 0, sm: 'auto' }, // Auto margin on left for larger screens
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
                        ?.organizationChannelTranscriptStatus === 'COMPLETE'
                        ? '完成'
                        : channel.organizationChannelTranscriptList[0]
                            ?.organizationChannelTranscriptStatus ===
                          'PROCESSING'
                        ? ' 上傳中...'
                        : channel.organizationChannelTranscriptList[0]
                            ?.organizationChannelTranscriptStatus === 'PENDING'
                        ? '正在摘要...'
                        : ''}
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

export default FavoriteFinancialScreening;
