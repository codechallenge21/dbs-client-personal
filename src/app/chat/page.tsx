'use client';

import DataSourceDialog from '@/components/chat-page/components/chatDataStore';
import Header from '@/components/chat-page/components/Header';
import MainContent from '@/components/chat-page/components/MainContent';
import LoginDialog from '@/components/dialogs/LoginDialog';
import SignupDialog from '@/components/dialogs/SignupDialog';
import SwitchDialog from '@/components/dialogs/SwitchDialog';
import ToolbarDrawer from '@/components/toolbar-drawer-new/ToolbarDrawer';
import apis from '@/utils/hooks/apis/apis';
import { useChatChannels } from '@/utils/hooks/useChatChannels';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import { Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import {
    Suspense,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import ChannelContentContext from '../../components/channel-context-provider/ChannelContentContext';

export default function ChatHomePage() {
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

  const organizationChannelId = searchParams.get('organizationChannelId') ?? '';
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
    organizationId: 'yMJHyi6R1CB9whpdNvtA',
  });

  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleConfirm = useCallback(() => setIsOpen(false), []);

  const fetchChannelDetail = useCallback(
    async (organizationChannelId: string) => {
      try {
        const res = await getChannelDetail({
          organizationId: 'yMJHyi6R1CB9whpdNvtA',
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

  return (
    <ToolbarDrawer
      open={isOpenDrawer}
      setIsOpenDrawer={setIsOpenDrawer}
      openDataSource={openDataSource}
    >
      <Box
        sx={{
          display: 'flex',
          borderRadius: '8px',
          flexDirection: 'column',
          backgroundColor: '#FFF',
          justifyContent: isMobile && chatsData?.length ? 'flex-end' : 'center',
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
        onClose={() => setIsLoginOpen(false)}
      />
      <SignupDialog
        open={isSignupOpen}
        setIsLoginOpen={setIsLoginOpen}
        onClose={() => setIsSignupOpen(false)}
      />
    </ToolbarDrawer>
  );
}
