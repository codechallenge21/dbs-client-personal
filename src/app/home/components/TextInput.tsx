import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import {
  Box,
  IconButton,
  TextareaAutosize,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const TextInput = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: isMobile ? "95%" : "calc(100% - 20px)",
        height: isMobile ? "100px" : "124px",
        maxWidth: "760px",
        position: isMobile ? "absolute" : "relative",
        bottom: isMobile ? 0 : "auto",
        bgcolor: "#F5F5F5",
        borderRadius: 2,
        overflow: "hidden",
        margin: isMobile ? 3 : 0,
      }}
    >
      <TextareaAutosize
        minRows={2}
        maxRows={10}
        placeholder="傳訊息給智能顧問"
        style={{
          width: "100%",
          paddingTop: isMobile ? "20px" : "24px",
          paddingRight: "20px",
          paddingBottom: isMobile ? "20px" : "24px",
          paddingLeft: "20px",
          borderRadius: "8px",
          border: "none",
          outline: "none",
          resize: "none",
          fontSize: isMobile ? "16px" : "24px",
          color: "#000",
          backgroundColor: "#F5F5F5",
          overflow: "auto",
        }}
      />
      <IconButton
        sx={{
          position: "absolute",
          bottom: "12px",
          left: "10px",
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
          right: "10px",
        }}
      >
        <MicRoundedIcon sx={{ color: "black" }} />
      </IconButton>
    </Box>
  );
};

export default TextInput;
