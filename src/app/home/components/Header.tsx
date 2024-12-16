"use client";

import React from "react";
import DropdownMenu from "./DropdownMenu";
import { Box, IconButton } from "@mui/material";
import { EditRounded, MenuRounded } from "@mui/icons-material";

export default function Header() {
  return (
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
  );
}
