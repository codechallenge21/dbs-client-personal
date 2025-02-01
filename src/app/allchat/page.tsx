'use client';
import { useEffect, useState, Suspense } from 'react';
import ChannelSearch from '../../components/view-all-history/ViewAllHistory';
import Header from '../../components/all-chat-header/Header';
import SwitchDialog from '../../components/dialogs/SwitchDialog';
import ToolbarDrawer from '@/components/toolbar-drawer-new/ToolbarDrawer';
import { Box, useMediaQuery, useTheme } from '@mui/material';

const LoadingComponent = () => {
  return <div>Loading...</div>;
};

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(
    !isMobile
  );

  const handleClose = () => setIsOpen(false);

  const handleConfirm = () => {
    setIsOpen(false);
  };

  const toggleDrawer = (newOpen: boolean) => {
    setIsOpenDrawer(newOpen);
  };

  useEffect(() => {
    toggleDrawer(!isMobile);
  }, [isMobile]);

  return (
    <Suspense fallback={<LoadingComponent />}>
      <ToolbarDrawer open={isOpenDrawer} setIsOpenDrawer={toggleDrawer}>
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
          <Suspense fallback={<LoadingComponent />}>
            <ChannelSearch />
          </Suspense>
          <SwitchDialog
            open={isOpen}
            onClose={handleClose}
            onConfirm={handleConfirm}
          />
        </Box>
      </ToolbarDrawer>
    </Suspense>
  );
}
