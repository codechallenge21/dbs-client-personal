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

  const titleFontSize = isMobile ? '48px' : isTablet ? '64px' : '80px';
  const titleLineHeight = isMobile ? '56px' : isTablet ? '72px' : '90px';
  const subtitleFontSize = isMobile ? '18px' : isTablet ? '22px' : '26px';
  const subtitleLineHeight = isMobile ? '24px' : isTablet ? '28px' : '32px';

  return (
    <Box
      sx={{
        minHeight: '96vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, sm: 4, md: 6 },
        backgroundColor: '#fff',
        borderRadius: '8px',
        margin: { xs: '16px', sm: 0 },
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
          fontFamily: 'DFPHeiUBold-B5',
        }}
      >
        404
      </Typography>

      <Typography
        variant="h6"
        sx={{
          fontSize: subtitleFontSize,
          fontWeight: 700,
          lineHeight: subtitleLineHeight,
          textAlign: 'center',
          color: '#000000',
          fontFamily: 'DFPHeiMedium-B5',
        }}
      >
        抱歉，找不到該網頁。
        <br />
        請確認輸入正確，或點擊下方按鈕返回首頁。
        <br />
        如需幫助，歡迎聯繫我們。
      </Typography>

      <Box
        sx={{
          width: isMobile ? '200px' : isTablet ? '280px' : '350px',
          height: isMobile ? '140px' : isTablet ? '200px' : '250px',
          position: 'relative',
          mb: 2,
          mx: 'auto',
        }}
      >
        <Image
          alt="404 Page Image"
          src={NotFoundImage}
          fill
          style={{ objectFit: 'contain' }}
        />
      </Box>

      <Button
        variant="contained"
        href="/"
        sx={{
          backgroundColor: '#5C443A',
          color: '#FFFFFF',
          fontWeight: 400,
          fontFamily: 'DFPHeiBold-B5',
          padding: '6px 12px',
          borderRadius: '8px',
          fontSize: '14px',
          '&:hover': {
            backgroundColor: '#3E2723',
          },
        }}
      >
        回首頁
      </Button>
    </Box>
  );
}
