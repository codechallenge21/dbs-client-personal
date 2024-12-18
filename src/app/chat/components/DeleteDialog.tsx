"use client";

import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 1,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 16px 8px 32px",
        }}
      >
        <Typography
          sx={{
            color: "#000",
            fontFamily: "DFPHeiBold-B5",
            fontSize: "32px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
          }}
        >
          刪除紀錄
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: "black",
          }}
        >
          <CloseRounded />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          padding: "32px !important",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "32px",
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            color: "#000",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "20px",
            fontFamily: "DFPHeiMedium-B5",
          }}
        >
          這將刪除 <strong>頻道名稱</strong>。
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={onConfirm}
          sx={{
            borderRadius: "16px",
            textTransform: "none",
            backgroundColor: "red",
            padding: "0px",
          }}
        >
          <Typography
            sx={{
              padding: "11px 16px",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "normal",
            }}
          >
            刪除
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
