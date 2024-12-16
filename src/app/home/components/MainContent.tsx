import { Grid2, Typography } from "@mui/material";
import InputBox from "./InputBox";

export default function MainContent() {
  return (
    <Grid2
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "70vh", textAlign: "center" }}
    >
      <Grid2>
        <Typography
          sx={{
            color: "#000",
            fontFamily: "DFPHeiBold-B5",
            fontSize: "32px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
          }}
          mb={5}
        >
          嘿！我能為你做些什麼？
        </Typography>
      </Grid2>

      <Grid2>
        <InputBox />
      </Grid2>
    </Grid2>
  );
}
