"use client";
import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  styled,
  Typography,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useRouter } from "next/navigation";
import { useState } from "react";
import apiExports from "@/utils/hooks/apis/apis";
import useAxiosApi from "@eGroupAI/hooks/apis/useAxiosApi";
import LoadingScreen from "@/components/loading/page";
import { useAudioChannels } from "@/utils/hooks/useAudioChannels";
import SummaryPageWrapper from "@/app/summary/page";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Toolbox() {
  const router = useRouter();
  const { excute: createChannelByAudio, isLoading: isCreating } = useAxiosApi(
    apiExports.createChannelByAudio
  );

  const { data: channelsData } = useAudioChannels({
    organizationId: "4aba77788ae94eca8d6ff330506af944",
  });

  const [dragActive, setDragActive] = useState(false);
  const [, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateFile(e.target.files[0]);
    }
  };

  const validateFile = async (file: File) => {
    try {
      const allowedFormats = [
        "audio/mpeg",
        "audio/mp4",
        "audio/mpga",
        "audio/wav",
        "audio/webm",
        "audio/x-m4a",
      ];
      const maxFileSize = 100 * 1024 * 1024; // 100MB

      if (!allowedFormats.includes(file.type)) {
        setError(
          "不支援的檔案格式，請選擇 mp3, mp4, mpeg, mpga, m4a, wav 或 webm 格式"
        );
        return;
      }

      if (file.size > maxFileSize) {
        setError("檔案大小超過 100MB 限制");
        return;
      }

      setFile(file);

      const res = await createChannelByAudio({
        file,
      });

      const { data } = res;
      const searchParams = new URLSearchParams({
        organizationChannelId: data.organizationChannelId,
      });

      router.push(`/summary?${searchParams.toString()}`);
    } catch (error) {
      setError("上傳失敗");
      console.error(error);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  if (isCreating || !channelsData) {
    return <LoadingScreen />;
  }

  return channelsData && channelsData.length ? (
    <SummaryPageWrapper />
  ) : (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fff" }}>
      <Container maxWidth="xl" sx={{ pt: { xs: 8, md: 20 }, color: "white" }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 6,
            fontWeight: "bold",
            fontSize: { xs: "28px", md: "40px" },
          }}
        >
          歡迎使用 智能語音摘要
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
            px: { xs: 2, sm: 4, md: 8 },
          }}
        >
          <Box>
            <Box
              sx={{
                backgroundImage: `url('/assets/images/toolbox_Voice_to_Text.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                bgcolor: "#FFFFFF",
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
                mb: 2,
              }}
            >
              一鍵實現語音轉文字與AI智能摘要
            </Typography>
            <Typography
              sx={{
                color: "#FFF",
                fontFamily: "DFPHeiMedium-B5",
                fontSize: { xs: "14px", sm: "16px" },
                lineHeight: "20px",
              }}
            >
              AI
              語音轉文字工具，精準轉換錄音檔，快速輸出文字或字幕，筆記、字幕、會議記錄全搞定！
            </Typography>
          </Box>

          <Box
            sx={{
              border: "2px dashed #0066cc",
              borderRadius: "8px",
              p: { xs: 2, sm: 4 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: { xs: "300px", sm: "350px", md: "400px" },
              position: "relative",
              backgroundColor: dragActive ? "#e3f2fd" : "transparent",
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Typography
              sx={{
                mb: 3,
                color: "var(--Primary-White, #FFF)",
                textAlign: "center",
                fontFamily: "DFPHeiBold-B5",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              請將音訊檔案拖曳到這裡上傳
            </Typography>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              sx={{
                bgcolor: "#0066cc",
                "&:hover": { bgcolor: "#0052a3" },
                mb: 3,
                px: { xs: 2, sm: 4 },
                width: "50%",
                color: "var(--Primary-White, #FFF)",
                fontFamily: "DFPHeiBold-B5",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
              startIcon={<FileUploadIcon sx={{ marginRight: 2 }} />}
            >
              選擇檔案
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileUpload}
                accept=".mp3, .mp4, .mpeg, .mpga, .m4a, .wav, .webm"
              />
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
              支援檔案格式：mp3, mp4, mpeg, mpga, m4a, wav, webm
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
          <Snackbar
            open={!!error} // Opens if error is set
            autoHideDuration={6000}
            onClose={handleCloseError}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseError}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </Box>
  );
}
