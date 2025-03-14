import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '好理家在-財務健檢網｜好好理財，家才會在',
  description:
    '探索好理家在-財務健檢網！AI驅動的家庭財務管理平台，整合社工經驗，提供財務健檢、風險評估與社福資源。立即體驗智能理財，守護您的家！',
  keywords:
    '家庭財務管理,財務健檢,好好理財,社工財務輔導,AI財務分析,社福資源整合,財務快篩工具,家系圖自動生成',
  manifest: '/manifest.json',
  icons: [
    {
      rel: 'icon',
      url: '/favicon/favicon.svg',
    },
    {
      rel: 'icon',
      type: 'image/svg',
      sizes: '16x16',
      url: '/favicon/favicon.svg',
    },
    {
      rel: 'icon',
      type: 'image/svg',
      sizes: '32x32',
      url: '/favicon/favicon.svg',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/favicon.svg',
    },
  ],
};
