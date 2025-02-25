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
  DownloadRounded,
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
  const [isRecommendedScrolledLeft, setIsRecommendedScrolledLeft] =
    useState(true);
  const [isRecommendedScrolledRight, setIsRecommendedScrolledRight] =
    useState(false);
  const tolerance = 5;

  const toolsMobileRef = useRef<HTMLDivElement>(null);

  const [isMobileToolsScrolledLeft, setIsMobileToolsScrolledLeft] =
    useState(true);
  const [isMobileToolsScrolledRight, setIsMobileToolsScrolledRight] =
    useState(false);
  const [, setCurrentMobilePage] = useState(0);

  const handleMobileToolsScroll = () => {
    if (toolsMobileRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = toolsMobileRef.current;

      setIsMobileToolsScrolledLeft(scrollLeft === 0);
      setIsMobileToolsScrolledRight(
        scrollLeft + clientWidth >= scrollWidth - 10
      );

      const windowWidth = window.innerWidth;
      const currentPage = Math.round(scrollLeft / windowWidth);
      setCurrentMobilePage(currentPage);
    }
  };

  useEffect(() => {
    const ref = toolsMobileRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleMobileToolsScroll);
      handleMobileToolsScroll();
      return () => ref.removeEventListener('scroll', handleMobileToolsScroll);
    }
  }, []);

  const handleFocusScrollRight = () => {
    if (focusRef.current) {
      const itemWidth = 260 + 16;
      const scrollDelta = itemWidth * (isMobile ? 1 : 3);
      const newScrollLeft = focusRef.current.scrollLeft + scrollDelta;

      // Trigger smooth scrolling
      focusRef.current.scrollBy({
        behavior: 'smooth',
        left: scrollDelta,
      });

      const { clientWidth, scrollWidth } = focusRef.current;
      // Optimistically update state
      setIsFocusScrolledLeft(newScrollLeft <= tolerance);
      setIsFocusScrolledRight(
        newScrollLeft >= scrollWidth - clientWidth - tolerance
      );
    }
  };

  const handleFocusScrollLeft = () => {
    if (focusRef.current) {
      const itemWidth = 260 + 16;
      const scrollDelta = itemWidth * (isMobile ? 1 : 3);
      const newScrollLeft = focusRef.current.scrollLeft - scrollDelta;

      focusRef.current.scrollBy({
        behavior: 'smooth',
        left: -scrollDelta,
      });

      const { clientWidth, scrollWidth } = focusRef.current;
      setIsFocusScrolledLeft(newScrollLeft <= tolerance);
      setIsFocusScrolledRight(
        newScrollLeft >= scrollWidth - clientWidth - tolerance
      );
    }
  };

  const handleRecommendedScrollRight = () => {
    if (recommendationsRef.current) {
      const itemWidth = 260 + 16;
      const scrollDelta = itemWidth * (isMobile ? 1 : 3);
      const newScrollLeft = recommendationsRef.current.scrollLeft + scrollDelta;

      recommendationsRef.current.scrollBy({
        behavior: 'smooth',
        left: scrollDelta,
      });

      const { clientWidth, scrollWidth } = recommendationsRef.current;
      setIsRecommendedScrolledLeft(newScrollLeft <= tolerance);
      setIsRecommendedScrolledRight(
        newScrollLeft >= scrollWidth - clientWidth - tolerance
      );
    }
  };

  const handleRecommendedScrollLeft = () => {
    if (recommendationsRef.current) {
      const itemWidth = 260 + 16;
      const scrollDelta = itemWidth * (isMobile ? 1 : 3);
      const newScrollLeft = recommendationsRef.current.scrollLeft - scrollDelta;

      recommendationsRef.current.scrollBy({
        behavior: 'smooth',
        left: -scrollDelta,
      });

      const { clientWidth, scrollWidth } = recommendationsRef.current;
      setIsRecommendedScrolledLeft(newScrollLeft <= tolerance);
      setIsRecommendedScrolledRight(
        newScrollLeft >= scrollWidth - clientWidth - tolerance
      );
    }
  };

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
                    top: '90px',
                    right: '5px',
                    width: '28px',
                    height: '28px',
                    padding: '5px',
                    borderRadius: '50px',
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
                    top: '90px',
                    left: '5px',
                    width: '28px',
                    height: '28px',
                    padding: '5px',
                    borderRadius: '50px',
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
                fontFamily: 'DFPHeiBold-B5',
                color: 'var(--Primary-Black, #212B36)',
              }}
            >
              工具下載
            </Typography>

            <Box sx={{ display: { xs: 'none', sm: 'block' }, width: '100%' }}>
              <Grid2 container>
                {toolItems.map((_, index) => (
                  <Grid2
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    key={index}
                    size={{ sm: 4, md: 3, lg: 2 }}
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
                      <Typography variant="body2">工具名称</Typography>
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
                display: { xs: 'block', sm: 'none' },
                position: 'relative',
              }}
            >
              <Box
                ref={toolsMobileRef}
                sx={{
                  display: 'flex',
                  overflowX: 'auto',
                  scrollBehavior: 'smooth',
                  touchAction: 'none',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                {Array.from({ length: Math.ceil(toolItems.length / 4) }).map(
                  (_, pageIndex) => (
                    <Box
                      key={pageIndex}
                      sx={{
                        flexShrink: 0,
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gridTemplateRows: 'repeat(2, auto)',
                        gap: '16px',
                        padding: '0 4px',
                      }}
                    >
                      {Array.from({ length: 4 }).map((_, itemIndex) => {
                        const index = pageIndex * 4 + itemIndex;
                        if (index < toolItems.length) {
                          return (
                            <Box
                              key={itemIndex}
                              sx={{
                                gap: '10px',
                                width: '100%',
                                height: '140px',
                                display: 'flex',
                                padding: '8px',
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
                                  width: '60px',
                                  height: '60px',
                                  color: 'black',
                                }}
                              />
                              <Typography variant="body2">工具名称</Typography>
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
                          );
                        }
                        return null;
                      })}
                    </Box>
                  )
                )}
              </Box>
              {!isMobileToolsScrolledRight && (
                <IconButton
                  onClick={() => {
                    if (toolsMobileRef.current) {
                      const currentScroll = toolsMobileRef.current.scrollLeft;
                      const windowWidth = window.innerWidth;

                      toolsMobileRef.current.scrollTo({
                        left: currentScroll + windowWidth,
                        behavior: 'smooth',
                      });

                      setTimeout(handleMobileToolsScroll, 300);
                    }
                  }}
                  sx={{
                    top: '50%',
                    right: '5px',
                    width: '28px',
                    height: '28px',
                    padding: '5px',
                    borderRadius: '50px',
                    transform: 'translateY(-50%)',
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

              {!isMobileToolsScrolledLeft && (
                <IconButton
                  onClick={() => {
                    if (toolsMobileRef.current) {
                      const currentScroll = toolsMobileRef.current.scrollLeft;
                      const windowWidth = window.innerWidth;

                      toolsMobileRef.current.scrollTo({
                        left: currentScroll - windowWidth,
                        behavior: 'smooth',
                      });

                      setTimeout(handleMobileToolsScroll, 300);
                    }
                  }}
                  sx={{
                    top: '50%',
                    left: '5px',
                    width: '28px',
                    height: '28px',
                    padding: '5px',
                    borderRadius: '50px',
                    backgroundColor: 'rgba(204, 0, 0, 0.60)',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    position: 'absolute',
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
                            fontFamily: 'DFPHeiMedium-B5',
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

              {!isRecommendedScrolledRight && (
                <IconButton
                  onClick={handleRecommendedScrollRight}
                  sx={{
                    top: '60px',
                    right: '8px',
                    width: '28px',
                    height: '28px',
                    padding: '5px',
                    borderRadius: '50px',
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
                    }}
                  />
                </IconButton>
              )}
              {!isRecommendedScrolledLeft && (
                <IconButton
                  onClick={handleRecommendedScrollLeft}
                  sx={{
                    top: '60px',
                    left: '8px',
                    width: '28px',
                    height: '28px',
                    padding: '5px',
                    borderRadius: '50px',
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
