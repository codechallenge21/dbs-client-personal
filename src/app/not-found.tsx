'use client';
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import NotFoundImage from '@/assets/Images/404.svg';
import Image from 'next/image';

export default function NotFound() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Define conditional styles
  const titleFontSize = isMobile ? '72px' : isTablet ? '96px' : '128px';
  const titleLineHeight = isMobile ? '80px' : isTablet ? '110px' : '137px';
  const subtitleFontSize = isMobile ? '24px' : isTablet ? '32px' : '40px';
  const subtitleLineHeight = isMobile ? '28px' : isTablet ? '38px' : '42.81px';

  return (
    <Box
      sx={{
        minHeight: isMobile ? '960px' : '960px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '8px' : '16px',
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderRadius: '8px',
        gap: '40px',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: titleFontSize,
          fontWeight: 700,
          lineHeight: titleLineHeight,
          textAlign: 'center',
          color: '#000000',
          width: '100%',
          fontFamily: 'DFPHeiUBold-B5',
        }}
      >
        404
      </Typography>

      <Typography
        variant="h5"
        sx={{
          fontSize: subtitleFontSize,
          fontWeight: 700,
          lineHeight: subtitleLineHeight,
          textAlign: 'center',
          width: '100%',
          color: '#000000',
          fontFamily: 'DFPHeiUBold-B5',
        }}
      >
        抱歉，找不到該網頁。<br />請確認輸入正確，或點擊下方按鈕返回首頁。<br />
        如需幫助，歡迎聯繫我們。
      </Typography>

      <Box
        sx={{
          width: '100%',
          maxWidth: isMobile ? '300px' : isTablet ? '450px' : '600px',
          height: isMobile ? '200px' : isTablet ? '275px' : '350px',
          position: 'relative',
          mb: isMobile ? 2 : isTablet ? 3 : 5,
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: isMobile ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
        >
          <Image
            alt="404 Page Image"
            src={NotFoundImage}
            fill
            style={{ objectFit: 'contain' }}
          />
        </Box>
      </Box>

      <Button
        variant="contained"
        href="/"
        sx={{
          backgroundColor: '#5C443A',
          color: '#FFFFFF',
          fontWeight: 400,
          fontFamily: 'DFPHeiUBold-B5',
          px: isMobile ? 2 : isTablet ? 3 : '12px',
          py: isMobile ? 0.5 : isTablet ? 1 : '6px',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#3E2723',
          },
          fontSize: '16px',
          lineHeight: '24px',
          '&:active': {
            transform: 'translateY(0)',
          },
          gap: '8px',
        }}
      >
        回首頁
      </Button>
    </Box>
  );
}
