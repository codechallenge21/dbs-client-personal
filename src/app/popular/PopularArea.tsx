import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Card,
  List,
  Grid2,
  Button,
  useTheme,
  ListItem,
  IconButton,
  Typography,
  CardContent,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import {
  ArrowForwardIosRounded,
  MenuRounded,
  WorkRounded,
} from '@mui/icons-material';
import Image from 'next/image';
import boxImage from '../../../public/assets/images/box.png';
import ToolbarDrawer from '@/components/toolbar-drawer-new/ToolbarDrawer';

export default function PopularArea() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const focusRef = useRef<HTMLDivElement>(null);
  const recommendationsRef = useRef<HTMLDivElement>(null);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(true);
  const [isFocusScrolledLeft, setIsFocusScrolledLeft] = useState(true);
  const [isFocusScrolledRight, setIsFocusScrolledRight] = useState(false);

  const handleFocusScrollRight = () => {
    if (focusRef.current) {
      const itemWidth = 260 + 16;
      focusRef.current.scrollBy({
        behavior: 'smooth',
        left: itemWidth * (isMobile ? 1 : 3),
      });
      setTimeout(handleFocusScroll, 30);
    }
  };

  const handleFocusScrollLeft = () => {
    if (focusRef.current) {
      const itemWidth = 260 + 16;
      focusRef.current.scrollBy({
        behavior: 'smooth',
        left: -itemWidth * (isMobile ? 1 : 3),
      });
      setTimeout(handleFocusScroll, 30);
    }
  };

  const handleFocusScroll = () => {
    if (focusRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = focusRef.current;
      setIsFocusScrolledLeft(scrollLeft === 0);
      setIsFocusScrolledRight(scrollLeft + clientWidth === scrollWidth);
    }
  };

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.addEventListener('scroll', handleFocusScroll);
      handleFocusScroll();

      return () => {
        focusRef?.current?.removeEventListener('scroll', handleFocusScroll);
      };
    }
  }, []);

  const FAQItems = Array.from({ length: 5 });
  const toolItems = Array.from({ length: 12 });
  const focusItems = Array.from({ length: 10 });
  const recommendedItems = Array.from({ length: 10 });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'var(--Primary-, #EBE3DD)',
      }}
    >
      <ToolbarDrawer open={isOpenDrawer} setIsOpenDrawer={setIsOpenDrawer}>
        {isMobile && (
          <Box
            sx={{
              flexShrink: 0,
              width: '100%',
              height: '64px',
              display: 'flex',
              padding: '8px 16px',
              alignItems: 'center',
              borderRadius: '8px 0px 0px 8px',
              background: 'var(--Primary-White, #FFF)',
            }}
          >
            <IconButton
              sx={{
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '50px',
                justifyContent: 'center',
              }}
              onClick={() => setIsOpenDrawer(true)}
            >
              <MenuRounded
                sx={{ width: '24px', height: '24px', color: '#212B36' }}
              />
            </IconButton>
            <Box
              sx={{
                flex: '1 0 0',
                height: '40px',
                display: 'flex',
                minHeight: '32px',
                alignItems: 'center',
                padding: '4px 0px 4px 8px',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: '16px',
                  fontStyle: 'normal',
                  lineHeight: 'normal',
                  textOverflow: 'ellipsis',
                  fontFamily: 'DFPHeiBold-B5',
                  color: 'var(--Secondary-Dark-Gray, #4A4A4A)',
                }}
              >
                發燒內容
              </Typography>
            </Box>
          </Box>
        )}
        <Box
          sx={{
            gap: '20px',
            display: 'flex',
            overflow: 'auto',
            borderRadius: '8px',
            flexDirection: 'column',
            backgroundColor: 'white',
            height: isMobile ? '100%' : '96vh',
            padding: isMobile ? '16px' : '16px 32px',
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
          <Box
            sx={{
              gap: '16px',
              display: 'flex',
              minHeight: '260px',
              overflow: 'visible',
              position: 'relative',
              flexDirection: 'column',
            }}
          >
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '24px',
                fontStyle: 'normal',
                lineHeight: 'normal',
                fontFamily: 'DFPHeiBold-B5',
                color: 'var(--Primary-Black, #212B36)',
              }}
            >
              焦點
            </Typography>
            <Box
              sx={{
                display: 'flex',
                minHeight: '220px',
                position: 'relative',
              }}
            >
              <Box
                ref={focusRef}
                sx={{
                  gap: '16px',
                  width: '100%',
                  display: 'flex',
                  minHeight: '220px',
                }}
              >
                {focusItems.map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      minWidth: '260px',
                      minHeight: '220px',
                      alignItems: 'center',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      src={boxImage}
                      alt="Boxed Image"
                      style={{
                        width: '100%',
                        height: '130px',
                        objectFit: 'cover',
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px',
                      }}
                    />
                    <Box
                      sx={{
                        gap: '4px',
                        display: 'flex',
                        alignSelf: 'stretch',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        borderBottomLeftRadius: '8px',
                        padding: '24px 16px 16px 16px',
                        borderBottomRightRadius: '8px',
                        backgroundColor: 'var(--Primary-, #EBE3DD)',
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 400,
                          fontSize: '24px',
                          overflow: 'hidden',
                          fontStyle: 'normal',
                          lineHeight: 'normal',
                          textOverflow: 'ellipsis',
                          fontFamily: 'DFPHeiBold-B5',
                          color: 'var(--Primary-Black, #212B36)',
                        }}
                      >
                        標題
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          fontWeight: 400,
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontStyle: 'normal',
                          fontFamily: 'DFPHeiMedium-B5',
                          color: 'var(--Text-, #454A4D)',
                        }}
                      >
                        説明文字
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              {!isFocusScrolledRight && (
                <IconButton
                  onClick={handleFocusScrollRight}
                  sx={{
                    top: '80px',
                    right: '2px',
                    '&:hover': {
                      backgroundColor: 'rgba(204, 0, 0, 0.40)',
                    },
                    zIndex: 10,
                    position: 'absolute',
                    backgroundColor: 'rgba(204, 0, 0, 0.60)',
                  }}
                >
                  <ArrowForwardIosRounded
                    sx={{ width: '18px', height: '18px', color: 'white' }}
                  />
                </IconButton>
              )}
              {!isFocusScrolledLeft && (
                <IconButton
                  onClick={handleFocusScrollLeft}
                  sx={{
                    top: '80px',
                    left: '2px',
                    '&:hover': {
                      backgroundColor: 'rgba(204, 0, 0, 0.40)',
                    },
                    zIndex: 10,
                    position: 'absolute',
                    backgroundColor: 'rgba(204, 0, 0, 0.60)',
                  }}
                >
                  <ArrowForwardIosRounded
                    sx={{
                      width: '18px',
                      height: '18px',
                      color: 'white',
                      transform: 'scaleX(-1)',
                    }}
                  />
                </IconButton>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              gap: '16px',
              display: 'flex',
              minHeight: '320px',
              overflow: 'visible',
              flexDirection: 'column',
            }}
          >
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '24px',
                fontStyle: 'normal',
                lineHeight: 'normal',
                fontFamily: 'DFPHeiBold-B5',
                color: 'var(--Primary-Black, #212B36)',
              }}
            >
              工具下載
            </Typography>
            <Grid2 container>
              {toolItems.map((_, index) => (
                <Grid2 key={index} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                  <Box
                    sx={{
                      gap: '20px',
                      display: 'flex',
                      padding: '16px',
                      textAlign: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <WorkRounded
                      sx={{
                        width: '71px',
                        height: '72px',
                        color: 'black',
                      }}
                    />
                    <Typography variant="body2">工具名称</Typography>
                  </Box>
                </Grid2>
              ))}
            </Grid2>
          </Box>

          <Box
            sx={{
              gap: '16px',
              display: 'flex',
              minHeight: '186px',
              flexDirection: 'column',
            }}
          >
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '24px',
                fontStyle: 'normal',
                lineHeight: 'normal',
                fontFamily: 'DFPHeiBold-B5',
                color: 'var(--Primary-Black, #212B36)',
              }}
            >
              為您推薦
            </Typography>
            <Box
              sx={{
                gap: '16px',
                display: 'flex',
                minHeight: '146px',
                position: 'relative',
              }}
            >
              <Box
                ref={recommendationsRef}
                sx={{
                  gap: '16px',
                  width: '100%',
                  display: 'flex',
                }}
              >
                {recommendedItems.map((_, index) => (
                  <Card
                    key={index}
                    sx={{
                      flexShrink: 0,
                      width: '268px',
                      height: '146px',
                      padding: '16px',
                      minHeight: '114px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--Primary-, #EBE3DD)',
                    }}
                  >
                    <CardContent sx={{ padding: 0 }}>
                      <Typography
                        sx={{
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '22px',
                          fontStyle: 'normal',
                          fontFamily: 'DFPHeiMedium-B5',
                          color: 'var(--Primary-Black, #212B36)',
                        }}
                      >
                        類別
                      </Typography>
                      <Box
                        sx={{
                          mb: '20px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: '24px',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            lineHeight: 'normal',
                            color: 'var(--Primary-Black, #212B36)',
                          }}
                        >
                          標題
                        </Typography>
                        <IconButton>
                          <ArrowForwardIosRounded sx={{ color: 'black' }} />
                        </IconButton>
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: 400,
                          fontSize: '16px',
                          fontStyle: 'normal',
                          lineHeight: 'normal',
                          whiteSpace: 'nowrap',
                          fontFamily: 'Open Sans',
                          textOverflow: 'ellipsis',
                          color: 'var(--Primary-Black, #212B36)',
                        }}
                      >
                        社工在財務類別的知識中，了解如何...
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
              <IconButton
                onClick={() => {
                  if (recommendationsRef.current) {
                    const itemWidth = 268 + 16;
                    recommendationsRef.current.scrollBy({
                      left: itemWidth * 3,
                      behavior: 'smooth',
                    });
                  }
                }}
                sx={{
                  top: '60px',
                  right: '2px',
                  '&:hover': {
                    backgroundColor: 'rgba(204, 0, 0, 0.40)',
                  },
                  zIndex: 10,
                  position: 'absolute',
                  backgroundColor: 'rgba(204, 0, 0, 0.60)',
                }}
              >
                <ArrowForwardIosRounded
                  sx={{ width: '18px', height: '18px', color: 'white' }}
                />
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              gap: '16px',
              padding: '0px',
              display: 'flex',
              overflow: 'visible',
              alignSelf: 'stretch',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '24px',
                fontStyle: 'normal',
                lineHeight: 'normal',
                fontFamily: 'DFPHeiBold-B5',
                color: 'var(--Primary-Black, #212B36)',
              }}
            >
              常見問題
            </Typography>

            <Box
              sx={{
                gap: '16px',
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'stretch',
                flexDirection: 'column',
              }}
            >
              {FAQItems.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    gap: '20px',
                    display: 'flex',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    alignSelf: 'stretch',
                    alignItems: 'center',
                    background: 'var(--Primary-, #EBE3DD)',
                  }}
                >
                  <Box
                    sx={{
                      gap: '8px',
                      flex: '1 0 0',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Typography
                      sx={{
                        height: '24px',
                        display: 'flex',
                        fontWeight: 400,
                        fontSize: '14px',
                        fontStyle: 'normal',
                        lineHeight: 'normal',
                        alignSelf: 'stretch',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        fontFamily: 'DFPHeiBold-B5',
                        color: 'var(--Secondary-Dark-Gray, #4A4A4A)',
                      }}
                    >
                      類別
                    </Typography>
                    <List sx={{ padding: '0' }}>
                      <ListItem
                        sx={{
                          gap: '8px',
                          padding: '0',
                          display: 'flex',
                          alignSelf: 'stretch',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}
                      >
                        <ListItemText
                          sx={{ padding: '0' }}
                          primary="標題"
                          secondary="內容"
                          slotProps={{
                            primary: {
                              sx: {
                                fontWeight: 400,
                                fontSize: '20px',
                                fontStyle: 'normal',
                                alignSelf: 'stretch',
                                lineHeight: 'normal',
                                fontFamily: 'DFPHeiBold-B5',
                                color: 'var(--Primary-Black, #212B36)',
                              },
                            },
                            secondary: {
                              sx: {
                                fontWeight: 400,
                                fontSize: '16px',
                                lineHeight: '24px',
                                fontStyle: 'normal',
                                alignSelf: 'stretch',
                                fontFamily: 'DFPHeiMedium-B5',
                                color: 'var(--Secondary-Dark-Gray, #4A4A4A)',
                              },
                            },
                          }}
                        />
                      </ListItem>
                    </List>
                  </Box>
                  <Button
                    sx={{
                      gap: '8px',
                      display: 'flex',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--Primary-DBS-Red, #C00)',
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: '14px',
                        lineHeight: '24px',
                        textAlign: 'center',
                        fontStyle: 'normal',
                        fontFamily: 'Public Sans',
                        color: 'var(--Primary-DBS-Red, #C00)',
                      }}
                    >
                      更多
                    </Typography>
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </ToolbarDrawer>
    </Box>
  );
}
