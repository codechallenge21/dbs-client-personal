'use client';
import React, { useState, useEffect, useContext } from 'react';
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
  LoginRounded,
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import ChannelContentContext from '../channel-context-provider/ChannelContentContext';

interface ToolbarDrawerProps {
  open: boolean;
  openDataSource?: boolean;
  children: React.ReactNode;
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
    text: '我的收藏',
    icon: <StarRounded sx={{ color: '#212B36' }} />,
    route: '/favorite',
  },
  {
    text: '活動公告',
    icon: <CampaignRounded sx={{ color: '#212B36' }} />,
    route: '/events',
  },
  {
    text: '解決麻煩事',
    icon: <PsychologyRounded sx={{ color: '#212B36' }} />,
    route: '/chat',
  },
  {
    text: '工具箱',
    icon: <BuildRounded sx={{ color: '#212B36' }} />,
    route: '/toolbox',
  },
  {
    text: '財務快篩',
    icon: <PaidRounded sx={{ color: '#212B36' }} />,
    route: '/finance',
  },
  {
    text: '知識庫',
    icon: <AutoStoriesRounded sx={{ color: '#212B36' }} />,
    route: '/knowledge-base',
  },
];

const MainBox = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  /**
   * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
   * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
   * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
   * proper interaction with the underlying content.
   */
  position: 'relative',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const drawerWidth = 240;

