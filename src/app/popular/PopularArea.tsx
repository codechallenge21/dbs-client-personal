import ToolbarDrawer from '@/components/toolbar-drawer-new/ToolbarDrawer';
import {
  ArrowForwardIosRounded,
  DownloadRounded,
  MenuRounded,
  WorkRounded,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import boxImage from '../../../public/assets/images/box.png';

export default function PopularArea() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const focusRef = useRef<HTMLDivElement>(null);
  const recommendationsRef = useRef<HTMLDivElement>(null);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(true);
  const [isFocusScrolledLeft, setIsFocusScrolledLeft] = useState(true);
  const [isFocusScrolledRight, setIsFocusScrolledRight] = useState(false);
  const [isRecommendedScrolledLeft, setIsRecommendedScrolledLeft] =
    useState(true);
  const [isRecommendedScrolledRight, setIsRecommendedScrolledRight] =
    useState(false);
  const tolerance = 5; // Adjust if necessary

  const handleFocusScroll = () => {
    if (focusRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = focusRef.current;
      setIsFocusScrolledLeft(scrollLeft <= tolerance);
      setIsFocusScrolledRight(
        scrollLeft >= scrollWidth - clientWidth - tolerance
      );
    }
  };

  const handleRecommendedScroll = () => {
    if (recommendationsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        recommendationsRef.current;
      setIsRecommendedScrolledLeft(scrollLeft <= tolerance);
      setIsRecommendedScrolledRight(
        scrollLeft >= scrollWidth - clientWidth - tolerance
      );
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

  useEffect(() => {
    if (recommendationsRef.current) {
      recommendationsRef.current.addEventListener(
        'scroll',
        handleRecommendedScroll
      );
      handleRecommendedScroll();

      return () => {
        recommendationsRef?.current?.removeEventListener(
          'scroll',
          handleRecommendedScroll
        );
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
        height: '100vh',
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
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
                  fontFamily: 'var(--font-bold)',
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
            overflowY: 'auto',
            borderRadius: '8px',
            flexDirection: 'column',
            backgroundColor: 'white',
            height: isMobile ? '100%' : '96vh',
            padding: isMobile ? '16px' : '16px 32px',
            '@media (min-width: 600px)': {
              flex: '1 0 0',
            },
            '&::-webkit-scrollbar': {
              width: '6px',
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
                fontFamily: 'var(--font-bold)',
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
                onMouseDown={(e) => e.preventDefault()}
                onTouchStart={(e) => e.preventDefault()}
                sx={{
                  gap: '16px',
                  width: '100%',
                  display: 'flex',
                  minHeight: '220px',
                  overflowX: 'auto',
                  scrollBehavior: 'smooth',
                  touchAction: 'none', // disables touch-based scrolling
                  scrollbarWidth: 'none', // for Firefox
                  msOverflowStyle: 'none', // for IE and Edge
                  '&::-webkit-scrollbar': {
                    display: 'none', // for Chrome, Safari and Opera
                  },
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
                      '&:hover': {
                        '& .hover-text': {
                          color: '#990000',
                        },
                        '& .hover-box': {
                          backgroundColor: '#CC00000D',
                        },
                      },
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
                      className="hover-box"
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
                        '&:hover': {
                          backgroundColor: '#CC00000D',
                        },
                      }}
                    >
                      <Typography
                        className="hover-text"
                        sx={{
                          fontWeight: 400,
                          fontSize: '24px',
                          overflow: 'hidden',
                          fontStyle: 'normal',
                          lineHeight: 'normal',
                          textOverflow: 'ellipsis',
                          fontFamily: 'var(--font-bold)',
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
                          fontFamily: 'var(--font-medium)',
                          color: 'var(--Text-, #454A4D)',
                        }}
                      >
                        説明文字
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              {/* Scroll right button */}
              {!isFocusScrolledRight && (
                <IconButton
                  onClick={() => {
                    if (focusRef.current) {
                      const itemWidth = 260 + 16; // width of each item plus gap
                      const scrollDelta = itemWidth * (isMobile ? 1 : 3);

                      // Store current scroll position before scrolling
                      const currentScroll = focusRef.current.scrollLeft;

                      focusRef.current.scrollTo({
                        left: currentScroll + scrollDelta,
                        behavior: 'smooth',
                      });

                      // Wait for the animation and then update the state
                      setTimeout(handleFocusScroll, 300);
                    }
                  }}
                  sx={{
                    top: '90px',
                    right: '5px',
                    width: '28px',
                    height: '28px',
                    padding: '5px',
                    borderRadius: '50px',
                    '&:hover': {
                      backgroundColor: isMobile
                        ? 'rgba(204, 0, 0, 0.60)'
                        : 'rgba(204, 0, 0, 0.40)',
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
                    }}
                  />
                </IconButton>
              )}

              {/* Scroll left button */}
              {!isFocusScrolledLeft && (
                <IconButton
                  onClick={() => {
                    if (focusRef.current) {
                      const itemWidth = 260 + 16; // width of each item plus gap
                      const scrollDelta = itemWidth * (isMobile ? 1 : 3);

                      // Store current scroll position before scrolling
                      const currentScroll = focusRef.current.scrollLeft;

                      focusRef.current.scrollTo({
                        left: currentScroll - scrollDelta,
                        behavior: 'smooth',
                      });

                      // Wait for the animation and then update the state
                      setTimeout(handleFocusScroll, 300);
                    }
                  }}
                  sx={{
                    top: '90px',
                    left: '5px',
                    width: '28px',
                    height: '28px',
                    padding: '5px',
                    borderRadius: '50px',
                    backgroundColor: 'rgba(204, 0, 0, 0.60)',
                    zIndex: 10,
                    position: 'absolute',
                    '&:hover': {
                      backgroundColor: isMobile
                        ? 'rgba(204, 0, 0, 0.60)'
                        : 'rgba(204, 0, 0, 0.40)',
                    },
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
              height: 'auto',
              display: 'flex',
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
                fontFamily: 'var(--font-bold)',
                color: 'var(--Primary-Black, #212B36)',
              }}
            >
              工具下載
            </Typography>
            <Grid2 container>
              {toolItems.map((_, index) => (
                <Grid2
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key={index}
                  size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
                >
                  <Box
                    sx={{
                      gap: '20px',
                      width: '173px',
                      height: '140px',
                      display: 'flex',
                      padding: '16px',
                      borderRadius: '8px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      flexDirection: 'column',
                      backgroundColor: 'white',
                      '&:hover': {
                        backgroundColor: '#CC00000D',
                        '& .download-icon': {
                          display: 'block',
                        },
                      },
                    }}
                  >
                    <WorkRounded
                      sx={{
                        width: '71px',
                        height: '72px',
                        color: 'black',
                      }}
                    />
                    <Typography variant="body2">工具名稱</Typography>
                    <DownloadRounded
                      className="download-icon"
                      sx={{
                        display: 'none',
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        color: 'black',
                      }}
                    />
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
                fontFamily: 'var(--font-bold)',
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
                  minHeight: '146px',
                  overflowX: 'auto',
                  touchAction: 'none', // disables touch-based scrolling
                  scrollBehavior: 'smooth',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                {recommendedItems.map((_, index) => (
                  <Card
                    key={index}
                    sx={{
                      flexShrink: 0,
                      flex: '1 0 0',
                      width: '268px',
                      height: '146px',
                      padding: '16px',
                      display: 'flex',
                      minWidth: '300px',
                      maxWidth: '384px',
                      boxShadow: 'none',
                      minHeight: '114px',
                      maxHeight: '146px',
                      borderRadius: '8px',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      backgroundColor: 'var(--Primary-, #EBE3DD)',
                      '&:hover': {
                        backgroundColor: '#CC00000D',
                        '& .hover-text': {
                          color: '#990000',
                        },
                        '& .hover-icon': {
                          color: '#990000',
                          marginLeft: '5px',
                          transition: 'margin-left 300ms ease-in-out',
                        },
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        gap: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '0 !important',
                        paddingBottom: '0 !important',
                      }}
                    >
                      <Box
                        sx={{
                          gap: '8px',
                          display: 'flex',
                          alignSelf: 'stretch',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Typography
                          className="hover-text"
                          sx={{
                            fontWeight: 400,
                            fontSize: '14px',
                            lineHeight: '22px',
                            fontStyle: 'normal',
                            fontFamily: 'var(--font-medium)',
                            color: 'var(--Primary-Black, #212B36)',
                          }}
                        >
                          類別
                        </Typography>
                        <Box
                          sx={{
                            gap: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            alignSelf: 'stretch',
                          }}
                        >
                          <Typography
                            className="hover-text"
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
                          <IconButton
                            sx={{
                              padding: '0',
                              '&:hover': {
                                backgroundColor: 'transparent',
                              },
                            }}
                          >
                            <ArrowForwardIosRounded
                              className="hover-icon"
                              sx={{ color: 'black' }}
                            />
                          </IconButton>
                        </Box>
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

              {/* Scroll right button */}
              {!isRecommendedScrolledRight && (
                <IconButton
                  onClick={() => {
                    if (recommendationsRef.current) {
                      const itemWidth = 300 + 16; // minWidth of each card plus gap
                      const scrollDelta = itemWidth * (isMobile ? 1 : 3);

                      // Store current scroll position before scrolling
                      const currentScroll =
                        recommendationsRef.current.scrollLeft;

                      recommendationsRef.current.scrollTo({
                        left: currentScroll + scrollDelta,
                        behavior: 'smooth',
                      });

                      // Wait for the animation and then update the state
                      setTimeout(handleRecommendedScroll, 300);
                    }
                  }}
                  sx={{
                    top: '60px',
                    right: '8px',
                    width: '28px',
                    height: '28px',
                    padding: '5px',
                    borderRadius: '50px',
                    '&:hover': {
                      backgroundColor: isMobile
                        ? 'rgba(204, 0, 0, 0.60)'
                        : 'rgba(204, 0, 0, 0.40)',
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
                    }}
                  />
                </IconButton>
              )}

              {/* Scroll left button */}
              {!isRecommendedScrolledLeft && (
                <IconButton
                  onClick={() => {
                    if (recommendationsRef.current) {
                      const itemWidth = 300 + 16; // minWidth of each card plus gap
                      const scrollDelta = itemWidth * (isMobile ? 1 : 3);

                      // Store current scroll position before scrolling
                      const currentScroll =
                        recommendationsRef.current.scrollLeft;

                      recommendationsRef.current.scrollTo({
                        left: currentScroll - scrollDelta,
                        behavior: 'smooth',
                      });

                      // Wait for the animation and then update the state
                      setTimeout(handleRecommendedScroll, 300);
                    }
                  }}
                  sx={{
                    top: '60px',
                    left: '8px',
                    width: '28px',
                    height: '28px',
                    padding: '5px',
                    borderRadius: '50px',
                    backgroundColor: 'rgba(204, 0, 0, 0.60)',
                    zIndex: 10,
                    position: 'absolute',
                    '&:hover': {
                      backgroundColor: isMobile
                        ? 'rgba(204, 0, 0, 0.60)'
                        : 'rgba(204, 0, 0, 0.40)',
                    },
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
                fontFamily: 'var(--font-bold)',
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
                        fontFamily: 'var(--font-bold)',
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
                                fontFamily: 'var(--font-bold)',
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
                                fontFamily: 'var(--font-medium)',
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
