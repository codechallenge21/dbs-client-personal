import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import { Box, IconButton, TextareaAutosize } from "@mui/material";
import React from "react";

const TextInput = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "760px",
        bgcolor: "#F5F5F5",
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <TextareaAutosize
        minRows={3}
        maxRows={12}
        placeholder="傳訊息給智能顧問"
        style={{
          width: "100%",
          padding: "24px 20px",
          borderRadius: "8px",
          border: "none",
          outline: "none",
          resize: "none",
          fontSize: "24px",
          color: "#000",
          backgroundColor: "#F5F5F5",
          overflow: "auto",
        }}
      />
      <IconButton
        sx={{
          position: "absolute",
          bottom: "12px",
          left: "14px",
        }}
      >
        <AttachFileRoundedIcon
          sx={{ transform: "rotate(180deg)", color: "black" }}
        />
      </IconButton>
      <IconButton
        sx={{
          position: "absolute",
          bottom: "12px",
          right: "14px",
        }}
      >
        <MicRoundedIcon sx={{ color: "black" }} />
      </IconButton>
    </Box>
  );
};

export default TextInput;
