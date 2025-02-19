import AppsIcon from '@mui/icons-material/Apps';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';

export const HomeNavBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#0d0402' }}>
      <Container
        sx={{
          maxWidth: '1200px',
          textAlign: 'center',
        }}
      >
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              role="button"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Image
                src="/assets/images/logomark.png"
                alt="Logomark"
                style={{ width: 32, height: 32 }}
                width={32}
                height={32}
              />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Epilogue-Bold', Helvetica",
                  fontWeight: 'bold',
                  color: '#ff5733',
                }}
              >
                HelpNet
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton role="button" aria-label="search" color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton role="button" aria-label="apps" color="inherit">
              <AppsIcon />
            </IconButton>
            <Avatar
              alt="User Avatar"
              src="/assets/images/person.png"
              sx={{ width: 40, height: 40 }}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HomeNavBar;
