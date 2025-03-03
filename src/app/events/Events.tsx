'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  useTheme,
  Typography,
  IconButton,
  useMediaQuery,
  Container,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';
import {
  MenuRounded,
  SearchRounded,
  ArrowDropDownRounded,
  ArrowForwardIosRounded,
} from '@mui/icons-material';
import boxImage from '../../../public/assets/images/box.png';
import ToolbarDrawer from '@/components/toolbar-drawer-new/ToolbarDrawer';

const Events = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isBelow400px = useMediaQuery('(max-width:400px)');

  const focusRef = useRef<HTMLDivElement>(null);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(true);
  const [isFocusScrolledLeft, setIsFocusScrolledLeft] = useState(true);
  const [isFocusScrolledRight, setIsFocusScrolledRight] = useState(false);

  const tolerance = 5;

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

  const handleFocusScroll = () => {
    if (focusRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = focusRef.current;
      setIsFocusScrolledLeft(scrollLeft <= tolerance);
      setIsFocusScrolledRight(
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

  const toolItems = Array.from({ length: 9 });
  const focusItems = Array.from({ length: 10 });

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
            <Button
              sx={{
                gap: '8px',
                height: '32px',
                paddingTop: '6px',
                paddingLeft: '8px',
                borderRadius: '8px',
                paddingRight: '8px',
                paddingBottom: '6px',
              }}
              endIcon={
                <ArrowDropDownRounded
                  sx={{ width: '20px', height: '20px', color: '#212B36' }}
                />
              }
            >
              <Typography
                sx={{
                  fontWeight: 400,
                  color: '#212B36',
                  fontSize: '16px',
                  lineHeight: '16px',
                  letterSpacing: '0%',
                  textAlign: 'center',
                  fontFamily: 'DFPHeiBold-B5',
                }}
              >
                活動公告
              </Typography>
            </Button>
          </Box>
        )}
        <Box
          sx={{
            gap: '20px',
            display: 'flex',
            overflowY: 'auto',
            overflowX: 'hidden',
            borderRadius: isMobile ? '0' : '8px',
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
              height: '265px',
              overflow: 'visible',
              alignSelf: 'stretch',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Box
              sx={{
                gap: '8px',
                height: '29px',
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'stretch',
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
                你可能感興趣
              </Typography>
            </Box>
            <Box
              ref={focusRef}
              sx={{
                gap: '16px',
                display: 'flex',
                height: '220px',
                position: 'relative',
                alignSelf: 'stretch',
                alignItems: 'flex-start',
              }}
            >
              {focusItems.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    // gap: '12px',
                    display: 'flex',
                    height: '220px',
                    minWidth: '260px',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
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
              {!isFocusScrolledRight && (
                <IconButton
                  onClick={handleFocusScrollRight}
                  sx={{
                    zIndex: 10,
                    right: '8px',
                    width: '28px',
                    bottom: '92px',
                    height: '28px',
                    padding: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '50px',
                    position: 'absolute',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(204, 0, 0, 0.60)',
                    '&:hover': {
                      backgroundColor: 'rgba(204, 0, 0, 0.40)',
                    },
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
                    left: '8px',
                    bottom: '96px',
                    padding: '5px',
                    display: 'flex',
                    position: 'absolute',
                    alignItems: 'center',
                    borderRadius: '50px',
                    justifyContent: 'center',
                    background: 'rgba(204, 0, 0, 0.60)',
                    '&:hover': {
                      backgroundColor: 'rgba(204, 0, 0, 0.40)',
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
          <Container
            maxWidth="xl"
            sx={{
              gap: '16px',
              display: 'flex',
              alignSelf: 'stretch',
              flexDirection: 'column',
              alignItems: 'flex-start',
              p: 0,
              '&.MuiContainer-root': {
                paddingLeft: '0',
                paddingRight: '0',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'stretch',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '24px',
                  fontStyle: 'normal',
                  fontFamily: 'Inter',
                  lineHeight: 'normal',
                  color: 'var(--Primary-Black, #212B36)',
                }}
              >
                所有活動
              </Typography>
              <IconButton
                sx={{
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SearchRounded
                  sx={{ width: '24px', height: '24px', color: '#212B36' }}
                />
              </IconButton>
            </Box>
            <Grid
              container
              spacing={2}
              sx={{
                gap: '16px',
                rowGap: '16px',
                alignItems: isMobile ? 'center' : 'flex-start',
                alignContent: isMobile ? 'center' : 'flex-start',
                justifyContent: 'center',
              }}
            >
              {toolItems.map((_, index) => (
                <Grid
                  size={{
                    xs: isBelow400px ? 12 : 6,
                    sm: 6,
                    md: 4,
                    lg: 3,
                    xl: 2.4,
                  }}
                  key={index}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      height: '220px',
                      width: isMobile ? '100%' : 'auto',
                      alignItems: 'center',
                      flexDirection: 'column',
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
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </ToolbarDrawer>
    </Box>
  );
};

export default Events;
