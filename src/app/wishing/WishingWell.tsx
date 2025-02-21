'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Grid2,
  useTheme,
  Typography,
  IconButton,
  useMediaQuery,
  Button,
} from '@mui/material';
import Image from 'next/image';
import {
  MenuRounded,
  SearchRounded,
  ArrowDropDownRounded,
  ArrowForwardIosRounded,
} from '@mui/icons-material';
import boxImage from '../../../public/assets/images/box.png';
import ToolbarDrawer from '@/components/toolbar-drawer-new/ToolbarDrawer';

const WishingWell = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const toolItems = Array.from({ length: 12 });
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
            <Button
              sx={{
                gap: '8px',
                width: '90px',
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
              你可能感興趣
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
          <Box sx={{ overflow: 'visible' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography
                gutterBottom
                sx={{
                  fontWeight: 400,
                  fontSize: '24px',
                  fontStyle: 'normal',
                  lineHeight: 'normal',
                  marginBottom: '16px',
                  fontFamily: 'DFPHeiBold-B5',
                  color: 'var(--Primary-Black, #212B36)',
                }}
              >
                所有活動
              </Typography>
              <IconButton>
                <SearchRounded sx={{ color: '#212B36' }} />
              </IconButton>
            </Box>
            <Grid2 container spacing={2}>
              {toolItems.map((_, index) => (
                <Grid2
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key={index}
                  size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                >
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      minWidth: '260px',
                      minHeight: '220px',
                      overflow: 'visible',
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
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px',
                      }}
                    />
                    <Box
                      sx={{
                        width: '100%',
                        borderBottomLeftRadius: '8px',
                        borderBottomRightRadius: '8px',
                        backgroundColor: 'var(--Primary-, #EBE3DD)',
                      }}
                    >
                      <Typography
                        sx={{
                          marginLeft: '20px',
                          marginTop: '10px',
                          fontFamily: 'DFPHeiBold-B5',
                          color: 'var(--Primary-Black, #212B36)',
                        }}
                      >
                        標題
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ marginLeft: '20px', marginBottom: '20px' }}
                      >
                        説明文字
                      </Typography>
                    </Box>
                  </Box>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        </Box>
      </ToolbarDrawer>
    </Box>
  );
};

export default WishingWell;
