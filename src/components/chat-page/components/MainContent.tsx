import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import TextInput from './TextInput';
import { useContext, useEffect, useRef } from 'react';
import ChannelContentContext from '../../channel-context-provider/ChannelContentContext';
import ChannelMessagePanel from '../../channel-message-panel/ChannelMessagePanel';
import Suggestions from './Suggestions';
import ViewChats from './viewChats';
import { useRouter } from 'next/navigation';
import HistoryChats from './HistoryChats';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import apis from '@/utils/hooks/apis/apis';
import {
  OrganizationChannel,
  OrganizationChannelData,
} from '@/interfaces/entities';

interface MainContentProps {
  chatsData?: OrganizationChannel[];
  setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainContent: React.FC<MainContentProps> = ({
  chatsData,
  setIsLoginOpen,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const {
    selectedChannelId,
    selectedChannel,
    chatResponses,
    setSelectedChannel,
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

  const SuggestionsData = [
    {
      id: 1,
      title: 'Know-it-all',
      description: 'Provides coping strategies and resource links.',
    },
    {
      id: 2,
      title: 'Debt Case Consultant',
      description:
        'Offers debt management and repayment advice to help alleviate financial stress.',
    },
    {
      id: 3,
      title: 'Accident Case Consultant',
      description:
        'Quickly provides emergency strategies and risk assessments.',
    },
    {
      id: 4,
      title: 'Fraud Case Consultant',
      description:
        'Quickly identifies fraud risks, offering advice and follow-up action guidance.',
    },
    {
      id: 5,
      title: 'Medical Case Consultant',
      description:
        'Provides you with medical case coping strategies and resource links.',
    },
  ];

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
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '22px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#888',
                borderRadius: '5px',
                border: '3px solid transparent',
                backgroundClip: 'content-box',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#555',
              },
            }}
          >
            <ChannelMessagePanel
              channel={selectedChannel}
              chatResponses={chatResponses}
            />
          </Box>
          <TextInput
            from={'mainContent'}
            submitUserInputs={submitUserInputs}
            isInteracting={isInteracting}
          />
        </Box>
      </Box>
    );
  }

  const paddingTop = (() => {
    if (isMobile) {
      if (chatsData && chatsData.length > 0) {
        return '30vh';
      } else {
        return '10vh';
      }
    }
    return '0vh';
  })();

  return (
    <Box
      sx={{
        px: '16px',
        display: 'flex',
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        minHeight: 0, // critical so that overflow can happen
        overflow: 'auto',
        justifyContent: 'center',
        pt: paddingTop,
      }}
    >
      <Typography
        sx={{
          mb: '24px',
          color: '#000',
          fontSize: '32px',
          fontWeight: '400',
          overflow: 'visible',
          fontFamily: 'DFPHeiBold-B5',
          textAlign: 'center',
        }}
      >
        嗨！我能為您做些什麼？
      </Typography>
      <TextInput
        submitUserInputs={submitUserInputs}
        isInteracting={isInteracting}
        setIsLoginOpen={setIsLoginOpen}
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
        }}
      >
        {SuggestionsData.map((suggestion) => (
          <Suggestions key={suggestion.id} title={suggestion.title} />
        ))}
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
