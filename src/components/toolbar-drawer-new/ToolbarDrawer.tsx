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
  EmojiObjectsRounded,
  PermIdentityRounded,
  LocalFireDepartmentRounded,
  AddRounded,
} from '@mui/icons-material';
import {
  Box,
  List,
  Button,
  useTheme,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { usePathname, useRouter } from 'next/navigation';

interface ToolbarDrawerProps {
  open: boolean;
  children: React.ReactNode;
  setOpenUpload?: (open: boolean) => void;
  setIsOpenDrawer: (open: boolean) => void;
}

const drawerItems = [
  {
    text: '發燒內容',
    icon: (
      <LocalFireDepartmentRounded
        sx={{
          color: '#CC0000',
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
  children,
  setOpenUpload,
  setIsOpenDrawer,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true); // Track expanded/collapsed state
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setIsClient(true);
  }, []);

  // useEffect(() => {
  //   if (!isMobile) setIsOpenDrawer(true);
  // }, [isMobile, setIsOpenDrawer]);

  if (!isClient) {
    return null;
  }

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
            padding: '16px 0 8px 0',
            flexDirection: isExpanded ? 'row' : 'column',
            alignItems: isExpanded ? 'center' : 'stretch',
            justifyContent: isExpanded ? 'space-between' : 'center',
          }}
        >
          {isExpanded && (
            <Typography
              sx={{
                color: 'var(--Primary-Black, #212B36)',
                fontFamily: 'DFPHeiBold-B5',
                fontSize: '20px',
                fontWeight: 800,
              }}
            >
              好理家在
            </Typography>
          )}
          {!isExpanded && (
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: '20px',
                textAlign: 'center',
                fontFamily: 'DFPHeiBold-B5',
                color: 'var(--Primary-Black, #212B36)',
              }}
            >
              好
            </Typography>
          )}
          <IconButton
            onClick={() => {
              if (isMobile) {
                setIsOpenDrawer(!open);
              } else {
                setIsExpanded((prev) => {
                  const newState = !prev;
                  setIsOpenDrawer(newState);
                  return newState;
                });
              }
            }}
            sx={{ color: 'black', padding: '8px' }}
          >
            <MenuOpenRounded />
          </IconButton>
        </ListItem>
        {isExpanded && (
          <ListItem
            sx={{
              display: 'flex',
              padding: ' 8px',
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
              onClick={() => {
                if (setOpenUpload) setOpenUpload(true);
              }}
            >
              + New Chat
            </Button>
          </ListItem>
        )}

        {!isExpanded && (
          <IconButton
            sx={{
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '50px',
              justifyContent: 'center',
              border: '1px solid var(--Primary-Black, #212B36)',
            }}
          >
            <AddRounded sx={{ color: 'black' }} />
          </IconButton>
        )}

        <Box
          sx={{
            gap: '8px',
            display: 'flex',
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
                    : 'transparent',
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
                  alignItems: 'center',
                  color: index === 0 ? '#CC0000' : 'black',
                }}
              >
                <span>{item.icon}</span>
                {isExpanded && (
                  <span style={{ marginLeft: 8 }}>{item.text}</span>
                )}
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
        {isExpanded && (
          <>
            <Box
              sx={{
                display: 'flex',
                padding: '16px',
                alignItems: 'center',
              }}
            >
              <PermIdentityRounded
                sx={{ color: 'black', marginRight: '8px' }}
              />
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
          </>
        )}
        {!isExpanded && (
          <>
            <IconButton
              sx={{
                width: '36px',
                height: '36px',
                padding: '8px',
                display: 'flex',
                borderRadius: '50px',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--Secondary-, #5C443A)',
                '&:hover': {
                  background: 'rgba(92, 68, 58, 0.8)',
                },
                '&:active': {
                  background: 'rgba(92, 68, 58, 0.6)',
                },
              }}
            >
              <PermIdentityRounded sx={{ color: 'white' }} />
            </IconButton>
            {isExpanded && (
              <IconButton
                sx={{
                  width: '36px',
                  height: '36px',
                  padding: '8px',
                  display: 'flex',
                  borderRadius: '50px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--Secondary-, #5C443A)',
                  '&:hover': {
                    background: 'rgba(92, 68, 58, 0.8)',
                  },
                  '&:active': {
                    background: 'rgba(92, 68, 58, 0.6)',
                  },
                }}
              >
                <EmojiObjectsRounded sx={{ color: 'white' }} />
              </IconButton>
            )}
            <IconButton
              sx={{
                width: '36px',
                height: '36px',
                padding: '8px',
                display: 'flex',
                borderRadius: '50px',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--Secondary-, #5C443A)',
                '&:hover': {
                  background: 'rgba(92, 68, 58, 0.8)',
                },
                '&:active': {
                  background: 'rgba(92, 68, 58, 0.6)',
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '16px',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  lineHeight: 'normal',
                  color:
                    'var(--Components-Button-Contained-Inherit-Text, #FFF)',
                }}
              >
                諮
              </Typography>
            </IconButton>
          </>
        )}
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
            '& .MuiDrawer-paper': {
              width: isExpanded ? drawerWidth : 56,
              height: '97%',
              margin: '16px',
              borderRadius: '8px',
            },
          }}
          onClose={() => setIsOpenDrawer(!open)}
          variant={isMobile ? 'temporary' : 'permanent'}
        >
          {DrawerList}
        </CustomDrawer>
      ) : (
        <Drawer
          open={open}
          sx={{
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: isExpanded ? drawerWidth : 72,
              height: '96%',
              margin: '16px',
              borderRadius: '8px',
            },
          }}
          onClose={() => setIsOpenDrawer(false)}
          variant={isMobile ? 'temporary' : 'persistent'}
        >
          {DrawerList}
        </Drawer>
      )}

      <Box
        sx={{
          overflow: 'auto',
          marginRight: '16px',
          marginBottom: '16px',
          transition: 'margin-left 0.3s',
          marginLeft: isExpanded && !isMobile ? '255px' : '80px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ToolbarDrawer;
