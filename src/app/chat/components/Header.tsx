"use client";

import React from "react";
import DropdownMenu from "./DropdownMenu";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { EditRounded, MenuRounded } from "@mui/icons-material";

interface HeaderProps {
  open?: boolean;
  setIsopen?: boolean;
  title: string;
  toggleDrawer?: (open: boolean) => void;
}

export default function Header({ open, toggleDrawer = () => {}, title }: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {isMobile && (
        <>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              padding: "4px 8px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton onClick={() => toggleDrawer(true)}>
              <MenuRounded sx={{ color: "black" }} />
            </IconButton>

            <DropdownMenu title={title} />

            <IconButton>
              <EditRounded sx={{ color: "black" }} />
            </IconButton>
          </Box>
        </>
      )}
      {!isMobile && (
        <Box
          sx={{
            width: "54%",
            display: "flex",
            padding: "16px 16px",
            alignItems: "flex-start",
            justifyContent: open ? "space-between" : "flex-start",
          }}
        >
          {!open && (
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
          )}
          <DropdownMenu title={title} />
        </Box>
      )}
    </>
  );
}
