'use client'

import React, { useState } from 'react'
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
} from '@mui/material'
import { Menu as MenuIcon, KeyboardArrowDown } from '@mui/icons-material'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [knowledgeAnchor, setKnowledgeAnchor] = useState<null | HTMLElement>(null)
  const [financeAnchor, setFinanceAnchor] = useState<null | HTMLElement>(null)
  const [toolsAnchor, setToolsAnchor] = useState<null | HTMLElement>(null)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, setAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>) => {
    setAnchor(event.currentTarget)
  }

  const handleMenuClose = (setAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>) => {
    setAnchor(null)
  }

  const menuItems = [
    { text: '知識庫', color: 'black', anchor: knowledgeAnchor, setAnchor: setKnowledgeAnchor },
    { text: '財務快餐', color: 'black', anchor: financeAnchor, setAnchor: setFinanceAnchor },
    { text: '工具箱', color: '#0066cc', anchor: toolsAnchor, setAnchor: setToolsAnchor },
  ]

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.text} sx={{ color: item.color }} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="解決麻煩事" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#cc0000',
                '&:hover': { bgcolor: '#aa0000' },
                borderRadius: 0,
                width: '100%',
              }}
            >
              登入
            </Button>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Box sx={{ bgcolor: '#4b4b4b', boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.32)' }}>
      <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: 'none' }}>
        <Container  maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: 'black',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              好理家在
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
              {menuItems.map((item) => (
                <React.Fragment key={item.text}>
                  <Button
                    endIcon={<KeyboardArrowDown />}
                    onClick={(e) => handleMenuOpen(e, item.setAnchor)}
                    sx={{ color: item.color }}
                  >
                    {item.text}
                  </Button>
                  <Menu
                    anchorEl={item.anchor}
                    open={Boolean(item.anchor)}
                    onClose={() => handleMenuClose(item.setAnchor)}
                  >
                    <MenuItem>Option 1</MenuItem>
                    <MenuItem>Option 2</MenuItem>
                  </Menu>
                </React.Fragment>
              ))}

              <Typography sx={{ color: 'black' }}>解決麻煩事</Typography>

              <Button
                variant="contained"
                sx={{
                  bgcolor: '#cc0000',
                  '&:hover': { bgcolor: '#aa0000' },
                  borderRadius: 0,
                  px: 3,
                }}
              >
                登入
              </Button>
            </Box>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon sx={{ color: 'black' }} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}

