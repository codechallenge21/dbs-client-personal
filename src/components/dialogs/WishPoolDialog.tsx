import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Dialog,
  useTheme,
  useMediaQuery,
  DialogContent,
} from '@mui/material';
import {
  MicRounded,
  CloseRounded,
  PublicRounded,
  SearchRounded,
  PermIdentityRounded,
  ThumbDownOffAltRounded,
  LibraryBooksRounded,
  ContentCopyRounded,
  SendRounded,
  ThumbUpOffAlt,
  StopCircleRounded,
} from '@mui/icons-material';
import { useCallback, useContext, useState } from 'react';
import { OrganizationChannelMessage } from '@/interfaces/entities';
import CustomLoader from '../loader/loader';
import { SnackbarContext } from '@/context/SnackbarContext';

interface WishPoolDialogProps {
  open: boolean;
  onClose: (event: React.MouseEvent) => void;
}

const WishPoolDialog: React.FC<WishPoolDialogProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const { showSnackbar } = useContext(SnackbarContext);

  const [userInputValue, setUserInputValue] = useState('');
  const [isListening] = useState(false);
  const [chatResponses, setChatResponses] = useState<
    OrganizationChannelMessage[]
  >([]);
  const [isInteractingInChat, setIsInteractingInChat] = useState(false);
  const [isFetching, setIsFectching] = useState(false);

  const [showDummyResponse, setShowDummyResponse] = useState(false);

  const handleOnChangeUserInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // if (!requireAuth()) return;
      setUserInputValue(e.target.value);
    },
    []
  );

  const handleOnKeyDownUserInput = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        if (userInputValue.trim() !== '') {
          e.preventDefault();
          handleSubmitChatMessage();
        }
      }
    },
    [userInputValue]
  );

  const handleSubmitChatMessage = useCallback(() => {
    if (userInputValue.trim() !== '') {
      setChatResponses((prev) => [
        ...prev,
        {
          organizationChannelMessageContent: userInputValue,
          organizationChannelMessageType: 'USER',
        },
      ]);
      setIsFectching(true);
      setUserInputValue('');
      setIsInteractingInChat(true);
      setTimeout(() => {
        setIsInteractingInChat(false);
        setShowDummyResponse(true);
        setIsFectching(false);
      }, 2000);
    }
  }, [userInputValue]);

  return (
    <>
      {!false && (
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="wish-pool-dialog-title"
          fullWidth
          slotProps={{
            paper: {
              sx: {
                margin: '0px',
                width: '100%',
                maxWidth: isMobile ? '324px' : isTablet ? '550px' : '824px',
                borderRadius: '8px',
                paddingBottom: '16px',
                backgroundColor: '#FFFFFF',
                boxShadow: '-40px 40px 80px -8px #0000003D',
              },
            },
          }}
        >
          {/* {Header} */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'stretch',
              padding:
                isMobile || isTablet ? '8px 8px 8px 16px' : '8px 16px 8px 32px',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                height: '32px',
                fontWeight: 400,
                fontSize: '32px',
                color: '#212B36',
                lineHeight: '32px',
                letterSpacing: '0%',
                fontFamily: 'DFPHeiBold-B5',
              }}
            >
              許願池
            </Typography>

            <IconButton
              sx={{
                padding: '8px',
                borderRadius: '50px',
              }}
              onClick={onClose}
            >
              <CloseRounded
                sx={{ width: '32px', height: '32px', color: '#212B36' }}
              />
            </IconButton>
          </Box>
          {/* {Frame2} */}
          <DialogContent
            sx={{
              gap: '10px',
              display: 'flex',
              alignSelf: 'center',
              flexDirection: 'column',
              width: '100%',
              py: 0,
              px: isMobile || isTablet ? '16px' : '32px',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                gap: '20px',
                display: 'flex',
                paddingTop: '16px',
                height: '460px',
                overflowY: 'auto',
                flexDirection:
                  chatResponses.length > 1 ? 'column' : 'column-reverse',
                pr: '6px',
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  borderRadius: '10px',
                  background: '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '10px',
                  background: '#888',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#555',
                },
              }}
            >
              {chatResponses.length > 0 ? (
                chatResponses.map((chat, index) => (
                  // Response Box
                  <Box
                    key={index}
                    sx={{
                      gap: isMobile ? '24px' : '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Box
                        sx={{
                          gap: '16px',
                          width: 'fit-content',
                          display: 'flex',
                          padding: '16px',
                          borderRadius: '8px',
                          alignItems: 'center',
                          backgroundColor: '#F5F5F5',
                        }}
                      >
                        <PermIdentityRounded
                          sx={{
                            width: '36px',
                            height: '36px',
                            padding: '8px',
                            color: 'white',
                            borderRadius: '50px',
                            backgroundColor: '#5C443A',
                          }}
                        />
                        <Typography
                          sx={{
                            fontWeight: 400,
                            color: '#212B36',
                            fontSize: '16px',
                            lineHeight: '16px',
                            letterSpacing: '0%',
                            fontFamily: 'DFPHeiBold-B5',
                            wordBreak: 'break-word',
                          }}
                        >
                          {chat.organizationChannelMessageContent}
                        </Typography>
                      </Box>
                    </Box>
                    {isInteractingInChat && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center', // Adjust alignment as needed
                          // justifyContent: 'flex-start',
                          width: '100%',
                          maxWidth: '760px',
                          height: '48px',
                          pl: '4px',
                          willChange: 'transform',
                        }}
                      >
                        <CustomLoader />
                      </Box>
                    )}
                    {showDummyResponse && (
                      <Box
                        sx={{
                          gap: isMobile ? '24px' : '20px',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        {/* {Main Top Box} */}
                        <Box
                          sx={{
                            gap: isMobile ? '16px' : '12px',
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <Box
                            sx={{
                              gap: '12px',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <IconButton
                              sx={{
                                width: '24px',
                                height: '24px',
                                padding: '0px',
                              }}
                            >
                              <SearchRounded sx={{ color: '#212B36' }} />
                            </IconButton>
                            <Typography
                              sx={{
                                fontWeight: 400,
                                color: '#212B36',
                                fontSize: '24px',
                                lineHeight: '24px',
                                letterSpacing: '0%',
                                fontFamily: 'DFPHeiBold-B5',
                              }}
                            >
                              你可能在找
                            </Typography>
                          </Box>

                          {/* {Card Container Box} */}
                          <Box
                            sx={{
                              gap: '12px',
                              display: 'flex',
                              overflowX: 'auto',
                              height: '100px',
                              overflowY: 'hidden',
                              msOverflowStyle: 'none',
                              scrollbarWidth: 'none',
                              '&::-webkit-scrollbar': {
                                display: 'none',
                              },
                            }}
                          >
                            {['財務快篩', '活動1', '活動2', '查看更多 +4'].map(
                              (item, index) => (
                                <Card
                                  key={index}
                                  sx={{
                                    gap: '10px',
                                    width: '179.5px',
                                    height: '100px',
                                    borderRadius: '8px',
                                    flexShrink: 0,
                                  }}
                                >
                                  <CardContent
                                    sx={{
                                      gap: '8px',
                                      width: '181px',
                                      display: 'flex',
                                      height: '100px',
                                      padding: '16px',
                                      borderRadius: '8px',
                                      flexDirection: 'column',
                                      backgroundColor: '#EBE3DD',
                                      '&.MuiCardContent-root:last-child': {
                                        paddingBottom: '16px', // or whatever value you need
                                      },
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        width: '149px',
                                        height: '36px',
                                        fontWeight: 400,
                                        fontSize: '14px',
                                        color: '#212B36',
                                        lineHeight: '24px',
                                        letterSpacing: '0%',
                                        fontFamily: 'DFPHeiBold-B5',
                                      }}
                                    >
                                      {item}
                                    </Typography>
                                    <Button
                                      sx={{
                                        gap: '8px',
                                        width: '149px',
                                        height: '24px',
                                        padding: '0px',
                                        justifyContent: 'flex-start',
                                      }}
                                    >
                                      <PublicRounded
                                        sx={{ color: '#CC0000' }}
                                      />
                                      <Typography
                                        sx={{
                                          fontWeight: 400,
                                          fontSize: '14px',
                                          color: '#CC0000',
                                          lineHeight: '24px',
                                          letterSpacing: '0%',
                                          fontFamily: 'DFPHeiBold-B5',
                                        }}
                                      >
                                        URL
                                      </Typography>
                                    </Button>
                                  </CardContent>
                                </Card>
                              )
                            )}
                          </Box>
                        </Box>
                        {/* {Main Second Box} */}
                        <Box
                          sx={{
                            gap: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          {/* {Title Box} */}
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Box
                              sx={{
                                gap: '12px',
                                display: 'flex',
                              }}
                            >
                              <IconButton
                                sx={{
                                  width: '24px',
                                  height: '24px',
                                  padding: '0px',
                                }}
                              >
                                <LibraryBooksRounded
                                  sx={{
                                    width: '24px',
                                    height: '24px',
                                    color: '#212B36',
                                  }}
                                />
                              </IconButton>
                              <Typography
                                sx={{
                                  fontWeight: 400,
                                  fontSize: '24px',
                                  color: '#212B36',
                                  lineHeight: '24px',
                                  letterSpacing: '0%',
                                  fontFamily: 'DFPHeiBold-B5',
                                }}
                              >
                                回覆
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                gap: '8px',
                                display: 'flex',
                                paddingTop: '6px',
                                paddingLeft: '8px',
                                borderRadius: '8px',
                                paddingRight: '8px',
                                paddingBottom: '6px',
                              }}
                            >
                              <IconButton
                                sx={{
                                  width: '24px',
                                  height: '24px',
                                  padding: '0px',
                                }}
                              >
                                <ContentCopyRounded
                                  sx={{
                                    width: '20px',
                                    height: '20px',
                                    color: '#212B36',
                                  }}
                                />
                              </IconButton>
                              <Typography
                                sx={{
                                  width: '28px',
                                  fontWeight: 700,
                                  fontSize: '14px',
                                  color: '#212B36',
                                  lineHeight: '24px',
                                  textAlign: 'center',
                                  letterSpacing: '0px',
                                  fontFamily: 'Public Sans',
                                }}
                              >
                                複製
                              </Typography>
                            </Box>
                          </Box>
                          {/* {Description} */}
                          <Typography
                            sx={{
                              fontWeight: 400,
                              fontSize: '16px',
                              color: '#212B36',
                              lineHeight: '27px',
                              letterSpacing: '0%',
                              fontFamily: 'DFPHeiBold-B5',
                            }}
                          >
                            上面的內容是關於＂協助個案進行財務狀況分析＂你可能在找的內容，希望有幫到你。
                          </Typography>
                          {/* {Footer Box} */}
                          <Box
                            sx={{
                              gap: '8px',
                              display: 'flex',
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 400,
                                fontSize: '16px',
                                color: '#212B36',
                                lineHeight: '27px',
                                letterSpacing: '0%',
                                fontFamily: 'DFPHeiBold-B5',
                              }}
                            >
                              沒有你想要的內容?
                            </Typography>
                            <Button
                              sx={{
                                gap: '8px',
                                color: '#FFFFFF',
                                paddingTop: '4px',
                                paddingLeft: '8px',
                                borderRadius: '8px',
                                paddingRight: '8px',
                                paddingBottom: '4px',
                                background: '#5C443A',
                                fontWeight: 600,
                                fontSize: '16px',
                                fontFamily: 'DFPHeiBold-B5',
                                lineHeight: 'normal',
                              }}
                              onClick={() =>
                                showSnackbar('許願成功', 'success')
                              }
                            >
                              送出願望
                            </Button>
                          </Box>
                          {/* {Response Action Buttons Box} */}
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                            }}
                          >
                            <IconButton>
                              <ThumbUpOffAlt
                                sx={{
                                  width: '20px',
                                  height: '20px',
                                  color: '#212B36',
                                }}
                              />
                            </IconButton>
                            <IconButton>
                              <ThumbDownOffAltRounded
                                sx={{
                                  width: '20px',
                                  height: '20px',
                                  color: '#212B36',
                                }}
                              />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                ))
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '460px',
                  }}
                >
                  <Typography
                    align="center"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      flex: '1 0 0',
                      alignSelf: 'stretch',
                      color: '#000',
                      textAlign: 'center',
                      fontFamily: 'DFPHeiBold-B5',
                      fontSize: 32,
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '48px',
                      pb: '36px',
                    }}
                  >
                    許下願望，讓我們來幫你實現！
                  </Typography>
                </Box>
              )}
            </Box>
            {/* // AI Text Input Box */}
            <Box
              sx={{
                gap: '8px',
                display: 'flex',
                paddingTop: '8px',
                borderRadius: '8px',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingBottom: '8px',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#EBE3DD',
                height: '48px',
              }}
            >
              {/* Input Box */}
              <TextField
                fullWidth
                placeholder="輸入您的需求"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                }}
                value={userInputValue}
                onChange={handleOnChangeUserInput}
                onKeyDown={handleOnKeyDownUserInput}
                slotProps={{
                  htmlInput: {
                    sx: { padding: 0 },
                  },
                  input: {
                    sx: { padding: 0 },
                    endAdornment: (
                      <InputAdornment position="end">
                        {isFetching ? (
                          <IconButton
                            // onClick={handleCancel}
                            className={isFetching ? 'interacting' : ''}
                          >
                            <StopCircleRounded
                              className={'interactingIcon'}
                              sx={{ color: '#0066CC' }}
                            />
                          </IconButton>
                        ) : userInputValue !== '' ? (
                          <IconButton
                            aria-label="send message"
                            onClick={handleSubmitChatMessage}
                          >
                            <SendRounded sx={{ color: '#0066CC' }} />
                          </IconButton>
                        ) : (
                          <IconButton
                            aria-label="Audio Message"
                            // onClick={handleListening}
                            className={isListening ? 'mic-listening' : ''}
                            sx={{ padding: '8px' }}
                          >
                            <MicRounded
                              className={isListening ? 'mic-icon' : ''}
                              sx={{ color: isListening ? 'white' : '#212B36' }}
                            />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default WishPoolDialog;
