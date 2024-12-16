import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material'

export default function AudioTranscription() {

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#4b4b4b' }}>

      <Container maxWidth="xl" sx={{ paddingTop: 20, color: 'white' }}>
        <Typography
          variant="h3"
          align="center"
          sx={{ mb: 6, fontWeight: 'bold' }}
        >
          歡迎使用 AI語音轉文字
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 4,
            px: 8,
          }}
        >
          <Box>
            <Box
              sx={{
                bgcolor: '#f5f5f5',
                borderRadius: '16px',
                height: '320px',
                mb: 2,
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              標題
            </Typography>
            <Typography sx={{ color: '#cccccc', fontSize: '14px', lineHeight: 1.6 }}>
              AI 語音轉文字線上工具可以精準將多種語言的 MP3 或錄音檔轉文字，並以純文字檔或字幕檔輸出呈現，非常適合用來製作筆記、字幕或會議記錄等。
            </Typography>
          </Box>

          <Box
            sx={{
              border: '2px dashed #0066cc',
              borderRadius: '8px',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px',
            }}
          >
            <Typography sx={{ mb: 3, color: 'white', textAlign: 'center' }}>
              請將音訊檔案拖曳到這裡上傳
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#0066cc',
                '&:hover': { bgcolor: '#0052a3' },
                mb: 3,
                px: 4,
              }}
            >
              選擇檔案
            </Button>
            <Typography sx={{ color: '#999999', fontSize: '14px', mb: 1 }}>
              支援檔案格式：.mp3, .wav, .m4a
            </Typography>
            <Typography sx={{ color: '#999999', fontSize: '14px' }}>
              限制大小：100MB
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

