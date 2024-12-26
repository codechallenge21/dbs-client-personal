"use client";

import React, { useState } from "react";
import {
  Button,
  Dialog,
  useTheme,
  Typography,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  useMediaQuery,
  TextField,
  DialogContentText,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  deletableName?: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  deletableName,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "460px",
          minHeight: "80px",
          maxHeight: "calc(100% - 64px)",
          borderRadius: "16px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          paddingTop: "8px",
          paddingLeft: "24px",
          paddingRight: "11px",
          paddingBottom: "8px",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            height: "40px",
            color: "#000",
            fontSize: "24px",
            fontWeight: "400",
            fontStyle: "normal",
            lineHeight: "normal",
            fontFamily: "DFPHeiBold-B5",
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

      <DialogContent>
        <DialogContentText
          sx={{
            wordBreak: "break-all",
            color: "#000",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "20px",
            fontFamily: "DFPHeiMedium-B5",
          }}
        >
          {`您確定要刪除 "${deletableName}" 嗎？`}
        </DialogContentText>
        {!!deletableName && (
          <TextField
            id="delete-dialog-name-input"
            data-tid="delete-dialog-name-input"
            variant="standard"
            sx={{ width: "100%", pt: 2 }}
            placeholder="請輸入名稱以刪除"
            onChange={(e) => {
              e.preventDefault();
              const { value } = e.target;
              setInputValue(value);
            }}
          />
        )}
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingTop: "0px !important",
          paddingLeft: "32px !important",
          paddingRight: "24px !important",
          paddingBottom: "16px !important",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={onConfirm}
          disabled={deletableName !== undefined && deletableName !== inputValue}
          sx={{
            padding: isMobile ? "8px 16px" : "6px 12px",
            borderRadius: "8px",
            backgroundColor: "red",
          }}
        >
          <Typography
            sx={{
              padding: "0px",
              fontSize: "14px",
              fontWeight: "700",
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
