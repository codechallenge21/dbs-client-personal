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
  ArrowDropUpRounded,
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
import ChannelContentContext from '@/context/ChannelContentContext';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import apis from '@/utils/hooks/apis/apis';
import UserActionMenu from '../user-action-menu/UserActionMenu';

interface ToolbarDrawerProps {
  open: boolean;
  openDataSource?: boolean;
  children: React.ReactNode;
  setIsOpenDrawer: (open: boolean) => void;
  setIsLoginOpen?: (open: boolean) => void;
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
    route: '', //popular
  },
  {
    text: '我的收藏',
    icon: <StarRounded sx={{ color: '#212B36' }} />,
    route: '/favorite',
  },
  {
    text: '活動公告',
    icon: <CampaignRounded sx={{ color: '#212B36' }} />,
    route: '', //events,
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
    route: '', //financial-screening
  },
  {
    text: '知識庫',
    icon: <AutoStoriesRounded sx={{ color: '#212B36' }} />,
    route: '', //knowledge-base
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

const isLogin = Cookies.get('u_tid') || null;
const token = Cookies.get('u_info') || null;
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
  setIsLoginOpen,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { excute: logout } = useAxiosApi(apis.logout);

  const [isClient, setIsClient] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true); // Track expanded/collapsed state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Helper function to delete a cookie by name
  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  };

  const handleLogout = async () => {
    // Optionally, close any open menus/dialogs
    handleClose();

    try {
      const response = await logout();

      if (response.status === 200) {
        // Clear authentication-related cookies
        deleteCookie('u_lid');
        deleteCookie('u_tid');
        deleteCookie('u_info');
        // Optionally, clear CSRF token cookie if applicable
        deleteCookie('XSRF-TOKEN');

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to logout:', error);
      // Optionally handle errors (e.g., log or display an error message)
    }
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
                fontFamily: 'var(--font-bold)',
                fontSize: '20px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
              onClick={() => router.push('/chat')}
            >
              <img
                src="/assets/images/logo.png"
                alt="logo"
                style={{ width: '110px' }}
              />
            </Typography>
          )}
          {!isExpanded && !isMobile && (
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: '20px',
                textAlign: 'center',
                fontFamily: 'var(--font-bold)',
                color: 'var(--Primary-Black, #212B36)',
                lineHeight: 'normal',
                cursor: 'pointer',
              }}
              onClick={() => router.push('/chat')}
            >
              <img src="/assets/images/logocollapse.png" alt="logo" />
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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              marginTop: '8px',
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
                  ...(item.route === '' && {
                    pointerEvents: 'none',
                    opacity: 0.5,
                    cursor: 'not-allowed',
                  }),
                }}
                onClick={() => {
                  // if (!item.route) return;
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
                    fontFamily: 'var(--font-bold)',
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
              <>
                <Button
                  role="button"
                  aria-label="Logout"
                  onClick={handleMenuOpen}
                  sx={{
                    display: 'flex',
                    width: '100%',
                    minHeight: '44px',
                    padding: '6px 8px',
                    alignItems: 'center',
                    gap: '8px',
                    alignSelf: 'stretch',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      flex: 1, // makes the left group take available space
                    }}
                  >
                    <PermIdentityRounded sx={{ color: '#212B36' }} />
                    <Typography
                      sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                        flex: '1 0 0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: 'var(--Primary-Black, #212B36)',
                        fontFamily: 'var(--font-bold)',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '24px',
                        textAlign: 'left',
                      }}
                    >
                      {loginName}
                    </Typography>
                  </Box>
                  <ArrowDropUpRounded sx={{ color: '#212B36' }} />
                </Button>

                <UserActionMenu
                  email={loginName}
                  handleLogout={handleLogout}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  isExpanded={isExpanded}
                />
              </>
            ) : (
              <Button
                role="button"
                aria-label="Logout"
                onClick={() => {
                  if (setIsLoginOpen) setIsLoginOpen(true);
                }}
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
              disabled={true}
              title="Coming Soon"
            >
              <EmojiObjectsRounded sx={{ color: '', fontSize: '18px' }} />
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
              disabled={true}
              title="Coming Soon"
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
                onClick={() => {
                  if (setIsLoginOpen) setIsLoginOpen(true);
                }}
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
              <>
                <IconButton
                  role="button"
                  aria-label="Logout"
                  onClick={handleMenuOpen}
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
                <UserActionMenu
                  email={loginName}
                  handleLogout={handleLogout}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'center', horizontal: 'left' }}
                  isExpanded={isExpanded}
                />
              </>
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
