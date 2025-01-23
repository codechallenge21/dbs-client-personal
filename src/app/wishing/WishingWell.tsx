'use client';
import React, { useRef, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  Button,
  Typography,
  IconButton,
  CardContent,
} from '@mui/material';
import { ArrowForwardIosRounded, WorkRounded } from '@mui/icons-material';
import Image from 'next/image';
import boxImage from '../../../public/assets/images/box.png';
import ToolboxDrawer from '@/components/toolbox-drawer-new/ToolboxDrawer';

export default function WishinWell() {
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
  
    const toolItems = Array.from({ length: 12 });
    const focusItems = Array.from({ length: 10 });
  
    const toggleDrawer = (newOpen: boolean) => {
      setIsOpenDrawer(newOpen);
    };

return (
  <Box>
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
            你可能感興趣
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
  </Box>
);