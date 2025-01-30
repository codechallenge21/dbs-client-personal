import React, { useRef, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  Button,
  Typography,
  CardContent,
  IconButton,
} from '@mui/material';
import { ArrowForwardIosRounded, WorkRounded } from '@mui/icons-material';
import Image from 'next/image';
import boxImage from '../../../public/assets/images/box.png';
import ToolboxDrawer from './components/ToolboxDrawer';

export default function PopularArea() {
  const focusRef = useRef<HTMLDivElement>(null);
  const recommendationsRef = useRef<HTMLDivElement>(null);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(true);

  // Function to handle mouse drag scrolling
  const enableDragScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.pageX - ref.current!.offsetLeft;
      scrollLeft = ref.current!.scrollLeft;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - ref.current!.offsetLeft;
      const walk = (x - startX) * 1.5; // Adjust scrolling speed
      ref.current!.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => (isDragging = false);

    ref.current.addEventListener('mousedown', onMouseDown);
    ref.current.addEventListener('mousemove', onMouseMove);
    ref.current.addEventListener('mouseup', onMouseUp);
    ref.current.addEventListener('mouseleave', onMouseUp);

    return () => {
      ref.current!.removeEventListener('mousedown', onMouseDown);
      ref.current!.removeEventListener('mousemove', onMouseMove);
      ref.current!.removeEventListener('mouseup', onMouseUp);
      ref.current!.removeEventListener('mouseleave', onMouseUp);
    };
  };

  React.useEffect(() => {
    if (focusRef.current) {
      enableDragScroll(focusRef);
    }
    if (recommendationsRef.current) {
      enableDragScroll(recommendationsRef);
    }
  }, []);

  const handleScrollRight = () => {
    if (focusRef.current) {
      const itemWidth = 260 + 16;
      focusRef.current.scrollBy({ left: itemWidth * 3, behavior: 'smooth' });
    }
  };

  const FAQItems = Array.from({ length: 5 });
  const toolItems = Array.from({ length: 12 });
  const focusItems = Array.from({ length: 10 });
  const recommendedItems = Array.from({ length: 10 });

  const toggleDrawer = (newOpen: boolean) => {
    setIsOpenDrawer(newOpen);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'var(--Primary-, #EBE3DD)',
      }}
    >
      <ToolboxDrawer open={isOpenDrawer} toggleDrawer={toggleDrawer}>
        <Box
          sx={{
            minHeight: '97vh',
            maxHeight: '97vh',
            overflow: 'auto',
            borderRadius: '8px',
            padding: '16px 32px',
            backgroundColor: 'white',
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
          <Box sx={{ position: 'relative', marginBottom: '40px' }}>
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
              焦點
            </Typography>
            <Box
              sx={{
                display: 'flex',
                position: 'relative',
              }}
            >
              <Box
                ref={focusRef}
                sx={{
                  gap: '16px',
                  cursor: 'grab',
                  display: 'flex',
                  overflow: 'hidden',
                  marginBottom: '20px',
                  width: '100%',
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
                ))}
              </Box>
              <IconButton
                onClick={handleScrollRight}
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
            </Box>
          </Box>

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
            工具下載
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{
              marginBottom: '20px',
            }}
          >
            {toolItems.map((_, index) => (
              <Grid key={index} component="div" xs={6} sm={4} md={3} lg={2}>
                <Box sx={{ padding: '16px', textAlign: 'center' }}>
                  <WorkRounded
                    sx={{
                      width: '71px',
                      height: '72px',
                      color: 'black',
                      marginBottom: '20px',
                    }}
                  />
                  <Typography variant="body2">工具名称</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
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
            為你推薦
          </Typography>
          <Box sx={{ position: 'relative', marginBottom: '40px' }}>
            <Box
              ref={recommendationsRef}
              sx={{
                gap: '16px',
                cursor: 'grab',
                display: 'flex',
                overflow: 'hidden',
                marginBottom: '20px',
                width: '100%',
              }}
            >
              {recommendedItems.map((_, index) => (
                <Card
                  key={index}
                  sx={{
                    flexShrink: 0,
                    width: '268px',
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
                        overflow: 'hidden',
                        color: 'var(--Primary-Black, #212B36)',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontFamily: 'Open Sans',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: 'normal',
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

          <Box sx={{ padding: '0px' }}>
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
              常見問題
            </Typography>
            {FAQItems.map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  alignItems: 'center',
                  padding: ' 12px 16px',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--Primary-, #EBE3DD)',
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ color: '#4f4f4f' }}>
                    類別
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: '#000', marginTop: '8px' }}
                  >
                    標題
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#4f4f4f', marginTop: '4px' }}
                  >
                    內容
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  sx={{
                    color: 'red',
                    fontSize: '14px',
                    borderColor: 'red',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: '24px',
                    '&:hover': {
                      color: 'darkred',
                      borderColor: 'darkred',
                    },
                  }}
                >
                  更多
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      </ToolboxDrawer>
    </Box>
  );
}
