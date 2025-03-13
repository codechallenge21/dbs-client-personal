'use client';

import imagePreview from '@/assets/Images/Image Icon.svg';
import type {
  OrganizationChannel,
  OrganizationChannelMessage,
} from '@/interfaces/entities';
import {
  ContentCopyRounded,
  Done as DoneIcon,
  LibraryBooksRounded,
  PermIdentityRounded,
  ThumbDownOffAltRounded,
  ThumbUpAltRounded,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import React, { type FC, useEffect, useRef, useState } from 'react';
import MermaidMarkdown from '../MermaidChart/Mermaidmarkdown';
import NegativeFeedbackModal from '../dialogs/NegativeFeedbackModal';
import PositiveFeedbackModal from '../dialogs/PositiveFeedbackModal';
import CustomLoader from '../loader/loader';
import { customScrollbarStyle } from '../toolbar-drawer-new/ToolbarDrawer';

export interface ChannelMessagePanelProps {
  channel?: OrganizationChannel;
  chatResponses: OrganizationChannelMessage[];
  isInteractingInChat: boolean;
}

const ChannelMessagePanel: FC<ChannelMessagePanelProps> = ({
  channel,
  chatResponses,
  isInteractingInChat,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  
  // Track which message has modals open and its feedback status
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  const [feedbackMap, setFeedbackMap] = useState<Record<string, string>>({});
  const [openPositiveFeedbackModal, setOpenPositiveFeedbackModal] = useState(false);
  const [openNegativeFeedbackModal, setOpenNegativeFeedbackModal] = useState(false);

  const handlePostiveModalOpen = (messageId: string) => {
    setActiveMessageId(messageId);
    setOpenPositiveFeedbackModal(true);
  };
  
  const handleNegativeModalOpen = (messageId: string) => {
    setActiveMessageId(messageId);
    setOpenNegativeFeedbackModal(true);
  };

  const handleClose = () => {
    setOpenPositiveFeedbackModal(false);
    setOpenNegativeFeedbackModal(false);
    setActiveMessageId(null);
  };
  
  const updateMessageFeedback = (messageId: string, feedbackType: string) => {
    setFeedbackMap(prev => ({
      ...prev,
      [messageId]: feedbackType
    }));
  };

  // Automatically scroll to the bottom
  const scrollToBottom = () => {
    if (loaderRef.current) {
      loaderRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to the bottom when the chat content changes or the interaction state changes
  useEffect(() => {
    scrollToBottom();
  }, [chatResponses, isInteractingInChat]);

  const copyPrompt = (text: string, messageId: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedMessageId(messageId);
        setTimeout(() => {
          setCopiedMessageId(null);
        }, 1000);
      },
      (err) => {
        console.error('Failed to copy to clipboard', err);
      }
    );
  };

  const sortedData = channel?.organizationChannelMessageList.sort((a, b) => {
    const dateA = new Date(a.organizationChannelMessageCreateDate ?? '');
    const dateB = new Date(b.organizationChannelMessageCreateDate ?? '');

    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;

    // If the dates are the same, prioritize USER over AI
    if (
      a.organizationChannelMessageType === 'USER' &&
      b.organizationChannelMessageType === 'AI'
    )
      return -1;
    if (
      a.organizationChannelMessageType === 'AI' &&
      b.organizationChannelMessageType === 'USER'
    )
      return 1;

    return 0;
  });

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        marginTop: isMobile ? '16px' : '0px',
        mb: '16px',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: '760px',
          flexDirection: 'column',
          minWidth: isMobile ? '100%' : isTablet ? '350px' : '760px',
          overflowY: 'auto',
          overflowX: 'hidden', // prevent horizontal scroll
          height: '100%',
          ...customScrollbarStyle,
          // Firefox scrollbar styling
          scrollbarWidth: 'thick', // Increased scrollbar width
          scrollbarColor: '#888 #f1f1f1',
        }}
      >
        {sortedData?.map((message, messageIndex) => {
          // Get the feedback for this specific message
          const messageFeedback = message.organizationChannelMessageId ? 
            feedbackMap[message.organizationChannelMessageId] : undefined;
          
          return (
          <Box
            key={`channelMessage-${messageIndex}`}
            sx={{
              width:
                message.organizationChannelMessageType !== 'AI'
                  ? 'fit-content'
                  : '100%',
              marginLeft: 'auto',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '20px',
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
                width: { xs: '100%', sm: '100%' },
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
                    ml: { xs: '-25px', sm: '0px' }, // Shift to left by 10px on small screens
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    <LibraryBooksRounded sx={{ fontSize: 20 }} />
                    回覆
                  </Box>
                  <Tooltip
                    title={
                      copiedMessageId === message.organizationChannelMessageId
                        ? '已複製'
                        : '複製'
                    }
                    placement="top"
                    arrow
                  >
                    <IconButton
                      aria-label="copy"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        cursor: 'pointer',
                        padding: 0,
                      }}
                      onClick={() =>
                        copyPrompt(
                          message.organizationChannelMessageContent,
                          message.organizationChannelMessageId!
                        )
                      }
                    >
                      {copiedMessageId ===
                      message.organizationChannelMessageId ? (
                        <DoneIcon sx={{ color: '#212B36' }} />
                      ) : (
                        <ContentCopyRounded
                          sx={{ color: '#212B36', fontSize: 20 }}
                        />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
              <MermaidMarkdown
                chartData={message.organizationChannelMessageContent}
              />
              {message.organizationChannelMessageType === 'AI' && message.organizationChannelMessageId && (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: 0.5,
                      mt: 2,
                      ml: { xs: '-30px', sm: '-20px' },
                    }}
                  >
                    {/* Modified logic: Use messageFeedback specific to this message */}
                    <Tooltip title="回應良好" placement="top" arrow>
                      <IconButton
                        aria-label="Like"
                        onClick={() => handlePostiveModalOpen(message.organizationChannelMessageId!)}
                      >
                        {messageFeedback === 'POSITIVE' ? (
                          <ThumbUpAltRounded
                            sx={{
                              color: 'black',
                              fontSize: 20,
                            }}
                          />
                        ) : (
                          <ThumbDownOffAltRounded
                            sx={{
                              color: 'black',
                              transform: 'scale(-1, -1)',
                              fontSize: 20,
                            }}
                          />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="回應不佳" placement="top" arrow>
                      <IconButton
                        aria-label="Dislike"
                        onClick={() => handleNegativeModalOpen(message.organizationChannelMessageId!)}
                      >
                        {messageFeedback === 'NEGATIVE' ? (
                          <ThumbUpAltRounded
                            sx={{
                              color: 'black',
                              transform: 'scale(-1, -1)',
                              fontSize: 20,
                            }}
                          />
                        ) : (
                          <ThumbDownOffAltRounded
                            sx={{ color: 'black', fontSize: 20 }}
                          />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Box>
                  {activeMessageId === message.organizationChannelMessageId && (
                    <>
                      <PositiveFeedbackModal
                        open={openPositiveFeedbackModal}
                        onClose={handleClose}
                        setUserFeedback={() => updateMessageFeedback(message.organizationChannelMessageId!, 'POSITIVE')}
                        userChatMessage={message}
                      />
                      <NegativeFeedbackModal
                        open={openNegativeFeedbackModal}
                        onClose={handleClose}
                        setUserFeedback={() => updateMessageFeedback(message.organizationChannelMessageId!, 'NEGATIVE')}
                        userChatMessage={message}
                      />
                    </>
                  )}
                </>
              )}
            </Box>
          </Box>
        )})}
        {chatResponses?.map((message, messageIndex) => {
          const messageId = message.organizationChannelMessageId || `temp-${messageIndex}`;
          const messageFeedback = feedbackMap[messageId];
          
          return (
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
                <Tooltip
                  title={
                    copiedMessageId === messageId
                      ? '已複製'
                      : '複製'
                  }
                  placement="top"
                  arrow
                >
                  <IconButton
                    aria-label="copy"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      cursor: 'pointer',
                      padding: 0,
                    }}
                    onClick={() =>
                      copyPrompt(
                        message.organizationChannelMessageContent,
                        messageId
                      )
                    }
                  >
                    {copiedMessageId === messageId ? (
                      <DoneIcon sx={{ color: '#212B36' }} />
                    ) : (
                      <ContentCopyRounded
                        sx={{ color: '#212B36', fontSize: 20 }}
                      />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            <Box
              sx={{
                width: { xs: '100%', sm: 'fit-content' },
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
                <Box sx={{ width: 36, height: 36, ml: '20px', mt: '20px' }} />
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
                <MermaidMarkdown
                  chartData={message.organizationChannelMessageContent}
                />
                {message.organizationChannelMessageType === 'AI' && (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      {/* Modified logic: Use feedbackMap for this specific message */}
                      <Tooltip title="回應良好" placement="top" arrow>
                        <IconButton
                          aria-label="Like"
                          onClick={() => handlePostiveModalOpen(messageId)}
                        >
                          {messageFeedback === 'POSITIVE' ? (
                            <ThumbUpAltRounded
                              sx={{
                                color: 'black',
                                fontSize: 20,
                              }}
                            />
                          ) : (
                            <ThumbDownOffAltRounded
                              sx={{
                                color: 'black',
                                transform: 'scale(-1, -1)',
                                fontSize: 20,
                              }}
                            />
                          )}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="回應不佳" placement="top" arrow>
                        <IconButton
                          aria-label="Dislike"
                          onClick={() => handleNegativeModalOpen(messageId)}
                        >
                          {messageFeedback === 'NEGATIVE' ? (
                            <ThumbUpAltRounded
                              sx={{
                                color: 'black',
                                transform: 'scale(-1, -1)',
                                fontSize: 20,
                              }}
                            />
                          ) : (
                            <ThumbDownOffAltRounded
                              sx={{ color: 'black', fontSize: 20 }}
                            />
                          )}
                        </IconButton>
                      </Tooltip>
                    </Box>
                    {activeMessageId === messageId && (
                      <>
                        <PositiveFeedbackModal
                          open={openPositiveFeedbackModal}
                          onClose={handleClose}
                          setUserFeedback={() => updateMessageFeedback(messageId, 'POSITIVE')}
                          userChatMessage={message}
                        />
                        <NegativeFeedbackModal
                          open={openNegativeFeedbackModal}
                          onClose={handleClose}
                          setUserFeedback={() => updateMessageFeedback(messageId, 'NEGATIVE')}
                          userChatMessage={message}
                        />
                      </>
                    )}
                  </>
                )}
              </Box>
            </Box>
          </React.Fragment>
        )})}
        <div ref={messagesEndRef} /> {/* End of messages marker */}
      </Box>
      {isInteractingInChat && (
        <Box
          ref={loaderRef}
          sx={{
            ml: '30px',
            display: 'flex',
            alignItems: 'center', // Adjust alignment as needed
            justifyContent: 'flex-start',
            width: '100%',
            maxWidth: '760px',
          }}
        >
          <CustomLoader />
        </Box>
      )}
    </Container>
  );
};

export default ChannelMessagePanel;
