'use client';

import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  Suspense,
} from 'react';
import Header from '@/components/chat-page/components/Header';
import MainContent from '@/components/chat-page/components/MainContent';
import SwitchDialog from '@/components/dialogs/SwitchDialog';
import ToolbarDrawer from '@/components/toolbar-drawer-new/ToolbarDrawer';
import { Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import ChannelContentContext from '../../components/channel-context-provider/ChannelContentContext';
import { useSearchParams, useRouter } from 'next/navigation';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import apis from '@/utils/hooks/apis/apis';
import DataSourceDialog from '@/components/chat-page/components/chatDataStore';
import { useChatChannels } from '@/utils/hooks/useChatChannels';
import LoginDialog from '@/components/dialogs/LoginDialog';
import SignupDialog from '@/components/dialogs/SignupDialog';

export default function ChatHomePage() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <ClientContent />
    </Suspense>
  );
}

function ClientContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const organizationChannelId = searchParams.get('organizationChannelId') || '';
  const {
    selectedChannel,
    setSelectedChannelId,
    advisorType,
    setSelectedChannel,
    setChatResponses,
    setIsInteractingInChat,
  } = useContext(ChannelContentContext);

  const { excute: getChannelDetail } = useAxiosApi(apis.getChannelDetail);

  const [openDataSource, setOpenDataSource] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(!isMobile);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const { data: chatsData } = useChatChannels({
    organizationId: '4aba77788ae94eca8d6ff330506af944',
  });

  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleConfirm = useCallback(() => setIsOpen(false), []);

  const fetchChannelDetail = useCallback(
    async (organizationChannelId: string) => {
      try {
        const res = await getChannelDetail({
          organizationId: '4aba77788ae94eca8d6ff330506af944',
          organizationChannelId,
        });
        setSelectedChannel(res.data);
        setSelectedChannelId(organizationChannelId);
      } catch (error) {
        console.error('Failed to fetch channel details:', error);
      }
    },
    [getChannelDetail, setSelectedChannel, setSelectedChannelId]
  );

  const handleLoginDialogClose = () => {
    setIsLoginOpen(false);
    router.replace('/');
  };

  useEffect(() => {
    if (selectedChannel && organizationChannelId) {
      setSelectedChannelId(selectedChannel.organizationChannelId);
    } else if (!organizationChannelId) {
      setSelectedChannel(undefined);
      setSelectedChannelId(undefined);
      setChatResponses([]);
      setIsInteractingInChat(false);
      return;
    } else {
      fetchChannelDetail(organizationChannelId);
    }
  }, [
    selectedChannel,
    organizationChannelId,
    setSelectedChannelId,
    fetchChannelDetail,
    setChatResponses,
    setIsInteractingInChat,
    setSelectedChannel,
  ]);

  useEffect(() => {
    setIsOpenDrawer(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (searchParams.get('login') === 'true') {
      setIsLoginOpen(true);
    }
  }, [searchParams]);

  return (
    <ToolbarDrawer
      open={isOpenDrawer}
      setIsOpenDrawer={setIsOpenDrawer}
      openDataSource={openDataSource}
      setIsLoginOpen={setIsLoginOpen}
    >
      <Box
        sx={{
          display: 'flex',
          borderRadius: '8px',
          flexDirection: 'column',
          backgroundColor: '#FFF',
          justifyContent: isMobile
            ? chatsData?.length
              ? 'flex-end'
              : 'center'
            : 'center',
          height: isMobile ? '100vh' : 'calc(100vh - 32px)',
        }}
      >
        <Header
          isChat
          open={isOpenDrawer}
          advisor={advisorType}
          openDataSource={openDataSource}
          setIsOpenDrawer={setIsOpenDrawer}
          setOpenDataSource={setOpenDataSource}
        />
        <MainContent chatsData={chatsData} setIsLoginOpen={setIsLoginOpen} />
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
      <LoginDialog
        open={isLoginOpen}
        setIsSignupOpen={setIsSignupOpen}
        onClose={handleLoginDialogClose}
      />
      <SignupDialog
        open={isSignupOpen}
        setIsLoginOpen={setIsLoginOpen}
        onClose={() => setIsSignupOpen(false)}
      />
    </ToolbarDrawer>
  );
}
