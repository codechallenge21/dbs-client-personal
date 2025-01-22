import {
  OrganizationChannel,
  OrganizationChannelMessage,
} from '@/interfaces/entities';
import { Box, Container, useTheme, useMediaQuery } from '@mui/material';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import imagePerview from '@/assets/Images/Image Icon.svg';
import React from 'react';

export interface ChannelMessagePanelProps {
  channel?: OrganizationChannel;
  chatResponses: OrganizationChannelMessage[];
}

const ChannelMessagePanel: FC<ChannelMessagePanelProps> = ({
  channel,
  chatResponses,
}) => {
  console.log('chatResponses', chatResponses);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        marginTop: 10,
        height: '65vh',
        overflow: 'auto !important',
        alignItems: 'center',
        justifyContent: 'center',
        '&::-webkit-scrollbar': {
          width: '5px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#c1c1c1',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#a8a8a8',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',
          borderRadius: '4px',
        },
      }}
    >
      <Box
        sx={{
          maxWidth: '760px',
          minWidth: !isMobile ? '760px' : '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {channel?.organizationChannelMessageList.map(
          (message, messageIndex) => (
            <Box
              key={`channelMessage-${messageIndex}`}
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
          )
        )}
        {chatResponses?.map((message, messageIndex) => (
          <React.Fragment key={`chatResponse-${messageIndex}`}>
            {(message.organizationChannelFiles?.length ?? 0) > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexWrap: 'wrap',
                  padding: '8px',
                }}
              >
                {message.organizationChannelFiles?.map((file, fileIndex) => (
                  <Box
                    key={`file-${messageIndex}-${fileIndex}`}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      position: 'relative',
                      width: 80,
                      paddingTop: '10px',
                    }}
                  >
                    <Image
                      src={file.preview ?? imagePerview}
                      alt={file.file.name}
                      width={48}
                      height={48}
                      style={{
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                    <Box
                      sx={{
                        mt: 1,
                        fontSize: '12px',
                        wordBreak: 'break-word',
                        textAlign: 'center',
                      }}
                    >
                      {file.file.name}
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
            <Box
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
                      backgroundColor: '#E8E8E8',
                      borderRadius: 5,
                      alignContent: 'left',
                      alignItems: 'left',
                      justifyContent: 'center',
                      '& p': { marginBottom: 0 },
                    }),
              }}
            >
              <ReactMarkdown>
                {message.organizationChannelMessageContent}
              </ReactMarkdown>
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </Container>
  );
};

export default ChannelMessagePanel;
