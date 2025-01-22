'use client';
import { useContext, useEffect, useState } from 'react';
import Header from '@/app/chat/components/Header';
import MainContent from '@/app/chat/components/MainContent';
import SwitchDialog from '@/app/chat/components/SwitchDialog';
import ToolbarDrawer from '@/components/toolbar-drawer-new/ToolbarDrawer';
import { Box } from '@mui/material';
import ChannelContentContext from './components/ChannelContentContext';

export default function Home() {
  const { selectedChannel, setSelectedChannelId, advisorType } = useContext(
    ChannelContentContext
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(true);

  const handleClose = () => setIsOpen(false);

  const handleConfirm = () => {
    setIsOpen(false);
  };

  const toggleDrawer = (newOpen: boolean) => {
    setIsOpenDrawer(newOpen);
  };

  console.log('selected', selectedChannel);
  console.log('advisorType', advisorType);

  useEffect(() => {
    if (selectedChannel)
      setSelectedChannelId(selectedChannel?.organizationChannelId);
    else setSelectedChannelId(undefined);
  }, [selectedChannel, setSelectedChannelId]);

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
        <Header
          isChat
          toggleDrawer={toggleDrawer}
          open={isOpenDrawer}
          advisor={advisorType}
        />
        <MainContent />
        <SwitchDialog
          open={isOpen}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      </Box>
    </ToolbarDrawer>
  );
}
