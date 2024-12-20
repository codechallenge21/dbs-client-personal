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

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function UploadDialog({ open, onClose }: UploadDialogProps) {
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
          borderRadius: '16px',
          border: "2px dashed #2196f3",
          margin: "32px",
          justifyContent: "center",
          height: "352px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: "#2196f3",
            color: "white",
            mb: "40px",
            "&:hover": {
              bgcolor: "#1976d2",
            },
          }}
        >
          選擇檔案
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
