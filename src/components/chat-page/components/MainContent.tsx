import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import TextInput from './TextInput';
import { useContext } from 'react';
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

  if (selectedChannel || selectedChannelId || chatResponses.length)
    return (
      <Box
        sx={{
          maxHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pb: '16px',
          px: '32px',
          justifyContent: isMobile ? 'flex-end' : 'center',
        }}
      >
        <ChannelMessagePanel
          channel={selectedChannel}
          chatResponses={chatResponses}
        />
        {/* {isInteractingInChat && <InformationPage />} */}
        <TextInput
          submitUserInputs={submitUserInputs}
          isInteracting={isInteracting}
        />
      </Box>
    );

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
        pt: isMobile
          ? chatsData?.length
            ? '50vh'
            : '10vh'
          : chatsData?.length
          ? '20vh'
          : '0vh',

        mt: '10px',
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
