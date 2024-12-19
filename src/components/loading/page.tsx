"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
export default function LoadingScreen() {

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        height: "80vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          marginBottom: 2,
          fontWeight: 500,
        }}
      >
        正在處理中...
      </Typography>

      <Typography
        sx={{
          marginBottom: 3,
          color: "text.secondary",
        }}
      >
        這可能需要幾秒鐘的時間，請不要離開頁面。
      </Typography>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          width: "100%",
          maxWidth: "600px",
          height: 8,
          borderRadius: 4,
          "& .MuiLinearProgress-bar": {
            borderRadius: 4,
            backgroundColor: "#1976d2",
          },
          backgroundColor: "#e3f2fd",
        }}
      />
    </Box>
  );
}