const isLogin = Cookies.get('tid') || null;
const token = Cookies.get('m_info') || null;
const decodedHeader = token ? jwtDecode(token, { header: true }) : null;
const loginName = decodedHeader ? (decodedHeader as any).loginName : null;

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
  setIsOpenDrawer,
  openDataSource = false,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true); // Track expanded/collapsed state
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { selectedChannel, selectedChannelId, isInteractingInChat } =
    useContext(ChannelContentContext);

  const resetChat = () => {
    if (selectedChannel || selectedChannelId || isInteractingInChat) {
      if (pathname === '/chat' && !searchParams.has('organizationChannelId')) {
        window.location.reload();
      } else {
        router.push('/chat');
      }
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.delete('organizationChannelId');
    router.push('/chat');
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isMobile) setIsOpenDrawer(true);
  }, [isMobile, setIsOpenDrawer]);

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
            padding: !isExpanded && !isMobile ? '16px 0px 8px 0px' : '8px 0',
            flexDirection: isExpanded || isMobile ? 'row' : 'column',
            alignItems: isExpanded || isMobile ? 'center' : 'stretch',
            justifyContent: isExpanded || isMobile ? 'space-between' : 'center',
            gap: isExpanded || isMobile ? '0' : '8px',
          }}
        >
          {(isExpanded || isMobile) && (
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
          {!isExpanded && !isMobile && (
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: '20px',
                textAlign: 'center',
                fontFamily: 'DFPHeiBold-B5',
                color: 'var(--Primary-Black, #212B36)',
                lineHeight: 'normal',
              }}
            >
              好
            </Typography>
          )}
          <IconButton
            role="button"
            aria-label="Expand/Collapse"
            onClick={() => {
              if (isMobile) {
                setIsOpenDrawer(!open);
              } else {
                setIsOpenDrawer(!isExpanded);
                setIsExpanded((prev) => !prev);
              }
            }}
            sx={{
              color: '#212B36',
              padding: '8px',
              transform: !isExpanded && !isMobile ? 'rotate(180deg)' : 'none',
            }}
          >
            <MenuOpenRounded />
          </IconButton>
        </ListItem>
        {(isExpanded || isMobile) && (
          <ListItem
            sx={{
              display: 'flex',
              padding: '0',
              py: '8px',
              justifyContent: 'space-between',
            }}
          >
            <Button
              role="button"
              aria-label="New Chat"
              sx={{
                height: '40px',
                width: '100%',
                padding: '8px',
                display: 'flex',
                borderRadius: '8px',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--Primary-Black, #212B36)',
                color: 'var(--Primary-Black, #212B36)',
              }}
              onClick={() => {
                resetChat();
              }}
            >
              <AddRounded sx={{ color: '#212B36', fontSize: '18px' }} />
              <Typography
                sx={{
                  display: 'flex',
                  fontFamily: 'Public Sans',
                  fontSize: '13px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  alignItems: 'center',
                  lineHeight: 'normal',
                }}
              >
                AI問答
              </Typography>
            </Button>
          </ListItem>
        )}

        {!isExpanded && !isMobile && (
          <IconButton
            role="button"
            aria-label="New Chat"
            sx={{
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '50px',
              justifyContent: 'center',
              border: '1px solid var(--Primary-Black, #212B36)',
              mt: '8px',
            }}
            onClick={() => {
              resetChat();
            }}
          >
            <AddRounded sx={{ color: '#212B36', fontSize: '20px' }} />
          </IconButton>
        )}

        <ListItem sx={{ padding: '0px' }}>
          <List
            sx={{
              gap: '8px',
              width: '100%',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
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
                    (pathname === '/' && item.route === '/chat') ||
                    (pathname === '/channel-summary' &&
                      item.route === '/toolbox')
                      ? 'var(--Action-Selected, rgba(204, 0, 0, 0.20))'
                      : 'transparent',
                  '&:hover': {
                    backgroundColor: '#FBEDED',
                  },
                  cursor: 'pointer',
                  height: isExpanded || isMobile ? '48px' : 'auto',
                }}
                onClick={() => {
                  if (index === 3) {
                    if (
                      selectedChannel ||
                      selectedChannelId ||
                      isInteractingInChat
                    ) {
                      if (
                        pathname === '/chat' &&
                        !searchParams.has('organizationChannelId')
                      ) {
                        window.location.reload();
                      } else {
                        router.push('/chat');
                      }
                      return;
                    }
                  }
                  router.push(item.route);
                }}
              >
                <Typography
                  sx={{
                    display: 'flex',
                    fontWeight: 400,
                    fontSize: '16px',
                    alignItems: 'center',
                    color: index === 0 ? '#CC0000' : '#212B36',
                    fontFamily: 'DFPHeiBold-B5',
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {item.icon}
                  </span>
                  {(isExpanded || isMobile) && (
                    <span style={{ marginLeft: index === 0 ? '0px' : '8px' }}>
                      {item.text}
                    </span>
                  )}
                </Typography>
              </ListItem>
            ))}
          </List>
        </ListItem>
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
        {(isExpanded || isMobile) && (
          <>
            {isLogin ? (
              <Button
                role="button"
                aria-label="Logout"
                sx={{
                  display: 'flex',
                  // padding: '16px',
                  alignItems: 'center',
                }}
              >
                <PermIdentityRounded
                  sx={{ color: '#212B36', marginRight: '8px' }}
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
                  {loginName}
                </Typography>
              </Button>
            ) : (
              <Button
                role="button"
                aria-label="Logout"
                sx={{
                  gap: '8px',
                  color: '#212B36',
                  display: 'flex',
                  padding: '11px 16px',
                  borderRadius: '8px',
                  alignSelf: 'stretch',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid var(--Primary-Black, #212B36)',
                  background: 'var(--Primary-White, #FFF)',
                  fontFamily: 'Public Sans',
                  fontSize: '15px',
                  fontWeight: 700,
                  lineHeight: 'normal',
                }}
              >
                <LoginRounded sx={{ color: '#212B36' }} />
                登入
              </Button>
            )}
            <Button
              role="button"
              aria-label="Wishing Pool"
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
                fontFamily: 'Public Sans',
                fontSize: '13px',
                fontWeight: 700,
                lineHeight: 'normal',
                height: '30px',
              }}
            >
              <EmojiObjectsRounded sx={{ color: 'white', fontSize: '18px' }} />
              許願池
            </Button>
            <Button
              role="button"
              aria-label="Consultant Area"
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
                fontFamily: 'Public Sans',
                fontSize: '13px',
                fontWeight: 700,
                lineHeight: 'normal',
                height: '30px',
              }}
            >
              諮詢師專區
            </Button>
          </>
        )}
        {!isExpanded && !isMobile && (
          <>
            {!isLogin ? (
              <IconButton
                role="button"
                aria-label="Login"
                sx={{
                  width: '36px',
                  height: '36px',
                  padding: '8px',
                  display: 'flex',
                  borderRadius: '50px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid var(--Primary-Black, #212B36)',
                  background: 'var(--Primary-White, #FFF)',
                  '&:hover': {
                    background: 'rgba(92, 68, 58, 0.8)',
                  },
                  '&:active': {
                    background: 'rgba(92, 68, 58, 0.6)',
                  },
                }}
              >
                <LoginRounded sx={{ color: '#212B36', fontSize: '20px' }} />
              </IconButton>
            ) : (
              <IconButton
                role="button"
                aria-label="Logout"
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
                <PermIdentityRounded
                  sx={{ color: 'white', fontSize: '20px' }}
                />
              </IconButton>
            )}
            <IconButton
              role="button"
              aria-label="Wsihing Pool"
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
              <EmojiObjectsRounded sx={{ color: 'white', fontSize: '20px' }} />
            </IconButton>
            <IconButton
              role="button"
              aria-label="Consultant Area"
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
          open={open}
          sx={{
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: isExpanded || isMobile ? drawerWidth : 56, // Adjust drawer width
              height: 'calc(100vh - 32px)',
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
            zIndex: !open ? 0 : 1200,
            transition: 'z-index 225ms',
            '& .MuiDrawer-paper': {
              width: isExpanded || isMobile ? drawerWidth : 72,
              height: '100%',
              borderRadius: '0 8px 8px 0',
            },
            pointerEvents: !open ? 'none' : 'auto',
          }}
          onClose={() => setIsOpenDrawer(false)}
          variant={'temporary'}
        >
          {DrawerList}
        </Drawer>
      )}

      <MainBox
        open={openDataSource}
        sx={{
          height: '100vh',
          marginRight: isMobile ? 0 : openDataSource ? '446px' : 0,
          overflow: 'auto',
          marginBottom: '16px',
          transition: 'margin-left 0.3s',
          marginLeft:
            isExpanded && !isMobile ? '255px' : isMobile ? '0' : '75px',
        }}
      >
        {children}
      </MainBox>
    </Box>
  );
};

export default ToolbarDrawer;
