"use client";
import NotFoundImage from "@/assets/Images/404.svg";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { Suspense } from "react";

// Create a client component for content that might use client hooks
function NotFoundContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const titleFontSize = isMobile ? "48px" : isTablet ? "64px" : "80px";
  const titleLineHeight = isMobile ? "56px" : isTablet ? "72px" : "90px";
  const subtitleFontSize = isMobile ? "18px" : isTablet ? "22px" : "26px";
  const subtitleLineHeight = isMobile ? "24px" : isTablet ? "28px" : "32px";

  return (
    <Box
      sx={{
        minHeight: { xs: "calc(100vh - 32px)", sm: "96vh" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 4, md: 6 },
        backgroundColor: "#fff",
        borderRadius: "8px",
        margin: { xs: "16px", sm: 0 },
        pb: { xs: "16px", sm: "32px" },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: titleFontSize,
          fontWeight: 700,
          lineHeight: titleLineHeight,
          textAlign: "center",
          color: "#000000",
          fontFamily: "var(--font-bold)",
        }}
      >
        404
      </Typography>

      <Typography
        variant="h6"
        sx={{
          fontSize: subtitleFontSize,
          fontWeight: 700,
          lineHeight: subtitleLineHeight,
          textAlign: "center",
          color: "#000000",
          fontFamily: "var(--font-medium)",
        }}
      >
        請檢查網址或返回首頁
        <br />
        如需協助，請聯絡我們
      </Typography>

      <Box
        sx={{
          width: isMobile ? "200px" : isTablet ? "280px" : "350px",
          height: isMobile ? "140px" : isTablet ? "200px" : "250px",
          position: "relative",
          mb: 2,
          mx: "auto",
        }}
      >
        <Image
          alt="404 Page Image"
          src={NotFoundImage}
          fill
          style={{ objectFit: "contain" }}
        />
      </Box>

      <Button
        variant="contained"
        href="/"
        sx={{
          backgroundColor: "#5C443A",
          color: "#FFFFFF",
          fontWeight: 400,
          fontFamily: "var(--font-bold)",
          padding: "6px 12px",
          borderRadius: "8px",
          fontSize: "14px",
          "&:hover": {
            backgroundColor: "#3E2723",
          },
        }}
      >
        回首頁
      </Button>
    </Box>
  );
}

// Main NotFound component with proper Suspense implementation
export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}
