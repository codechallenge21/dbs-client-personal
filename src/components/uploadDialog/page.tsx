"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Box,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useRouter } from "next/navigation";
import useAxiosApi from "@eGroupAI/hooks/apis/useAxiosApi";
import apiExports from "@/utils/hooks/apis/apis";
import { useState } from "react";
import LoadingScreen from "../loading/page";

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function UploadDialog({ open, onClose }: UploadDialogProps) {
  const router = useRouter();
  const [, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { excute: createChannelByAudio, isLoading: isCreating } = useAxiosApi(
    apiExports.createChannelByAudio
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      validateFile(e.target.files[0]);
      e.target.value = "";
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
      onClose();

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

  if (isCreating) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          bgcolor: "white",
          zIndex: 1,
        }}
      >
        <LoadingScreen />
      </Box>
    );
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            maxWidth: "400px",
            bgcolor: "#fff",
            borderRadius: "16px",
            width: "324px",
            justifyContent: "center",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          上傳檔案
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "grey.500",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "16px",
            border: "2px dashed #2196f3",
            margin: "32px",
            justifyContent: "center",
            height: "352px",
          }}
        >
          <Button
            component="label"
            sx={{
              bgcolor: "#2196f3",
              color: "white",
              mb: "40px",
              "&:hover": {
                bgcolor: "#1976d2",
              },
              zIndex: 1,
            }}
            variant="contained"
            startIcon={<FileUploadIcon />}
          >
            選擇檔案
            <input
              type="file"
              onChange={handleFileUpload}
              accept=".mp3, .wav, .m4a"
              style={{ display: "none" }}
            />
          </Button>

          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                color: "grey.600",
                fontSize: 14,
                mb: 0.5,
                width: "100%",
                height: "auto",
              }}
            >
              支援檔案格式：mp3, mp4, mpeg, mpga, m4a, wav, webm
            </Typography>
            <Typography
              sx={{
                color: "grey.600",
                fontSize: 14,
              }}
            >
              限制大小：100MB
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
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
    </>
  );
}
