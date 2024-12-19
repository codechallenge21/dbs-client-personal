"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useRouter } from "next/navigation";

export default function Toolbox() {
  const router = useRouter();
  return (
    <Box sx={{ minHeight: "93.2vh", bgcolor: "#4b4b4b" }}>
      <Container
        maxWidth="xxl"
        sx={{
          pt: "64px",
          px: { xs: "24px", sm: "24px", md: "144px" },
          pb: { md: "120px", xs: "0px", sm: "0px" },
          color: "white",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            marginBottom: { xs: "40px", md: "62px" },
            fontWeight: "bold",
            fontSize: { xs: "28px", md: "40px" },
            fontFamily: "DFPHeiBold, sans-serif",
            alignSelf: "stretch",
          }}
        >
          歡迎使用 智能語音摘要
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: { xs: "auto", md: "453px" },
            }}
          >
            <Box
              sx={{
                bgcolor: "#f5f5f5",
                borderRadius: "16px",
                height: { xs: "200px", sm: "250px", md: "350px" },
                mb: 2,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "#FFF",
                fontFamily: "DFPHeiBold-B5",
                fontSize: { xs: "20px", sm: "24px", md: "32px" },
                mb: '8px',
              }}
            >
              標題
            </Typography>
            <Typography
              sx={{
                color: "#FFF",
                fontFamily: "DFPHeiMedium-B5",
                fontSize: { xs: "14px", sm: "16px" },
                lineHeight: "20px",
              }}
            >
              AI 語音轉文字線上工具可以精準將多種語言的 MP3
              或錄音檔轉文字，並以純文字檔或字幕檔輸出呈現，非常適合用來製作筆記、字幕或會議記錄等。
            </Typography>
          </Box>

          <Box
            sx={{
              border: { xs: "none", md: "2px dashed #0066cc" },
              borderRadius: "16px",
              display: "flex",
              width: { xs: "100%", md: "588px" },
              height: { xs: "auto", md: "453px" },
              padding: { xs: "0px", md: "160px 138px 80px 138px" },
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              flexShrink: 0,
              alignSelf: "stretch",
            }}
          >
            <Typography
              sx={{
                mb: { xs: "20px", md: "40px" },
                color: "var(--Primary-White, #FFF)",
                textAlign: "center",
                fontFamily: "DFPHeiBold-B5",
                fontSize: { xs: "16px", md: "24px" },
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                display: { md: "block", xs: "none" },
              }}
            >
              請將音訊檔案拖曳到這裡上傳
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#0066cc",
                "&:hover": { bgcolor: "#0052a3" },
                mb: 3,
                mt: { md: 0, xs: 18, sm: 14 },
                width: { md: "50%", sm: "50%", xs: "100%" },
                color: "var(--Primary-White, #FFF)",
                fontFamily: "DFPHeiBold-B5",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                px: { md: "16px", xs: 2 },
                py: { md: "12px", xs: '' },
                borderRadius: "8px",
              }}
              onClick={() => {
                router.push("/summary");
              }}
            >
              <FileUploadIcon sx={{ marginRight: 2 }} /> 選擇檔案
            </Button>
            <Typography
              sx={{
                color: "var(--Secondary-Mid-Gray, #9B9B9B)",
                textAlign: "center",
                fontFamily: "DFPHeiBold-B5",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                mb: 1,
              }}
            >
              支援檔案格式：.mp3, .wav, .m4a
            </Typography>
            <Typography
              sx={{
                color: "var(--Secondary-Mid-Gray, #9B9B9B)",
                textAlign: "center",
                fontFamily: "DFPHeiBold-B5",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                mb: 1,
              }}
            >
              限制大小：100MB
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
