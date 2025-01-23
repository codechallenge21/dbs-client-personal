'use client';
import { Suspense, useCallback, useContext, useEffect, useState } from 'react';
import Header from '@/components/chat-page/components/Header';
import MainContent from '@/components/chat-page/components/MainContent';
import SwitchDialog from '@/components/dialogs/SwitchDialog';
import ToolbarDrawer from '@/components/toolbar-drawer-new/ToolbarDrawer';
import { Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import ChannelContentContext from '@/components/channel-context-provider/ChannelContentContext';
import { useSearchParams } from 'next/navigation';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import apis from '@/utils/hooks/apis/apis';
import DataSourceDialog from '@/components/chat-page/components/chatDataStore';

export default function Home() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <ClientContent />
    </Suspense>
  );
}

function ClientContent() {
  const searchParams = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const organizationChannelId = searchParams.get('organizationChannelId') || '';
  const {
    selectedChannel,
    setSelectedChannelId,
    advisorType,
    setSelectedChannel,
  } = useContext(ChannelContentContext);
  const { excute: getChannelDetail } = useAxiosApi(apis.getChannelDetail);

  const [openDataSource, setOpenDataSource] = useState(false);

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

  const fetchChannelDetail = useCallback(
    async (organizationChannelId: string) => {
      if (!organizationChannelId) {
        setSelectedChannel(undefined);
        setSelectedChannelId(undefined);
        return;
      }
      const res = await getChannelDetail({
        organizationId: '4aba77788ae94eca8d6ff330506af944',
        organizationChannelId,
      });
      console.log('22222');
      setSelectedChannel(res.data);
      setSelectedChannelId(organizationChannelId);
    },
    [getChannelDetail, setSelectedChannel, setSelectedChannelId]
  );

  useEffect(() => {
    if (selectedChannel) {
      setSelectedChannelId(selectedChannel?.organizationChannelId);
    } else {
      fetchChannelDetail(organizationChannelId);
    }
  }, [
    selectedChannel,
    setSelectedChannelId,
    fetchChannelDetail,
    organizationChannelId,
  ]);

  useEffect(() => {
    toggleDrawer(isMobile ? false : true);
  }, [isMobile]);

  return (
    <ToolbarDrawer
      open={isOpenDrawer}
      toggleDrawer={toggleDrawer}
      openDataSource={openDataSource}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 32px)',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          overflowY: isMobile ? 'auto' : 'unset',
        }}
      >
        <Header
          isChat
          toggleDrawer={toggleDrawer}
          open={isOpenDrawer}
          advisor={advisorType}
          openDataSource={openDataSource}
          setOpenDataSource={setOpenDataSource}
        />
        <Box
          sx={{
            marginTop: isMobile ? '60px' : '8px',
          }}
        ></Box>
        <MainContent />
        <SwitchDialog
          open={isOpen}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
        <DataSourceDialog
          open={openDataSource}
          onClose={() => setOpenDataSource(false)}
        />
      </Box>
    </ToolbarDrawer>
  );
}
