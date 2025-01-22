import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Skeleton,
} from '@mui/material';
import TextInput from './TextInput';
import { useContext } from 'react';
import ChannelContentContext from './ChannelContentContext';
import ChannelMessagePanel from './ChannelMessagePanel';
import Suggestions from './Suggestions';
import ViewChats from './viewChats';
import { useRouter } from 'next/navigation';
import HistoryChats from './HistoryChats';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import apis from '@/utils/hooks/apis/apis';
import { useChatChannels } from '@/utils/hooks/useChatChannels';

export default function MainContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const {
    selectedChannelId,
    selectedChannel,
    chatResponses,
    isInteractingInChat,
  } = useContext(ChannelContentContext);
  const { excute: submitUserInputs, isLoading: isInteracting } = useAxiosApi(
    apis.submitUserInputs
  );

  const { data: chatsData } = useChatChannels({
    organizationId: '4aba77788ae94eca8d6ff330506af944',
  });

  console.log('chatsData', chatsData);

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
    {
      id: 6,
      title: 'Employment Assistance Consultant',
      description: 'Supports your job search and career planning.',
    },
    {
      id: 7,
      title: 'Financial Case Consultant',
      description: 'Offers savings, investment, and debt advice.',
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
          justifyContent: isMobile ? 'flex-end' : 'center',
        }}
      >
        <ChannelMessagePanel
          channel={selectedChannel}
          chatResponses={chatResponses}
        />
        {isInteractingInChat && (
          <Skeleton
            variant="text"
            sx={{
              width: '100%',
              fontSize: '32px',
              maxWidth: isMobile ? '50%' : '760px',
            }}
          />
        )}
        <TextInput
          submitUserInputs={submitUserInputs}
          isInteracting={isInteracting}
        />
      </Box>
    );

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isMobile ? 'flex-end' : 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: '24px',
      }}
    >
      {isMobile ? (
        <>
          {isInteractingInChat && (
            <Skeleton
              variant="text"
              sx={{
                width: '100%',
                fontSize: '32px',
                maxWidth: isMobile ? '50%' : '760px',
              }}
            />
          )}
          {!isInteractingInChat && (
            <>
              <Typography
                sx={{
                  color: '#000',
                  fontFamily: 'DFPHeiBold-B5',
                  fontSize: '32px',
                  fontWeight: '400',
                }}
              >
                嗨！
              </Typography>
              <Typography
                sx={{
                  color: '#000',
                  fontFamily: 'DFPHeiBold-B5',
                  fontSize: '32px',
                  fontWeight: '400',
                  mb: isMobile ? '' : '319px',
                }}
              >
                我能為你做些什麼？
              </Typography>
            </>
          )}
        </>
      ) : (
        <>
          {isInteractingInChat && (
            <Skeleton
              variant="text"
              sx={{
                fontSize: '32px',
                width: isMobile ? '50%' : '760px',
                mb: isMobile ? 50 : 5,
              }}
            />
          )}
          {!isInteractingInChat && (
            <Typography
              sx={{
                color: '#000',
                fontFamily: 'DFPHeiBold-B5',
                fontSize: '32px',
                fontWeight: '400',
                mb: '24px',
              }}
            >
              嗨！我能為你做些什麼？
            </Typography>
          )}
        </>
      )}
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
      <Box sx={{ marginTop: '40px', width: '100%', maxWidth: '760px' }}>
        <ViewChats
          onClick={() => {
            router.push('/allchat');
          }}
        />
      </Box>
      <Box sx={{ marginTop: '12px', width: '100%', maxWidth: '780px' }}>
        <HistoryChats chats={chatsData || []} />
      </Box>
    </Box>
  );
}
