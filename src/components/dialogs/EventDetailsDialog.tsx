'use client';

import { Close as CloseIcon } from '@mui/icons-material';
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import boxImage from '../../../public/assets/images/box.png';

interface EventDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

export default function EventDetailsDialog({
  open,
  onClose,
  title = '標題',
}: EventDetailsDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Drawer
      anchor={isMobile ? 'bottom' : 'right'}
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          display: 'flex',
          maxWidth: isMobile ? '100%' : '430px',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'flex-start',
          flexShrink: 0,
          borderRadius: isMobile ? '8px 8px 0 0' : '8px',
          alignSelf: 'stretch',
          backgroundColor: '#ffffff',
          marginTop: isMobile ? '0' : '16px',
          marginRight: isMobile ? '0' : '16px',
          height: isMobile ? 'auto' : 'calc(100vh - 30px)',
          top: isMobile ? '112px' : '',
        },
      }}
      variant={isMobile ? 'temporary' : 'persistent'}
    >
      <Box
        sx={{
          width: '100%',
          pt: isMobile ? 1 : 0,
          pb: isMobile ? 1 : 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '62px',
          pl: '16px',
          gap: '8px',
        }}
      >
        <Typography
          variant={isMobile ? 'subtitle1' : 'h6'}
          sx={{
            color: 'var(--Primary-Black, #212B36)',
            fontFamily: 'var(--font-bold)',
            fontSize: '24px',
          }}
        >
          {title}
        </Typography>
        <IconButton
          role="button"
          aria-label="close"
          onClick={onClose}
          size={isMobile ? 'small' : 'medium'}
        >
          <CloseIcon sx={{ color: '#212B36' }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          padding: isMobile ? '8px' : '16px',
          gap: '16px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Image
          src={boxImage}
          alt="Boxed Image"
          quality={100}
          style={{
            width: '100%',
            height: isMobile ? '30%' : '24%',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
        <Box
          sx={{
            padding: '16px 0px 16px 12px',
            width: '100%',
            borderRadius: '8px',
            backgroundColor: '#EBE3DD',
            height: isMobile ? '69%' : '75%',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
              borderRadius: '12px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#637381',
              opacity: '0.48',
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: '#4a5a68',
              },
            },
          }}
        >
          <Typography
            sx={{
              whiteSpace: 'pre-line',
              color: '#212B36',
              fontFamily: 'var(--font-medium)',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '24px',
            }}
          >
            {`活動公告：推動兒童及少年未來教育與發展帳戶
親愛的家長與社區夥伴：

我們誠摯地邀請您參加「兒童與少年未來教育及發展帳戶」的推廣活動！這是一項旨在幫助弱勢家庭的孩子們自立脫貧的計畫，透過政府與家長的共同努力，為孩子們的未來打下堅實的基礎。

活動詳情如下：
日期：107年6月12日
地點：衛福部會議室
時間：上午10:00 - 下午3:00

活動內容：
1. 介紹兒童與少年未來教育及發展帳戶的運作方式及申請流程。
2. 分享成功案例，讓您了解如何透過這個計畫改變孩子的未來。
3. 提供現場諮詢，解答您對於帳戶的任何疑問。

我們相信，孩子是國家的未來，透過這項計畫，能夠幫助他們克服貧窮的限制，實現更美好的明天。期待您的參與，讓我們一起為孩子們的未來努力！

活動公告：推動兒童及少年未來教育與發展帳戶
親愛的家長與社區夥伴：

我們誠摯地邀請您參加「兒童與少年未來教育及發展帳戶」的推廣活動！這是一項旨在幫助弱勢家庭的孩子們自立脫貧的計畫，透過政府與家長的共同努力，為孩子們的未來打下堅實的基礎。

活動詳情如下：
日期：107年6月12日
地點：衛福部會議室
時間：上午10:00 - 下午3:00

活動內容：
1. 介紹兒童與少年未來教育及發展帳戶的運作方式及申請流程。
2. 分享成功案例，讓您了解如何透過這個計畫改變孩子的未來。
3. 提供現場諮詢，解答您對於帳戶的任何疑問。

我們相信，孩子是國家的未來，透過這項計畫，能夠幫助他們克服貧窮的限制，實現更美好的明天。期待您的參與，讓我們一起為孩子們的未來努力！
`}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}
