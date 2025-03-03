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
  IconButton,
  useMediaQuery,
  TableContainer,
  Checkbox,
  TextField,
  InputAdornment,
  CardContent,
  Card,
  Typography, // <-- Add this for checkboxes
} from '@mui/material';
import {
  StarRounded,
  StarBorderRounded,
  CheckCircleRounded,
  PendingActionsRounded,
  RotateRightRounded,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

// Your existing imports...
import { OrganizationChannel } from '@/interfaces/entities';
import apis from '@/utils/hooks/apis/apis';
import EditDialog from '@/components/dialogs/EditDialog';
import UploadDialog from '@/components/uploadDialog/uploadDialog';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import DeleteDialog from '@/components/dialogs/DeleteDialog';
import SearchIcon from '@mui/icons-material/Search';
import { useAudioChannels } from '@/utils/hooks/useAudioChannels';
import EditableItem from '@/components/editable-item/EditableItem';

const FavoriteFinancialQuickScreening = () => {
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

  // Example data hook
  const { data: channelsData, mutate: mutateAudioChannels } = useAudioChannels({
    organizationId: '4aba77788ae94eca8d6ff330506af944',
  });

  // Example API calls
  const { excute: deleteChannel } = useAxiosApi(apis.deleteChannel);
  const { excute: updateChannelDetail } = useAxiosApi(apis.updateChannelDetail);

  // Close menus/dialogs
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
      if (activeIndex == null) return;
      deleteChannel({
        organizationId: '4aba77788ae94eca8d6ff330506af944',
        organizationChannelId:
          channelsData?.[activeIndex]?.organizationChannelId || '',
      })
        .then(() => {
          setIsDeleteDialogOpen(false);
          handleCloseToolsMenu();
          if (mutateAudioChannels) mutateAudioChannels();
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
      if (activeIndex == null) return;
      await updateChannelDetail({
        organizationId: '4aba77788ae94eca8d6ff330506af944',
        organizationChannelId:
          channelsData?.[activeIndex]?.organizationChannelId || '',
        organizationChannelTitle: newTitle,
      });
      setIsEditDialogOpen(false);
      if (mutateAudioChannels) mutateAudioChannels();
    },
    [activeIndex, channelsData, updateChannelDetail, mutateAudioChannels]
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

  const handleMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>, index: number) => {
      event.stopPropagation();
      setToolsAnchor(event.currentTarget);
      setActiveIndex(index);
    },
    []
  );

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
        <TableContainer
          sx={{
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              paddingBottom: '16px',
            }}
          >
            <TextField
              variant="outlined"
              placeholder="搜尋"
              sx={{
                width: '358px',
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
            <TableHead
              sx={{
                backgroundColor: '#F4F6F8',
                height: '56px',
              }}
            >
              <TableRow
                sx={{
                  height: '56px',
                  padding: '0px',
                }}
              >
                {/* Checkbox Column */}
                <TableCell
                  sx={{
                    width: '40px',
                    borderBottom: '1px dotted #ddd',
                    padding: '0px',
                  }}
                >
                  <Checkbox />
                </TableCell>

                {/* 姓名 */}
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: '14px',
                    borderBottom: '1px dotted #ddd',
                    color: '#212B36',
                    padding: '0px',
                  }}
                >
                  姓名
                </TableCell>

                {/* 性別 */}
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: '14px',
                    borderBottom: '1px solid #ddd',
                    color: '#212B36',
                    padding: '0px',
                  }}
                >
                  性別
                </TableCell>

                {/* 個案描述 */}
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: '14px',
                    borderBottom: '1px solid #ddd',
                    color: '#212B36',
                    padding: '0px 0px 0px 26px',
                  }}
                >
                  個案描述
                </TableCell>

                {/* 最熱銷評分 */}
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: '14px',
                    borderBottom: '1px solid #ddd',
                    color: '#212B36',
                    padding: '0px',
                  }}
                >
                  最熱銷評分
                </TableCell>

                {/* 收藏 (star) */}
                <TableCell
                  sx={{
                    width: '60px',
                    textAlign: 'center',
                    borderBottom: '1px solid #ddd',
                    padding: '0px',
                  }}
                >
                  {/* Empty header for star icon */}
                </TableCell>

                {/* Actions (ellipsis) */}
                <TableCell
                  sx={{
                    width: '40px',
                    textAlign: 'center',
                    borderBottom: '1px solid #ddd',
                    padding: '0px',
                  }}
                >
                  {/* Empty header for actions */}
                </TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {channelsData?.map((channel, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleRowClick(channel)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#fafafa' },
                    height: '68px',
                  }}
                >
                  <TableCell
                    sx={{
                      padding: '0px',
                      height: '68px',
                    }}
                  >
                    <Checkbox />
                  </TableCell>

                  {/* 姓名 */}
                  <TableCell
                    sx={{
                      fontFamily: 'DFPHeiBold-B5',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '24px',
                      letterSpacing: '0%',
                      color: '#212B36',
                      padding: '0px',
                      height: '68px',
                    }}
                  >
                    {/* Replace with your data field for "姓名" */}
                    {channel?.organizationChannelTitle ?? 'Allen'}
                  </TableCell>

                  {/* 性別 */}
                  <TableCell
                    sx={{
                      fontFamily: 'DFPHeiBold-B5',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '24px',
                      letterSpacing: '0%',
                      color: '#212B36',
                      padding: '0px',
                      height: '68px',
                    }}
                  >
                    男{/* Replace with your data field for "性別" */}
                    {/* {channel?.gender ?? '男'} */}
                  </TableCell>

                  {/* 個案描述 */}
                  <TableCell
                    sx={{
                      fontFamily: 'DFPHeiBold-B5',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '24px',
                      letterSpacing: '0%',
                      color: '#212B36',
                      padding: '0px 0px 0px 26px',
                      height: '68px',
                    }}
                  >
                    這是一個個案描述描述
                    {/* Replace with your data field for "傾聽結果" */}
                    {/* {channel?.listeningResult ?? '這是一個傾聽結果描述...'} */}
                  </TableCell>

                  {/* 最熱銷評分 */}
                  <TableCell
                    sx={{
                      fontFamily: 'DFPHeiBold-B5',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '24px',
                      letterSpacing: '0%',
                      color: '#212B36',
                      padding: '0px',
                      height: '68px',
                    }}
                  >
                    重點關注對象
                    {/* Replace with your data field for "最熱銷評分" */}
                    {/* {channel?.score ?? '直接被拒絕性命安全'} */}
                  </TableCell>

                  {/* 收藏 (star icon) */}
                  <TableCell
                    sx={{
                      textAlign: 'center',
                      padding: '0px',
                      height: '68px',
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
                        <StarRounded sx={{ color: '#FFB400' }} />
                      ) : (
                        <StarBorderRounded sx={{ color: '#637381' }} />
                      )}
                    </IconButton>
                  </TableCell>

                  {/* Actions (ellipsis or your EditableItem) */}
                  <TableCell
                    sx={{
                      textAlign: 'center',
                      padding: '0px',
                      height: '68px',
                    }}
                    onClick={(e) => e.stopPropagation()}
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
                      anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                      }}
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
            padding: 0,
            width: '100%',
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
          {/* Card list */}
          {channelsData?.map((channel: any, index: number) => (
            <Card
              key={index}
              sx={{
                mb: '16px',
                padding: '16px',
                display: 'flex',
                maxWidth: '100%',
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
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: '0 !important',
                  justifyContent: 'space-between',
                }}
              >
                {/* Top row: Title + 3-dot menu */}
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
                      fontSize: '20px',
                      fontStyle: 'normal',
                      lineHeight: 'normal',
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      fontFamily: 'DFPHeiBold-B5',
                      color: 'var(--Primary-Black, #212B36)',
                    }}
                  >
                    {channel?.organizationChannelTitle ?? 'Untitled'}
                  </Typography>
                  <EditableItem
                    key={channel.organizationChannelId}
                    index={index}
                    toolsAnchor={toolsAnchor}
                    activeIndex={activeIndex}
                    handleMenuOpen={handleMenuOpen}
                    setToolsAnchor={() => {}}
                    handleCloseToolsMenu={handleCloseToolsMenu}
                    handleOpenEditChannelDialog={handleOpenEditChannelDialog}
                    handleDeleteChannelOpenConfirmDialog={
                      handleDeleteChannelOpenConfirmDialog
                    }
                    anchorOrigin={{
                      vertical: 'center',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'center',
                      horizontal: 'center',
                    }}
                  />
                </Box>

                {/* Bottom row: star + date, and status icon */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Left side: star + date */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                        fontSize: '14px',
                        overflow: 'hidden',
                        lineHeight: '20px',
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

                  {/* Right side: status icon + status text */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {channel.organizationChannelTranscriptList[0]
                      ?.organizationChannelTranscriptStatus === 'COMPLETE' ? (
                      <CheckCircleRounded
                        sx={{ color: 'rgba(52, 199, 89, 1)' }}
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
                      // Default icon if no known status
                      <PendingActionsRounded
                        sx={{ color: 'rgba(33, 43, 54, 1)' }}
                      />
                    )}
                    <Typography
                      component="span"
                      sx={{
                        fontFamily: 'DFPHeiMedium-B5',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '20px',
                        letterSpacing: '0%',
                        overflow: 'hidden',
                        fontStyle: 'normal',
                        textOverflow: 'ellipsis',
                        marginLeft: '8px',
                        color: 'var(--Primary-Black, #212B36)',
                      }}
                    >
                      {channel.organizationChannelTranscriptList[0]
                        ?.organizationChannelTranscriptStatus === 'COMPLETE'
                        ? '完成'
                        : channel.organizationChannelTranscriptList[0]
                            ?.organizationChannelTranscriptStatus ===
                          'PROCESSING'
                        ? '上傳中...'
                        : channel.organizationChannelTranscriptList[0]
                            ?.organizationChannelTranscriptStatus === 'PENDING'
                        ? '正在摘要...'
                        : '未知狀態'}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Dialogs */}
      <UploadDialog
        open={openUpload}
        onClose={handleCloseUploadDialog}
        handleUploadFile={function (
          file: File,
          fileInfo: {
            organizationChannelTitle: string;
            organizationChannelCreateDate: string;
          }
        ): void {
          throw new Error('Function not implemented.');
        }}
      />
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

export default FavoriteFinancialQuickScreening;
