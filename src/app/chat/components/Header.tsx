"use client";

import React from "react";
import DropdownMenu from "./DropdownMenu";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { EditRounded, MenuRounded } from "@mui/icons-material";
import UploadDialog from "@/components/uploadDialog/page";
import { AdvisorType } from "./types";
import FileUploadIcon from "@mui/icons-material/FileUpload";

interface HeaderProps {
  open?: boolean;
  setIsopen?: boolean;
  advisor: AdvisorType;
  isChat?: boolean;
  toggleDrawer?: (open: boolean) => void;
}

export default function Header({
  open,
  toggleDrawer = () => {},
  advisor,
  isChat = false,
}: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openUpload, setOpenUpload] = React.useState(false);

  const handleOpenUpload = () => {
    setOpenUpload(false);
  };

  return (
    <Box>
      {isMobile && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton onClick={() => toggleDrawer(true)}>
              <MenuRounded sx={{ color: "black" }} />
            </IconButton>
            {isChat && <DropdownMenu advisor={advisor} />}
            {isChat ? (
              <IconButton>
                <EditRounded sx={{ color: "black" }} />
              </IconButton>
            ) : (
              <IconButton onClick={() => isChat ? null : setOpenUpload(true)}>
                <FileUploadIcon sx={{ color: "black" }} />
              </IconButton>
            )}{" "}
          </Box>
        </>
      )}
      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            padding: "8px 16px",
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

              {isChat ? (
                <IconButton>
                  <EditRounded sx={{ color: "black" }} />
                </IconButton>
              ) : (
                <IconButton onClick={() => isChat ? null : setOpenUpload(true)}>
                  <FileUploadIcon sx={{ color: "black" }} />
                </IconButton>
              )}
            </Box>
          )}
          {isChat && <DropdownMenu advisor={advisor} />}
        </Box>
      )}
      {!isChat && <UploadDialog open={openUpload} onClose={handleOpenUpload} /> }
    </Box>
  );
}
