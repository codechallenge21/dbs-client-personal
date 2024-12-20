import React, { useState } from "react";
import {
  Box,
  useTheme,
  IconButton,
  useMediaQuery,
  TextareaAutosize,
} from "@mui/material";
import {
  MicRounded,
  SendRounded,
  AttachFileRounded,
} from "@mui/icons-material";

const TextInput = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [text, setText] = useState("");

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: isMobile ? "95%" : "calc(100% - 20px)",
        maxWidth: "760px",
        minHeight: "108px",
        position: isMobile ? "fixed" : "relative",
        bottom: isMobile ? 0 : "auto",
        backgroundColor: "#F5F5F5",
        overflow: "hidden",
        margin: isMobile ? 3 : 0,
        borderRadius: "16px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          paddingTop: "8px",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "8px",
        }}
      >
        <TextareaAutosize
          minRows={1}
          maxRows={10}
          placeholder="傳訊息給智能顧問"
          value={text}
          onChange={handleTextChange}
          style={{
            width: "100%",
            color: "#000",
            border: "none",
            outline: "none",
            resize: "none",
            overflow: "auto",
            alignContent: "center",
            backgroundColor: "#F5F5F5",
            fontSize: isMobile ? "16px" : "24px",
          }}
        />
      </Box>
      <Box
        sx={{
          bottom: 0,
          width: "100%",
          padding: "12px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton>
          <AttachFileRounded sx={{ color: "black" }} />
        </IconButton>
        <IconButton>
          {text ? (
            <SendRounded sx={{ color: "black" }} />
          ) : (
            <MicRounded sx={{ color: "black" }} />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default TextInput;
