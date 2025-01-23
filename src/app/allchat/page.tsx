'use client';
import { useState } from 'react';
import ChannelSearch from '../../components/view-all-history/ViewAllHistory';
import Header from '../../components/all-chat-header/Header';
import SwitchDialog from '../../components/dialogs/SwitchDialog';
import ToolbarDrawer from '@/components/toolbar-drawer-new/ToolbarDrawer';
import { Box } from '@mui/material';

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(true);

  const handleClose = () => setIsOpen(false);

  const handleConfirm = () => {
    setIsOpen(false);
  };

  const toggleDrawer = (newOpen: boolean) => {
    setIsOpenDrawer(newOpen);
  };

  return (
    <ToolbarDrawer open={isOpenDrawer} toggleDrawer={toggleDrawer}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 32px)',
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
