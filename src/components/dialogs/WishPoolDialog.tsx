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
} from '@mui/icons-material';

interface WishPoolDialogProps {
  open: boolean;
  onClose: (event: React.MouseEvent) => void;
}

const WishPoolDialog: React.FC<WishPoolDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog
      role="dialog"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            margin: '0px',
            width: '100%',
            height: '570px',
            maxWidth: '824px',
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
          height: '64px',
          width: '824px',
          display: 'flex',
          paddingTop: '8px',
          paddingLeft: '32px',
          flexDirection: 'row',
          alignItems: 'center',
          paddingRight: '16px',
          paddingBottom: '8px',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            width: '100px',
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
            width: '48px',
            height: '48px',
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
      <Box
        sx={{
          gap: '10px',
          width: '760px',
          height: '490px',
          display: 'flex',
          alignSelf: 'center',
          flexDirection: 'column',
        }}
      >
        {/* {Response Box} */}
        <Box
          sx={{
            gap: '20px',
            width: '760px',
            height: '424px',
            display: 'flex',
            maxWidth: '760px',
            paddingTop: '16px',
            flexDirection: 'column',
          }}
        >
          {/* {User Text} */}
          <Box
            sx={{
              width: '760px',
              height: '68px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Box
              sx={{
                gap: '16px',
                width: '366px',
                height: '68px',
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
                }}
              >
                我想要幫我的個案進行財務狀況的分析
              </Typography>
            </Box>
          </Box>
          {/* {Response Main Container} */}
          <Box
            sx={{
              gap: '20px',
              width: '760px',
              display: 'flex',
              height: '330px',
              flexDirection: 'column',
            }}
          >
            {/* {Main Top Box} */}
            <Box
              sx={{
                gap: '12px',
                width: '760px',
                height: '148px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* {Text Search Box} */}
              <Box
                sx={{
                  gap: '16px',
                  width: '760px',
                  height: '36px',
                  display: 'flex',
                }}
              >
                <Box
                  sx={{
                    gap: '12px',
                    width: '156',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    sx={{ width: '24px', height: '24px', padding: '0px' }}
                  >
                    <SearchRounded sx={{ color: '#212B36' }} />
                  </IconButton>
                  <Typography
                    sx={{
                      width: '120px',
                      height: '24px',
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
              </Box>

              {/* {Card Container Box} */}
              <Box
                sx={{
                  gap: '12px',
                  width: '760px',
                  height: '100px',
                  display: 'flex',
                }}
              >
                {['財務快篩', '活動1', '活動2', '查看更多 +4'].map(
                  (item, index) => (
                    <Card
                      key={index}
                      sx={{
                        gap: '10px',
                        width: '181px',
                        height: '100px',
                        borderRadius: '8px',
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
                          <PublicRounded sx={{ color: '#CC0000' }} />
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
                width: '760px',
                height: '162px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* {Title Box} */}
              <Box
                sx={{
                  width: '760px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{
                    gap: '12px',
                    width: '90px',
                    height: '24px',
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
                        width: '20px',
                        height: '20px',
                        color: '#212B36',
                      }}
                    />
                  </IconButton>
                  <Typography
                    sx={{
                      width: '60px',
                      height: '24px',
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
                    width: '82px',
                    height: '36px',
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
                  width: '760px',
                  height: '27px',
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
                  width: '760px',
                  height: '27px',
                  display: 'flex',
                }}
              >
                <Typography
                  sx={{
                    width: '145px',
                    height: '27px',
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
                    width: '96px',
                    height: '27px',
                    color: '#FFFFFF',
                    paddingTop: '4px',
                    paddingLeft: '8px',
                    borderRadius: '8px',
                    paddingRight: '8px',
                    paddingBottom: '4px',
                    background: '#5C443A',
                  }}
                >
                  立即許願！
                </Button>
              </Box>
              {/* {Response Action Buttons Box} */}
              <Box
                sx={{
                  width: '760px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <IconButton>
                  <ThumbDownOffAltRounded
                    sx={{ width: '20px', height: '20px', color: '#212B36' }}
                  />
                </IconButton>
                <IconButton>
                  <ThumbDownOffAltRounded
                    sx={{ width: '20px', height: '20px', color: '#212B36' }}
                  />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* {AI Text Input Box} */}
        <Box
          sx={{
            gap: '8px',
            width: '760px',
            height: '56px',
            display: 'flex',
            maxWidth: '760px',
            paddingTop: '8px',
            maxHeight: '250px',
            borderRadius: '8px',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingBottom: '8px',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#EBE3DD',
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
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <MicRounded sx={{ color: '#212B36' }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </Box>
    </Dialog>
  );
};

export default WishPoolDialog;
