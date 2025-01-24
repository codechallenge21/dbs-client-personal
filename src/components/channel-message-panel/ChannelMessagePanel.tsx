'use client';

import type {
  OrganizationChannel,
  OrganizationChannelMessage,
} from '@/interfaces/entities';
import { Box, Container, useTheme, useMediaQuery, Avatar } from '@mui/material';
import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import imagePreview from '@/assets/Images/Image Icon.svg';
import React from 'react';
import {
  PermIdentityRounded,
  LibraryBooksRounded,
  ContentCopy,
  ThumbUp,
  ThumbDown,
} from '@mui/icons-material';

export interface ChannelMessagePanelProps {
  channel?: OrganizationChannel;
  chatResponses: OrganizationChannelMessage[];
}

const ChannelMessagePanel: FC<ChannelMessagePanelProps> = ({
  channel,
  chatResponses,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        marginTop: isMobile ? '16px' : '0px',
        mb: '16px',
        height: isMobile ? '65vh' : 'calc(100vh - 32px)',
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
          height: 'calc(100% - 81px)',
          display: 'flex',
          pt: '16px',
          flexDirection: 'column',
        }}
      >
        {channel?.organizationChannelMessageList.map(
          (message, messageIndex) => (
            <Box
              key={`channelMessage-${messageIndex}`}
              sx={{
                width: 'fit-content',
                marginLeft: 'auto',
                marginBottom: 2,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                flexDirection: 'row',
                backgroundColor:
                  message.organizationChannelMessageType === 'AI'
                    ? 'transparent'
                    : 'var(--Secondary-Lite-Gray, #F5F5F5)',
                borderRadius:
                  message.organizationChannelMessageType === 'AI'
                    ? 'none'
                    : '12px',
              }}
            >
              {message.organizationChannelMessageType !== 'AI' ? (
                <Avatar
                  sx={{
                    bgcolor: '#6B5D52',
                    ml: '20px',
                    mt: '10px',
                    width: 36,
                    height: 36,
                  }}
                >
                  <PermIdentityRounded sx={{ color: 'white' }} />
                </Avatar>
              ) : (
                <Box sx={{ width: 36, height: 36 }} /> // Placeholder for spacing
              )}
              <Box
                sx={{
                  flex: 1,
                  py: 2,
                  pr: 2,
                  width: '100%',
                  maxWidth: '710px',
                  color: '#212B36',
                  wordBreak: 'break-word',
                  '& p': {
                    marginBottom:
                      message.organizationChannelMessageType === 'AI' ? 1 : 0,
                  },
                }}
              >
                {message.organizationChannelMessageType === 'AI' && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      mb: 1,
                      px: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        cursor: 'pointer',
                      }}
                    >
                      <LibraryBooksRounded sx={{ fontSize: 20 }} />
                      回覆
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        cursor: 'pointer',
                      }}
                    >
                      <ContentCopy sx={{ fontSize: 20 }} />
                      複製
                    </Box>
                  </Box>
                )}
                <ReactMarkdown>
                  {message.organizationChannelMessageContent}
                </ReactMarkdown>
                {message.organizationChannelMessageType === 'AI' && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    <ThumbUp
                      sx={{
                        fontSize: 20,
                        cursor: 'pointer',
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    />
                    <ThumbDown
                      sx={{
                        fontSize: 20,
                        cursor: 'pointer',
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    />
                  </Box>
                )}
              </Box>
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
                      src={file.preview ?? imagePreview}
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
            {message.organizationChannelMessageType === 'AI' && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  mb: 1,
                  px: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    cursor: 'pointer',
                  }}
                >
                  <LibraryBooksRounded sx={{ fontSize: 20 }} />
                  回覆
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    cursor: 'pointer',
                  }}
                >
                  <ContentCopy sx={{ fontSize: 20 }} />
                  複製
                </Box>
              </Box>
            )}
            <Box
              sx={{
                width:
                  message.organizationChannelMessageType === 'AI'
                    ? '100%'
                    : 'fit-content',
                marginLeft:
                  message.organizationChannelMessageType === 'AI'
                    ? '0'
                    : 'auto',
                marginBottom: 2,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                mt:
                  message.organizationChannelMessageType !== 'AI' ? '20px' : 0,
                flexDirection: 'row',
                backgroundColor:
                  message.organizationChannelMessageType === 'AI'
                    ? 'transparent'
                    : 'var(--Secondary-Lite-Gray, #F5F5F5)',
                borderRadius:
                  message.organizationChannelMessageType === 'AI'
                    ? 'none'
                    : '12px',
              }}
            >
              {message.organizationChannelMessageType !== 'AI' ? (
                <Avatar
                  sx={{
                    bgcolor: '#6B5D52',
                    ml: '20px',
                    mt: '10px',
                    width: 36,
                    height: 36,
                  }}
                >
                  <PermIdentityRounded sx={{ color: 'white' }} />
                </Avatar>
              ) : (
                <Box sx={{ width: 36, height: 36, ml: '20px', mt: '20px' }} /> // Placeholder for spacing
              )}
              <Box
                sx={{
                  flex: 1,
                  py: 2,
                  pr: 2,
                  maxWidth: '710px',
                  wordBreak: 'break-word',
                  '& p': {
                    marginBottom:
                      message.organizationChannelMessageType === 'AI' ? 1 : 0,
                  },
                }}
              >
                <ReactMarkdown>
                  {message.organizationChannelMessageContent}
                </ReactMarkdown>
                {message.organizationChannelMessageType === 'AI' && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    <ThumbUp
                      sx={{
                        fontSize: 20,
                        cursor: 'pointer',
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    />
                    <ThumbDown
                      sx={{
                        fontSize: 20,
                        cursor: 'pointer',
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </Container>
  );
};

export default ChannelMessagePanel;
