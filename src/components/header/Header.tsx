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
  Stack,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const menuItems = [
  { text: "知識庫", color: "text.primary" },
  { text: "財務快報", color: "text.primary" },
  { text: "工具箱", color: "primary.main" },
];

const toolItems = [
  { text: "智能語音摘要", href: "/toolbox" },
  { text: "家系圖", href: "/tools/family-tree" },
  { text: "財務盤點表", href: "/tools/financial-statement" },
  { text: "債務試算模擬器", href: "/tools/debt-calculator" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
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
              <ListItemButton onClick={() => handleExpandItem(item.text)}>
                <ListItemText primary={item.text} sx={{ color: item.color }} />
                {index === menuItems.length - 1 ? (
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
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="解決麻煩事" />
          </ListItemButton>
        </ListItem>
      </List>
      <Stack spacing={2} sx={{ p: 2, borderColor: "divider" }}>
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
        <Button
          fullWidth
          variant="outlined"
          href="https://forms.gle/Jrq5bDjKzqmp82gQ8"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            borderRadius: "8px",
          }}
        >
          意見回饋
        </Button>
      </Stack>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "background.paper", boxShadow: 1 }}
    >
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
                endIcon={<ArrowDropDownIcon />}
                onClick={handleMenuOpen}
                sx={{ color: item.color }}
              >
                {item.text}
              </Button>
            ))}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {toolItems.map((tool) => (
                <MenuItem 
                  key={tool.text} 
                  onClick={handleMenuClose}
                  component="a"
                  href={tool.href}
                >
                  {tool.text}
                </MenuItem>
              ))}
            </Menu>
            <Button 
              sx={{ color: "text.primary" }}
              href="/chat"
            >
                解決麻煩事
            </Button>
          </Box>
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Button
              variant="outlined"
              href="https://forms.gle/Jrq5bDjKzqmp82gQ8"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderRadius: 0,
                px: 3,
              }}
            >
              意見回饋
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: "error.main",
                "&:hover": { bgcolor: "error.dark" },
                borderRadius: 0,
                px: 3,
              }}
            >
              登入
            </Button>
          </Stack>

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
