"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Add from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface ToolboxProps {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
}

const Toolbox: React.FC<ToolboxProps> = ({ open, toggleDrawer }) => {
  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      <List>
        <ListItemButton
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <MenuIcon />
          <Add />
        </ListItemButton>
      </List>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
              <MoreHorizIcon />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      open={open}
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
          top: "74px",
          height: "calc(100% - 64px)",
        },
      }}
      onClose={() => toggleDrawer(false)}
      variant="persistent"
    >
      {DrawerList}
    </Drawer>
  );
};

export default Toolbox;
