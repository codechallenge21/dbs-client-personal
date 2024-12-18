import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import TextInput from "./TextInput";

export default function MainContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: isMobile ? "flex-end" : "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          color: "#000",
          fontFamily: "DFPHeiBold-B5",
          fontSize: "32px",
          fontWeight: "400",
          mb: isMobile ? 50 : 5,
        }}
      >
        嘿！我能為你做些什麼？
      </Typography>

      <TextInput />
    </Box>
  );
}
