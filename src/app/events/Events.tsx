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
import SearchDialog from '@/components/dialogs/SearchDialog';
import DataSourceDialog from '@/components/chat-page/components/chatDataStore';

const Events = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isBelow400px = useMediaQuery('(max-width:400px)');

  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(true);
  const [isFocusScrolledLeft, setIsFocusScrolledLeft] = useState(true);
  const [isFocusScrolledRight, setIsFocusScrolledRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openDataSource, setOpenDataSource] = useState(false);

  // Check scroll position on mount and scroll events
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    // Check if scrolled to the left edge
    setIsFocusScrolledLeft(scrollLeft <= 0);

    // Check if scrolled to the right edge (with a small buffer for rounding errors)
    setIsFocusScrolledRight(scrollLeft + clientWidth >= scrollWidth - 5);
  };

  // Handle scroll right button click
  const handleFocusScrollRight = () => {
    if (!scrollContainerRef.current) return;

    scrollContainerRef.current.scrollBy({
      left: 275,
      behavior: 'smooth',
    });
  };

  // Handle scroll left button click
  const handleFocusScrollLeft = () => {
    if (!scrollContainerRef.current) return;

    scrollContainerRef.current.scrollBy({
      left: -275,
      behavior: 'smooth',
    });
  };

  // Handle touch start event
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchX = e.targetTouches[0]?.clientX;
    if (touchX !== undefined) {
      setTouchStart(touchX);
      if (scrollContainerRef.current) {
        setStartScrollLeft(scrollContainerRef.current.scrollLeft);
      }
    }
  };

  // Handle touch move event for smooth scrolling during the swipe
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || !scrollContainerRef.current) return;

    const currentTouch = e.targetTouches[0]?.clientX;
    if (currentTouch === undefined) return;

    const diff = touchStart - currentTouch;

    // Apply the scroll directly during the move for a more responsive feel
    scrollContainerRef.current.scrollLeft = startScrollLeft + diff;
    setTouchEnd(currentTouch);
  };

  // Handle touch end event
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleFocusScrollRight();
    } else if (isRightSwipe) {
      handleFocusScrollLeft();
    }

    // Reset touch states
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Handle mouse events for desktop drag scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;

    setIsDragging(true);
    setTouchStart(e.clientX);
    setStartScrollLeft(scrollContainerRef.current.scrollLeft);

    // Change cursor to indicate grabbing
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grabbing';
      scrollContainerRef.current.style.userSelect = 'none';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !touchStart || !scrollContainerRef.current) return;

    const currentX = e.clientX;
    const diff = touchStart - currentX;

    // Apply the scroll directly during the move
    scrollContainerRef.current.scrollLeft = startScrollLeft + diff;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTouchStart(null);

    // Reset cursor
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
      scrollContainerRef.current.style.userSelect = 'auto';
    }
  };

  // Add mouseLeave handler to handle cases where mouse up happens outside the container
  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  // Add useEffect to add/remove global mouse event listeners
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    // Add global event listener to catch mouse up events outside the component
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]); // Added isDragging to dependencies

  // Add scroll event listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, [scrollContainerRef.current, checkScrollPosition]); // Use .current as dependency

  const toolItems = Array.from({ length: 13 });
  const focusItems = Array.from({ length: 10 });

  return (
    <Box
      sx={{
        height: '100vh',
        background: 'var(--Primary-, #EBE3DD)',
      }}
    >
      <ToolbarDrawer
        open={isOpenDrawer}
        setIsOpenDrawer={setIsOpenDrawer}
        openDataSource={openDataSource}
      >
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
            height: isMobile ? '100%' : 'calc(100vh - 32px)',
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
              overflow: 'visible',
              alignSelf: 'stretch',
              flexDirection: 'column',
              alignItems: 'flex-start',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                gap: '8px',
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
              ref={scrollContainerRef}
              sx={{
                gap: '16px',
                display: 'flex',
                position: 'relative',
                alignSelf: 'stretch',
                alignItems: 'flex-start',
                overflowX: 'auto',
                scrollbarWidth: 'none', // Hide scrollbar for Firefox
                '&::-webkit-scrollbar': {
                  // Hide scrollbar for Chrome/Safari
                  display: 'none',
                },
                msOverflowStyle: 'none', // Hide scrollbar for IE/Edge
                cursor: 'grab',
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              {focusItems.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    height: '220px',
                    minWidth: '260px',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    '&:hover': {
                      '& .hover-text': {
                        color: '#990000',
                      },
                      '& .hover-box': {
                        backgroundColor: '#CC00000D',
                      },
                    },
                  }}
                  onClick={() => setOpenDataSource(true)}
                >
                  <Image
                    src={boxImage || '/placeholder.svg'}
                    alt="Boxed Image"
                    style={{
                      width: '100%',
                      objectFit: 'cover',
                      pointerEvents: 'none',
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
                      padding: '24px 16px 16px 16px',
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
                onClick={handleOpenSearch}
              >
                <SearchRounded
                  sx={{ width: '24px', height: '24px', color: '#212B36' }}
                />
              </IconButton>
            </Box>
            <Box>
              <SearchDialog open={isSearchOpen} onClose={handleCloseSearch} />
            </Box>
            <Grid
              container
              spacing={2}
              sx={{
                gap: '16px',
                rowGap: '16px',
                alignItems: isMobile ? 'center' : 'flex-start',
                alignContent: isMobile ? 'center' : 'flex-start',
                justifyContent: 'flex-start',
              }}
            >
              {toolItems.map((_, index) => (
                <Grid
                  size={{
                    xs: isBelow400px ? 12 : 6,
                    sm: openDataSource ? 12 : 6,
                    md: openDataSource ? 12 : 4,
                    lg: openDataSource ? 4 : 3,
                    xl: openDataSource ? 3 : 2.4,
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
                      borderRadius: '8px',
                      overflow: 'hidden',
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
                        padding: '24px 16px 16px 16px',
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
      <DataSourceDialog
        open={openDataSource}
        onClose={() => setOpenDataSource(false)}
      />
    </Box>
  );
};

export default Events;
