"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import FileUploadIcon from "@mui/icons-material/FileUpload";

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function UploadDialog({ open, onClose }: UploadDialogProps) {
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

  return (
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
          }}
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<FileUploadIcon />}
        >
          選擇檔案
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => console.log(event.target.files)}
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
            支援檔案格式：.mp3, .wav, .m4a
          </Typography>
          <Typography
            sx={{
              color: "grey.600",
              fontSize: 14,
            }}
          >
            檔案大小：100MB
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
