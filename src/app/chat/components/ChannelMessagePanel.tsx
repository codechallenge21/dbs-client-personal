import {
  OrganizationChannel,
  OrganizationChannelMessage,
} from '@/interfaces/entities';
import { Box, Container } from '@mui/material';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';

export interface ChannelMessagePanelProps {
  channel?: OrganizationChannel;
  chatResponses: OrganizationChannelMessage[];
}

const ChannelMessagePanel: FC<ChannelMessagePanelProps> = ({
  channel,
  chatResponses,
}) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        marginTop: 10,
        height: '65vh',
        overflow: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: '760px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        {channel?.organizationChannelMessageList.map((message, index) => (
          <Box
            key={index}
            sx={{
              width: '100%',
              marginBottom: 2,
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              ...(message.organizationChannelMessageType === 'AI'
                ? { padding: 2, px: 0, '& p': { marginBottom: 1 } }
                : {
                    padding: 2,
                    width: 'auto',
                    maxWidth: '80%',
                    backgroundColor: '#E8E8E8',
                    borderRadius: 5,
                    alignContent: 'right',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    '& p': { marginBottom: 0 },
                  }),
            }}
          >
            <ReactMarkdown>
              {message.organizationChannelMessageContent}
            </ReactMarkdown>
          </Box>
        ))}
        {chatResponses?.map((message, index) => (
          <Box
            key={index}
            sx={{
              width: '100%',
              marginBottom: 2,
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              ...(message.organizationChannelMessageType === 'AI'
                ? { padding: 2, px: 0, '& p': { marginBottom: 1 } }
                : {
                    padding: 2,
                    width: 'auto',
                    maxWidth: '80%',
                    backgroundColor: '#E8E8E8',
                    borderRadius: 5,
                    alignContent: 'right',
                    alignItems: 'right',
                    justifyContent: 'flex-end',
                    '& p': { marginBottom: 0 },
                  }),
            }}
          >
            <ReactMarkdown>
              {message.organizationChannelMessageContent}
            </ReactMarkdown>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ChannelMessagePanel;
