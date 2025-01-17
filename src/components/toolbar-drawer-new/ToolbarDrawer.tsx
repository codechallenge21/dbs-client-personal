'use client';
import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import {
  StarRounded,
  PaidRounded,
  BuildRounded,
  CampaignRounded,
  MenuOpenRounded,
  PsychologyRounded,
  AutoStoriesRounded,
  PermIdentityRounded,
  LocalFireDepartmentRounded,
  EmojiObjectsRounded,
} from '@mui/icons-material';
import {
  Box,
  List,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { usePathname, useRouter } from 'next/navigation';

interface ToolbarDrawerProps {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
  children: React.ReactNode;
}

const drawerItems = [
  {
    text: '發燒內容',
    icon: (
      <LocalFireDepartmentRounded
        sx={{
          color: 'red',
          marginRight: '16px',
        }}
      />
    ),
    route: '/popular',
  },
  {
    text: '我的最愛',
    icon: <StarRounded sx={{ color: 'black', marginRight: '8px' }} />,
    route: '/favorite',
  },
  {
    text: '活動公告',
    icon: <CampaignRounded sx={{ color: 'black', marginRight: '8px' }} />,
    route: '/events',
  },
  {
    text: '解決麻煩事',
    icon: <PsychologyRounded sx={{ color: 'black', marginRight: '8px' }} />,
    route: '/chat',
  },
  {
    text: '工具箱',
    icon: <BuildRounded sx={{ color: 'black', marginRight: '8px' }} />,
    route: '/toolbox',
  },
  {
    text: '財務快篩',
    icon: <PaidRounded sx={{ color: 'black', marginRight: '8px' }} />,
    route: '/financial-screening',
  },
  {
    text: '知識庫',
    icon: <AutoStoriesRounded sx={{ color: 'black', marginRight: '8px' }} />,
    route: '/knowledge-base',
  },
];

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const CustomDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}));

const ToolbarDrawer: React.FC<ToolbarDrawerProps> = ({
  open,
  toggleDrawer,
  children,
}) => {
  const pathname = usePathname(); // Get the current path
  const router = useRouter(); // Navigation
  const theme = useTheme();
  const [isClient, setIsClient] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  console.log('open', open);

  useEffect(() => {
    // Ensure this component renders only on the client
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isMobile) toggleDrawer(true);
  }, [isMobile, toggleDrawer]);

  if (!isClient) {
    return null; // Avoid mismatches by skipping rendering on the server
  }

  console.log('pathname', pathname);

  const DrawerList = (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <List sx={{ padding: '0 8px', flexGrow: 1 }}>
        <ListItem
          sx={{
            display: 'flex',
            padding: '8px 0',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              color: 'var(--Primary-Black, #212B36)',
              fontFamily: 'DFPHeiUBold-B5',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: 800,
              lineHeight: 'normal',
            }}
          >
            好理家在
          </Typography>
          <IconButton
            onClick={() => {
              if (isMobile) toggleDrawer(!open);
            }}
            sx={{ color: 'black', padding: '8xp' }}
          >
            <MenuOpenRounded />
          </IconButton>
        </ListItem>

        <ListItem
          sx={{
            display: 'flex',
            padding: '8px 0 16px',
            justifyContent: 'space-between',
          }}
        >
          <Button
            sx={{
              gap: '8px',
              width: '100%',
              color: 'black',
              height: '38px',
              padding: '8px',
              display: 'flex',
              borderRadius: '8px',
              alignItems: 'center',
              alignSelf: 'stretch',
              justifyContent: 'center',
              border: '1px solid var(--Primary-Black, #212B36)',
            }}
          >
            + New Chat
          </Button>
        </ListItem>
        <Box
          sx={{
            gap: '8px',
            display: 'flex',
            alignSelf: 'stretch',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
          }}
        >
          {drawerItems.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                padding: '8px',
                borderRadius: '8px',
                backgroundColor:
                  pathname === item.route ||
                  (pathname === '/' && item.route === '/chat')
                    ? 'var(--Action-Selected, rgba(204, 0, 0, 0.20))'
                    : 'transparent', // Active state
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
                cursor: 'pointer',
              }}
              onClick={() => router.push(item.route)}
            >
              <Typography
                sx={{
                  display: 'flex',
                  fontWeight: 400,
                  fontSize: '16px',
                  overflow: 'hidden',
                  fontStyle: 'normal',
                  lineHeight: 'normal',
                  alignItems: 'center',
                  textOverflow: 'ellipsis',
                  fontFamily: 'DFPHeiBold-B5',
                  color: index === 0 ? 'red' : 'black',
                }}
              >
                <span>{item.icon}</span> {item.text}
              </Typography>
            </ListItem>
          ))}
        </Box>
      </List>
      <Box
        sx={{
          gap: '8px',
          padding: '8px',
          display: 'flex',
          alignSelf: 'stretch',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            padding: '16px',
            alignItems: 'center',
          }}
        >
          <PermIdentityRounded sx={{ color: 'black', marginRight: '8px' }} />
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              overflow: 'hidden',
              fontStyle: 'normal',
              lineHeight: 'normal',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              fontFamily: 'DFPHeiBold-B5',
              color: 'var(--Primary-Black, #212B36)',
            }}
          >
            UserName
          </Typography>
        </Box>
        <Button
          sx={{
            gap: '8px',
            color: 'white',
            display: 'flex',
            padding: '4px 8px',
            borderRadius: '8px',
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--Secondary-, #5C443A)',
          }}
        >
          <EmojiObjectsRounded sx={{ color: 'white' }} />
          許願池
        </Button>
        <Button
          sx={{
            gap: '8px',
            color: 'white',
            display: 'flex',
            padding: '4px 8px',
            borderRadius: '8px',
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--Secondary-, #5C443A)',
          }}
        >
          諮詢師專區
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box>
      {!isMobile ? (
        <CustomDrawer
          open={true}
          sx={{
            flexShrink: 0,
            backgroundColor: '#ffffff',
            '& .MuiDrawer-paper': {
              height: '97%',
              margin: '16px',
              borderRadius: '8px',
            },
          }}
          onClose={() => toggleDrawer(!open)}
          variant={isMobile ? 'temporary' : 'permanent'}
        >
          {DrawerList}
        </CustomDrawer>
      ) : (
        <Drawer
          open={open}
          sx={{
            flexShrink: 0,
            backgroundColor: '#ffffff',
            '& .MuiDrawer-paper': {
              width: 250,
              height: '96%',
              margin: '16px',
              borderRadius: '8px',
            },
          }}
          onClose={() => toggleDrawer(false)}
          variant={isMobile ? 'temporary' : 'persistent'}
        >
          {DrawerList}
        </Drawer>
      )}

      <Box
        sx={{
          overflow: 'auto',
          transition: 'margin-left 0.3s',
          marginLeft: open && !isMobile ? '260px' : '0',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ToolbarDrawer;
