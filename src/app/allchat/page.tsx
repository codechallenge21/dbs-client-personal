'use client';
import { useEffect, useState } from 'react';
import ChannelSearch from '../../components/view-all-history/ViewAllHistory';
import Header from '../../components/all-chat-header/Header';
import SwitchDialog from '../../components/dialogs/SwitchDialog';
import ToolbarDrawer from '@/components/toolbar-drawer-new/ToolbarDrawer';
import { Box, useMediaQuery, useTheme } from '@mui/material';

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(
    isMobile ? false : true
  );

  const handleClose = () => setIsOpen(false);

  const handleConfirm = () => {
    setIsOpen(false);
  };

  const toggleDrawer = (newOpen: boolean) => {
    setIsOpenDrawer(newOpen);
  };

  useEffect(() => {
    toggleDrawer(isMobile ? false : true);
  }, [isMobile]);

  return (
    <ToolbarDrawer
      open={isOpenDrawer}
      setIsOpenDrawer={toggleDrawer}
      openDataSource
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: isMobile ? '100vh' : 'calc(100vh - 32px)',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
        }}
      >
        <Header />
        <ChannelSearch />
        <SwitchDialog
          open={isOpen}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      </Box>
    </ToolbarDrawer>
  );
}
