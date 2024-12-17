import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function Toolbox() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#4b4b4b' }}>
      <Container maxWidth="xl" sx={{ pt: { xs: 8, md: 20 }, color: 'white' }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 6,
            fontWeight: 'bold',
            fontSize: { xs: '28px', md: '40px' },
          }}
        >
          歡迎使用 AI語音轉文字
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            px: { xs: 2, sm: 4, md: 8 },
          }}
        >
          <Box>
            <Box
              sx={{
                bgcolor: '#f5f5f5',
                borderRadius: '16px',
                height: { xs: '200px', sm: '250px', md: '350px' },
                mb: 2,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: '#FFF',
                fontFamily: 'DFPHeiBold-B5',
                fontSize: { xs: '20px', sm: '24px', md: '32px' },
                mb: 2,
              }}
            >
              標題
            </Typography>
            <Typography
              sx={{
                color: '#FFF',
                fontFamily: 'DFPHeiMedium-B5',
                fontSize: { xs: '14px', sm: '16px' },
                lineHeight: '20px',
              }}
            >
              AI 語音轉文字線上工具可以精準將多種語言的 MP3 或錄音檔轉文字，並以純文字檔或字幕檔輸出呈現，非常適合用來製作筆記、字幕或會議記錄等。
            </Typography>
          </Box>

          <Box
            sx={{
              border: '2px dashed #0066cc',
              borderRadius: '8px',
              p: { xs: 2, sm: 4 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: { xs: '300px', sm: '350px', md: '400px' },
            }}
          >
            <Typography
              sx={{
              mb: 3,
              color: 'var(--Primary-White, #FFF)',
              textAlign: 'center',
              fontFamily: 'DFPHeiBold-B5',
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              }}
            >
              請將音訊檔案拖曳到這裡上傳
            </Typography>
            <Button
              variant="contained"
              sx={{
              bgcolor: '#0066cc',
              '&:hover': { bgcolor: '#0052a3' },
              mb: 3,
              px: { xs: 2, sm: 4 },
              width: '50%',
              color: 'var(--Primary-White, #FFF)',
              fontFamily: 'DFPHeiBold-B5',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              }}
            >
            <FileUploadIcon  sx={{marginRight: 2}}/>  選擇檔案
            </Button>
            <Typography
              sx={{
              color: 'var(--Secondary-Mid-Gray, #9B9B9B)',
              textAlign: 'center',
              fontFamily: 'DFPHeiBold-B5',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              mb: 1
              }}
            >
              支援檔案格式：.mp3, .wav, .m4a
            </Typography>
            <Typography
               sx={{
                color: 'var(--Secondary-Mid-Gray, #9B9B9B)',
                textAlign: 'center',
                fontFamily: 'DFPHeiBold-B5',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
                mb: 1}}
            >
              限制大小：100MB
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
