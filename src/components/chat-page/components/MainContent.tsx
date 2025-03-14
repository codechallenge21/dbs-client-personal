import ChannelContentContext from '@/context/ChannelContentContext';
import {
  OrganizationChannel,
  OrganizationChannelData,
} from '@/interfaces/entities';
import apis from '@/utils/hooks/apis/apis';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef } from 'react';
import ChannelMessagePanel from '../../channel-message-panel/ChannelMessagePanel';
import HistoryChats from './HistoryChats';
import TextInput from './TextInput';
import ViewChats from './viewChats';
import { customScrollbarStyle } from '@/components/toolbar-drawer-new/ToolbarDrawer';

interface MainContentProps {
  chatsData?: OrganizationChannel[];
}

const MainContent: React.FC<MainContentProps> = ({ chatsData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const {
    selectedChannelId,
    selectedChannel,
    chatResponses,
    setSelectedChannel,
    isInteractingInChat,
  } = useContext(ChannelContentContext);
  const { excute: submitUserInputs, isLoading: isInteracting } = useAxiosApi(
    apis.submitUserInputs
  );

  const moveToChannelDetail = (channel: OrganizationChannelData) => {
    setSelectedChannel(channel);
    const searchParams = new URLSearchParams({
      organizationChannelId: channel.organizationChannelId,
    });

    router.push(`/chat?${searchParams.toString()}`);
  };

  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [selectedChannel, chatResponses]);

  if (selectedChannel || selectedChannelId || chatResponses.length) {
    return (
      <Box
        sx={{
          maxHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pb: '16px',
          justifyContent: isMobile ? 'flex-end' : 'center',
          marginTop: '56px',
          width: '100%',
          borderLeft: '1px solid #F5F5F5',
        }}
      >
        <Box
          ref={boxRef}
          sx={{
            width: '100%',
            height: 'calc(100vh - 105px)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            paddingX: { xs: '16px', md: '24px' },
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              ...customScrollbarStyle,
            }}
          >
            <ChannelMessagePanel
              channel={selectedChannel}
              chatResponses={chatResponses}
              isInteractingInChat={isInteractingInChat}
            />
          </Box>
          <Box>
            <TextInput
              from={'mainContent'}
              submitUserInputs={submitUserInputs}
              isInteracting={isInteracting}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  const paddingTop = (() => {
    if (isMobile) {
      return chatsData && chatsData.length > 0 ? '40vh' : '10vh';
    }
    return chatsData && chatsData.length > 0 ? '15vh' : '0vh';
  })();

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        minHeight: 0,
        overflow: 'auto',
        justifyContent: 'center',
        pt: paddingTop,
        borderLeft: '1px solid #F5F5F5',
        px: { xs: '16px', md: '24px' },
      }}
    >
      <Typography
        sx={{
          mb: '24px',
          color: '#000',
          fontSize: '32px',
          fontWeight: '400',
          overflow: 'visible',
          fontFamily: 'var(--font-bold)',
          textAlign: 'center',
        }}
      >
        嗨！我能為您做些什麼？
      </Typography>
      <TextInput
        submitUserInputs={submitUserInputs}
        isInteracting={isInteracting}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: '24px',
          gap: '16px',
          flexWrap: 'wrap',
          maxWidth: '760px',
          width: '100%',
        }}
      >
        {/* {SuggestionsData.map((suggestion) => (
          <Suggestions key={suggestion.id} title={suggestion.title} />
        ))} */}
      </Box>
      <Box
        sx={{
          marginTop: isMobile ? '32px' : '40px',
          width: '100%',
          maxWidth: '760px',
        }}
      >
        <ViewChats
          onClick={() => {
            router.push('/allchat');
          }}
        />
      </Box>
      <Box sx={{ marginTop: '12px', width: '100%', maxWidth: '760px' }}>
        <HistoryChats
          chats={chatsData || []}
          moveToChannelDetail={moveToChannelDetail}
        />
      </Box>
    </Box>
  );
};

export default MainContent;
