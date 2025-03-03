'use client';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Tab,
  Tabs,
  useTheme,
  Typography,
  IconButton,
  useMediaQuery,
  TableContainer,
  // CircularProgress,
} from '@mui/material';
import { MenuRounded } from '@mui/icons-material';
import apis from '@/utils/hooks/apis/apis';
import EditDialog from '@/components/dialogs/EditDialog';
import UploadDialog from '@/components/uploadDialog/uploadDialog';
// import UploadDialog from '@/components/uploadDialog/page';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import DeleteDialog from '@/components/dialogs/DeleteDialog';
import { useAudioChannels } from '@/utils/hooks/useAudioChannels';
import ToolbarDrawer from '@/components/toolbar-drawer-new/ToolbarDrawer';
import FavoriteSolution from '@/components/favorite/favoriteSolution';
import FavoriteFinancialScreening from '@/components/favorite/favoriteFinancialScreening';
import FavoriteFinancialQuickScreening from '@/components/favorite/favoriteFinancialQuickScreen';

const FavouriteList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [tabValue, setTabValue] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [, setToolsAnchor] = useState<null | HTMLElement>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
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

  const handleCloseEditDialog = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setIsEditDialogOpen(false);
    setToolsAnchor(null);
  }, []);

  const handleCloseUploadDialog = () => {
    setOpenUpload(false);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <ToolbarDrawer open={isOpenDrawer} setIsOpenDrawer={setIsOpenDrawer}>
        {!isMobile && (
          <Box
            sx={{
              minHeight: '100vh',
              background: 'var(--Primary-, #EBE3DD)',
            }}
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
                  label="解決麻煩事"
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
                  label="語音轉文字"
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
                  label="財務快篩"
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
                <TableContainer>
                  {tabValue === 0 && <FavoriteSolution />}
                  {tabValue === 1 && <FavoriteFinancialScreening />}
                  {tabValue === 2 && <FavoriteFinancialQuickScreening />}
                </TableContainer>
              </Box>
            </>
          </Box>
        )}
        {isMobile && (
          <Box
            sx={{
              padding: 1,
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              background: 'var(--Primary-White, #FFF)',
            }}
          >
            {/* Header section */}
            <Box
              sx={{
                flexShrink: 0,
                height: '64px',
                display: 'flex',
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
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px 0px 4px 8px',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '16px',
                  letterSpacing: '0%',
                }}
              >
                我的收藏
              </Typography>
            </Box>

            {/* Tabs section */}
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                mb: 2,
                flexShrink: 0,
              }}
              TabIndicatorProps={{
                style: {
                  backgroundColor: '#212B36',
                },
              }}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab
                label="解決麻煩事"
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
                label="語音轉文字"
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
                label="財務快篩"
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
            {/* Content section */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <TableContainer
                sx={{
                  height: '100%',
                  overflow: 'auto',
                }}
              >
                {tabValue === 0 && <FavoriteSolution />}
                {tabValue === 1 && <FavoriteFinancialScreening />}
                {tabValue === 2 && <FavoriteFinancialQuickScreening />}
              </TableContainer>
            </Box>
          </Box>
        )}

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
      </ToolbarDrawer>
    </>
  );
};

export default FavouriteList;
