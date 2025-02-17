'use client';

import {
  Box,
  Typography,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ContentCopy,
  ArrowBack,
  ThumbDownOffAltRounded,
} from '@mui/icons-material';
import SourceCards from './sourceCard';

export interface SourceData {
  title: string;
  url: string;
  isViewMore?: boolean;
}

export default function InformationPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const cardsData = [
    '對低收入家庭進行評估和篩選,通過相對提撥或相對儲蓄的方式,協助他們實現特定目標,如高等教育、創業、購屋等,以協助他們自立和脫貧。',
    '推動「兒童與少年未來教育及發展帳戶方案」,通過家長及政府的配合儲蓄,協助弱勢家庭兒少未來的發展,使他們能夠自立脫貧。',
    '委託社會福利機構,對經濟弱勢且目前無就業的人提供就業輔導。',
    '對參與脫貧方案但未能持續投入的家庭進行關懷訪視和個案輔導,提供家庭收支管理等協助。',
  ];

  const Questions = [
    '如何評估低收入家庭的需求？',
    '政府有哪些具體措施來協助脫貧？',
    '參與脫貧方案的家庭有什麼條件？',
  ];

  const sourceData = [
    {
      title: '運用自立脫貧方案、衝刺部協助(中)低收入戶兒少脫離貧窮',
      url: 'dep.mohw.gov.tw',
    },
    {
      title: '推動兒童及少年未來教育與發展帳戶－協助弱勢孩童自立脫貧',
      url: 'dep.mohw.gov.tw',
    },
    {
      title: '推動兒童及少年未來教育與發展帳戶－協助弱勢孩童自立脫貧',
      url: 'dep.mohw.gov.tw',
    },
    {
      title: '查看更多 +4',
      url: '',
      isViewMore: true,
    },
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
        來源
      </Typography>

      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={2}
        sx={{ mb: 4, flexWrap: 'wrap', gap: 2 }}
      >
        <SourceCards sourceData={sourceData} />
      </Stack>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ArrowBack />
          <Typography>回覆</Typography>
        </Box>
        <IconButton role="button" aria-label="copy">
          <ContentCopy />
        </IconButton>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography sx={{ mb: 2 }}>
          根據搜索結果,政府和社會組織採取了以下措施協助個案脫貧:
        </Typography>
        <Stack spacing={2}>
          {cardsData.map((text, index) => (
            <Typography key={index} sx={{ display: 'flex', gap: 1 }}>
              {index + 1}. {text}
            </Typography>
          ))}
        </Stack>
      </Box>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <ThumbDownOffAltRounded sx={{ transform: 'rotate(180deg)' }} />
        <ThumbDownOffAltRounded />
      </Box>

      <Box>
        <Typography
          variant="h6"
          sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              bgcolor: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: '#fff' }}>?</Typography>
          </Box>
          相關問題
        </Typography>

        <Stack spacing={1}>
          {Questions.map((question, index) => (
            <Box
              key={index}
              sx={{
                bgcolor: '#6d4c41',
                color: 'white',
                p: 2,
                borderRadius: 1,
              }}
            >
              <Typography>{question}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
