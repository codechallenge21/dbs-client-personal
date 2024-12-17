"use client";

import React from "react";
import DropdownMenu from "./DropdownMenu";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { EditRounded, MenuRounded } from "@mui/icons-material";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {isMobile && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            padding: "8px 16px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton>
            <MenuRounded sx={{ color: "black" }} />
          </IconButton>

          <DropdownMenu />

          <IconButton>
            <EditRounded sx={{ color: "black" }} />
          </IconButton>
        </Box>
      )}
      {!isMobile && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            padding: "8px 16px",
            alignItems: "flex-start",
          }}
        >
          <IconButton>
            <MenuRounded sx={{ color: "black" }} />
          </IconButton>

          <IconButton>
            <EditRounded sx={{ color: "black" }} />
          </IconButton>

          <DropdownMenu />
        </Box>
      )}
    </>
  );
}
