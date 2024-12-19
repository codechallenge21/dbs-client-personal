import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import TextInput from "./TextInput";

export default function MainContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        paddingTop: isMobile ? "192px" : "0px",
        paddingLeft: isMobile ? "16px" : "0px",
        paddingRight: isMobile ? "16px" : "0px",
        paddingBottom: isMobile ? "16px" : "0px",
      }}
    >
      {isMobile ? (
        <>
          <Typography
            sx={{
              color: "#000",
              fontFamily: "DFPHeiBold-B5",
              fontSize: "32px",
              fontWeight: "400",
            }}
          >
            嘿！
          </Typography>
          <Typography
            sx={{
              color: "#000",
              fontFamily: "DFPHeiBold-B5",
              fontSize: "32px",
              fontWeight: "400",
              mb: "319px",
            }}
          >
            我能為你做些什麼？
          </Typography>
        </>
      ) : (
        <Typography
          sx={{
            color: "#000",
            fontFamily: "DFPHeiBold-B5",
            fontSize: "32px",
            fontWeight: "400",
            mb: 5,
          }}
        >
          嘿！我能為你做些什麼？
        </Typography>
      )}
      <TextInput />
    </Box>
  );
}
