"use client";

import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { usePathname } from "next/navigation";

const menuItems = [
  { text: "知識庫", href: "#" },
  { text: "財務快報", href: "#" },
  { text: "工具箱", href: "/toolbox" },
  { text: "解決麻煩事", href: "/chat" },
];

const toolItems = [
  { text: "智能語音摘要", href: "/toolbox/ai-summary" },
  { text: "家系圖", href: "/toolbox/family-tree" },
  { text: "財務盤點表", href: "/toolbox/financial-statement" },
  { text: "債務試算模擬器", href: "/toolbox/debt-calculator" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    hasChildren?: boolean
  ) => {
    if (!hasChildren) return;
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleExpandItem = (item: string) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item, index) => (
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleExpandItem(item.text)}
                sx={{
                  color: pathname.startsWith(item.href) ? "primary.main" : "text.primary",
                }}
              >
                <ListItemText primary={item.text} />
                {index === menuItems.length - 2 ? (
                  expandedItem === "工具箱" ? (
                    <ArrowDropDownIcon />
                  ) : (
                    <ArrowRightIcon />
                  )
                ) : (
                  <ArrowRightIcon />
                )}
              </ListItemButton>
            </ListItem>
            {item.text === "工具箱" && expandedItem === "工具箱" && (
              <List component="div" disablePadding>
                {toolItems.map((tool) => (
                  <ListItemButton key={tool.text} sx={{ pl: 4 }}>
                    <ListItemText primary={tool.text} />
                  </ListItemButton>
                ))}
              </List>
            )}
          </React.Fragment>
        ))}
      </List>
      <Box sx={{ p: 2, borderColor: "divider" }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "error.main",
            "&:hover": { bgcolor: "error.dark" },
            borderRadius: "8px",
          }}
        >
          登入
        </Button>
      </Box>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ bgcolor: "background.paper", boxShadow: 1 }}>
      <Container
        maxWidth="xl"
        sx={{
          "&.MuiContainer-root": {
            paddingLeft: "16px",
            paddingRight: "16px",
          },
        }}
      >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "text.primary",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            好理家在
          </Typography>

          <Box
            sx={{
              gap: 2,
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.text}
                endIcon={item.text !== "解決麻煩事" && <ArrowDropDownIcon />}
                onClick={(e) => handleMenuOpen(e, item.text !== "解決麻煩事")}
                sx={{
                  color: pathname.startsWith(item.href) ? "primary.main" : "text.primary",
                }}
              >
                {item.text}
              </Button>
            ))}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              {toolItems.map((tool) => (
                <MenuItem key={tool.text} onClick={handleMenuClose}>
                  {tool.text}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Button
            variant="contained"
            sx={{
              bgcolor: "error.main",
              "&:hover": { bgcolor: "error.dark" },
              borderRadius: 0,
              px: 3,
              display: { xs: "none", md: "block" },
            }}
          >
            登入
          </Button>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon sx={{ color: "text.primary" }} />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
            height: "100%",
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}
