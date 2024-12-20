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
import { useCallback, useState } from "react";
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

// 處理狀態的常數
const ProcessingStatus = {
  IDLE: 'IDLE',
  UPLOADING: 'UPLOADING',
  UPLOAD_COMPLETE: 'UPLOAD_COMPLETE',
  UPLOAD_ERROR: 'UPLOAD_ERROR',
  TRANSCRIBING: 'TRANSCRIBING',
  TRANSCRIBE_COMPLETE: 'TRANSCRIBE_COMPLETE',
  TRANSCRIBE_ERROR: 'TRANSCRIBE_ERROR',
  SUMMARIZING: 'SUMMARIZING',
  SUMMARY_COMPLETE: 'SUMMARY_COMPLETE',
  SUMMARY_ERROR: 'SUMMARY_ERROR',
  COMPLETE: 'COMPLETE'
};

export default function Toolbox() {
  const router = useRouter();
  const { excute: createChannelByAudio, isLoading: isCreating } = useAxiosApi(
    apiExports.createChannelByAudio
  );

  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState(ProcessingStatus.IDLE);
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');

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
    setStatus(ProcessingStatus.UPLOAD_COMPLETE);

    const { data } = res;
    startSSEConnection(data.organizationChannelId);


    // const searchParams = new URLSearchParams({
    //   organizationChannelId: data.organizationChannelId,
    // });

    // router.push(`/summary?${searchParams.toString()}`);
  };

  const handleCloseError = () => {
    setError(null);
  };

    // 建立 SSE 連接
    const startSSEConnection = useCallback((jobId) => {
      const eventSource = new EventSource(`/api/v1/organizations/4aba77788ae94eca8d6ff330506af944/channels/status/${jobId}`);
  
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setStatus(data.status);
  
        switch (data.status) {
          case ProcessingStatus.TRANSCRIBE_COMPLETE:
            setTranscript(data.transcript);
            break;
          case ProcessingStatus.SUMMARY_COMPLETE:
            setSummary(data.summary);
            break;
          case ProcessingStatus.COMPLETE:
            eventSource.close();
            break;
          case ProcessingStatus.UPLOAD_ERROR:
          case ProcessingStatus.TRANSCRIBE_ERROR:
          case ProcessingStatus.SUMMARY_ERROR:
            setError(data.error);
            eventSource.close();
            break;
        }
      };
  
      eventSource.onerror = () => {
        setError('連接中斷');
        eventSource.close();
      };
  
      return () => {
        eventSource.close();
      };
    }, [setError]);


  console.log("sse status", status);
  console.log("sse transcript", transcript);
  console.log("sse summary", summary);

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
              一鍵實現語音轉文字與智能摘要
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
