'use client';
import { Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import Header from '../../components/all-chat-header/Header';
import SwitchDialog from '../../components/dialogs/SwitchDialog';
import ChannelSearch from '../../components/view-all-history/ViewAllHistory';

// Dynamically import ToolbarDrawer with SSR disabled to properly handle useSearchParams
const ToolbarDrawer = dynamic(
  () => import('@/components/toolbar-drawer-new/ToolbarDrawer'),
  { ssr: false }
);

// Create a client component that wraps the ChannelSearch component
function ChannelSearchWrapper() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <ChannelSearch />
    </Suspense>
  );
}

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(!isMobile);

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
    <Suspense fallback={<CircularProgress />}>
      <Suspense fallback={<CircularProgress />}>
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
            <ChannelSearchWrapper />
            <SwitchDialog
              open={isOpen}
              onClose={handleClose}
              onConfirm={handleConfirm}
            />
          </Box>
        </ToolbarDrawer>
      </Suspense>
    </Suspense>
  );
}
