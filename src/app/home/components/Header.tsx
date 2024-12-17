"use client";

import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { EditRounded, MenuRounded } from "@mui/icons-material";
import Toolbox from "@/components/toolbox/page";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };
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
          <Box>
            <IconButton onClick={() => toggleDrawer(true)}>
              <MenuRounded sx={{ color: "black" }} />
            </IconButton>
            <Toolbox open={open} toggleDrawer={toggleDrawer} />
          </Box>

          <DropdownMenu />

          <IconButton>
            <EditRounded sx={{ color: "black" }} />
          </IconButton>
        </Box>
      )}
      {!isMobile && (
        <Box
          sx={{
            width: "54%",
            display: "flex",
            padding: "8px 16px",
            alignItems: "flex-start",
            justifyContent: open ? "space-between" : "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <IconButton onClick={() => toggleDrawer(true)}>
              <MenuRounded sx={{ color: "black" }} />
            </IconButton>

            <IconButton>
              <EditRounded sx={{ color: "black" }} />
            </IconButton>
          </Box>
          <DropdownMenu />
          <Toolbox open={open} toggleDrawer={toggleDrawer} />
        </Box>
      )}
    </>
  );
}
