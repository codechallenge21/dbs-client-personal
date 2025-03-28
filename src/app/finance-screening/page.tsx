'use client';
import { Box, CircularProgress } from '@mui/material';
import { Suspense } from 'react';
import FinanceScreeningTest from './FinanceScreeningTest';

export default function FinanceScreeningPage() {
  return (
    // 使用Box元素包裝並設置overflow屬性來覆蓋全局樣式
    <Box sx={{ 
      height: '100vh', 
      overflowY: 'auto', // 允許垂直滾動 
      overflowX: 'hidden', // 隱藏水平滾動條
      margin: '-16px', // 抵消全局body的padding
      padding: '16px', // 恢復內容邊距
    }}>
      <Suspense fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      }>
        <FinanceScreeningTest />
      </Suspense>
    </Box>
  );
}