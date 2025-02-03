'use client';

import { Card, Typography, Stack } from '@mui/material';
import { SourceData } from './chatResponsePlaceholder';

export default function SourceCards({
  sourceData,
}: {
  sourceData: SourceData[];
}) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        width: '100%',
        flexWrap: 'wrap',
        pb: 1,
      }}
    >
      {sourceData.map((item, index) => (
        <Card
          key={index}
          sx={{
            flex: '1 1 calc(25% - 8px)',
            bgcolor: '#f2ece7',
            p: 2,
            boxShadow: 'none',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            mb: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              mb: 1.5,
              minHeight: item.isViewMore ? 'auto' : 40,
              color: item.isViewMore ? '#666' : 'inherit',
              textAlign: item.isViewMore ? 'center' : 'inherit',
              display: 'flex',
              alignItems: item.isViewMore ? 'center' : 'inherit',
              justifyContent: item.isViewMore ? 'center' : 'inherit',
              height: item.isViewMore ? '100%' : 'auto',
            }}
          >
            {item.title}
          </Typography>
          {!item.isViewMore && (
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: '#d32f2f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XC6y7jhw9RaWXuvcKuwT1jCLy515Xj.png"
                  alt="source icon"
                  width={12}
                  height={12}
                  style={{ borderRadius: '50%' }}
                />
              </div>
              <Typography sx={{ color: '#d32f2f', fontSize: 14 }}>
                {item.url}
              </Typography>
            </div>
          )}
        </Card>
      ))}
    </Stack>
  );
}
