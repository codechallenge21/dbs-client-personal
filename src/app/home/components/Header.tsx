"use client";

import { useState } from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DropdownMenu from "./DropdownMenu";

export default function Header() {
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #ddd",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        paddingX: 2,
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        {/* Left: Menu Icon */}
        <Grid item xs={2} display="flex" alignItems="center">
          <IconButton>
            <MenuIcon fontSize="medium" />
          </IconButton>
        </Grid>

        {/* Center: Dropdown */}
        <Grid item xs={8} display="flex" justifyContent="center">
          {/* <Box
            display="flex"
            alignItems="center"
            sx={{
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: "8px",
              paddingX: 2,
              paddingY: 1,
              backgroundColor: "#f9f9f9",
              "&:hover": { backgroundColor: "#eaeaea" },
            }}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Typography fontWeight="bold" fontSize={16} mr={1}>
              債務事件顧問
            </Typography>
            <ExpandMoreIcon />
          </Box> */}
          <DropdownMenu />
        </Grid>

        {/* Right: Placeholder */}
        <Grid item xs={2} display="flex" justifyContent="flex-end">
          <Typography variant="body2" color="primary" fontWeight="bold">
            登入
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
