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

  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  console.log("file", file);

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
      // setFile(e.dataTransfer.files[0]);
      validateFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("files11", e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      // setFile(e.target.files[0]);
      validateFile(e.target.files[0]);
    }
  };

  const validateFile = async (file: File) => {
    const allowedFormats = ["audio/mpeg", "audio/wav", "audio/x-m4a"];
    const maxFileSize = 100 * 1024 * 1024; // 100MB

    if (!allowedFormats.includes(file.type)) {
      setError("不支持的檔案格式，請選擇 mp3, wav 或 m4a 格式");
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
    console.log("res", res);
    console.log("isCreating", isCreating);
    const { data } = res;

    const searchParams = new URLSearchParams({
      organizationChannelId: data.organizationChannelId,
      organizationChannelTitle: data.organizationChannelTitle,
      organizationChannelType: data.organizationChannelType,
    });

    router.push(`/summary?${searchParams.toString()}`);
  };
  console.log("isCreating", isCreating);

  const handleCloseError = () => {
    setError(null);
  };

  if (isCreating) {
    return <LoadingScreen />;
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#4b4b4b" }}>
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
          歡迎使用 AI語音轉文字
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
                mb: 2,
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
                accept=".mp3, .wav, .m4a"
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
