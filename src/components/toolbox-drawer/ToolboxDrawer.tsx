"use client";

import { useState, useCallback, useEffect, useContext } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  AddRounded,
  CloseRounded,
  DeleteRounded,
  EditRounded,
  MenuRounded,
  SearchRounded,
} from "@mui/icons-material";
import {
  CircularProgress,
  Box,
  Fade,
  List,
  Menu,
  Drawer,
  useTheme,
  MenuItem,
  ListItem,
  TextField,
  Typography,
  IconButton,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  InputAdornment,
  ListItemButton,
} from "@mui/material";
import DeleteDialog from "@/app/chat/components/DeleteDialog";
import { OrganizationChannel } from "@/interfaces/entities";
import useAxiosApi from "@eGroupAI/hooks/apis/useAxiosApi";
import apis from "@/utils/hooks/apis/apis";
import ChannelContentContext from "@/app/chat/components/ChannelContentContext";

interface ToolboxProps {
  open: boolean;
  channelList?: OrganizationChannel[];
  selectedChannel?: OrganizationChannel;
  toggleDrawer: (open: boolean) => void;
  children: React.ReactNode;
}
const menuActions = [
  {
    title: (
      <Typography
        sx={{
          overflow: "hidden",
          color: "var(--Primary-Black, #000)",
          textOverflow: "ellipsis",
          fontFamily: "DFPHeiBold-B5",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "normal",
        }}
      >
        重新命名
      </Typography>
    ),
    icon: <EditRounded sx={{ color: "black" }} />,
  },
  {
    title: (
      <Typography
        sx={{
          overflow: "hidden",
          color: "red",
          textOverflow: "ellipsis",
          fontFamily: "DFPHeiBold-B5",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "normal",
        }}
      >
        刪除
      </Typography>
    ),
    icon: <DeleteRounded sx={{ color: "red" }} />,
  },
];
const Toolbox: React.FC<ToolboxProps> = ({
  open,
  channelList,
  toggleDrawer,
  children,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [toolsAnchor, setToolsAnchor] = useState<null | HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const { setIsLoading, setSelectedChannel } = useContext(
    ChannelContentContext
  );

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev); // Toggle the search field visibility
    setSearchTerm(""); // Clear the search field when toggled
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      console.log(`Searching for: ${searchTerm}`);
      // Add your search logic here
    }
  };

  const handleDeleteDialogOpen = () => setIsDeleteDialogOpen(true);
  const handleDeleteDialogClose = () => setIsDeleteDialogOpen(false);

  const handleDeleteDialogConfirm = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setToolsAnchor(null);
    setToolsAnchor(event.currentTarget);
    setActiveIndex(index);
  };

  const { excute: getChannelDetail, isLoading: isLoadingChannel } = useAxiosApi(
    apis.getChannelDetail
  );

  const handleGetChannelDetail = useCallback(
    async (channelId: string) => {
      const res = await getChannelDetail({
        organizationId: "4aba77788ae94eca8d6ff330506af944",
        organizationChannelId: channelId,
      });
      setSelectedChannel(res.data);
    },
    [getChannelDetail, setSelectedChannel]
  );

  useEffect(() => {
    setIsLoading(isLoadingChannel);
  }, [setIsLoading, isLoadingChannel]);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItemButton
          sx={{
            display: "flex",
            padding: "4px 8px",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            onClick={() => toggleDrawer(false)}
            sx={{ color: "black" }}
          >
            <MenuRounded />
          </IconButton>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Box
              sx={{
                padding: "0px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Fade in={isSearchOpen}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="搜尋"
                  value={searchTerm}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearchSubmit();
                  }}
                  sx={{
                    maxWidth: 150,
                    borderRadius: "8px",
                    transition: "width 0.3s ease",
                    backgroundColor: "#9B9B9B12",
                    "& .MuiOutlinedInput-root": {
                      padding: "4px",
                      borderRadius: "8px",
                      "& fieldset": {
                        border: "none",
                      },
                    },
                    "& .MuiInputBase-input": {
                      padding: "4px",
                    },
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton sx={{ color: "black", padding: "4px" }}>
                            <SearchRounded />
                          </IconButton>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleSearchToggle}
                            sx={{ color: "black", padding: "4px" }}
                          >
                            <CloseRounded />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Fade>
              {!isSearchOpen && (
                <IconButton
                  onClick={handleSearchToggle}
                  sx={{ color: "black" }}
                >
                  <SearchRounded />
                </IconButton>
              )}
            </Box>
            <IconButton sx={{ color: "black", padding: 0.5 }}>
              <AddRounded />
            </IconButton>
          </Box>
        </ListItemButton>
      </List>
      <Typography
        sx={{
          color: "#000",
          fontFamily: "DFPHeiBold-B5",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "normal",
          paddingLeft: "8px",
        }}
      >
        Today
      </Typography>
      <List>
        {channelList?.map((channel, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              width: "93%",
              marginLeft: "8px",
              borderRadius: "10px",
              backgroundColor: activeIndex === index ? "#9B9B9B33" : "white",
            }}
          >
            <ListItemButton
              sx={{
                padding: "4px 8px",
                whiteSpace: "nowrap",
              }}
              onClick={() =>
                handleGetChannelDetail(channel.organizationChannelId)
              }
            >
              <ListItemText
                primary={channel.organizationChannelTitle}
                slotProps={{
                  primary: {
                    sx: {
                      color: "black",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  },
                }}
              />
              <IconButton onClick={(e) => handleMenuOpen(e, index)}>
                <MoreHorizIcon />
              </IconButton>
            </ListItemButton>
            <Menu
              anchorEl={toolsAnchor}
              open={Boolean(toolsAnchor) && activeIndex === index}
              onClose={() => {
                setToolsAnchor(null);
                setActiveIndex(null);
              }}
              slotProps={{
                paper: {
                  sx: {
                    maxWidth: "199px",
                    minHeight: "80px",
                    padding: "4px",
                    borderRadius: "12px",
                    "& .MuiList-root": {
                      padding: "0px",
                    },
                  },
                },
              }}
              sx={{
                top: -10,
                left: {
                  sm: "-160px",
                },
                "@media (max-width: 300px)": {
                  left: "-70px",
                },
                "@media (min-width: 300px) and (max-width: 324px)": {
                  left: "-70px",
                },
                "@media (min-width: 325px) and (max-width: 337px)": {
                  left: "-90px",
                },
                "@media (min-width: 338px) and (max-width: 349px)": {
                  left: "-100px",
                },
                "@media (min-width: 350px) and (max-width: 359px)": {
                  left: "-110px",
                },
                "@media (min-width: 360px) and (max-width: 374px)": {
                  left: "-120px",
                },
                "@media (min-width: 375px) and (max-width: 399px)": {
                  left: "-140px",
                },
                "@media (min-width: 400px) and (max-width: 600px)": {
                  left: "-155px",
                },
              }}
            >
              {menuActions.map((item, index) => (
                <MenuItem
                  key={index}
                  sx={{
                    width: "175px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: "6px 8px",
                    "&:hover": {
                      backgroundColor: "#F5F5F5",
                      borderRadius: "6px",
                    },
                  }}
                  onClick={
                    index === 1
                      ? handleDeleteDialogOpen
                      : handleDeleteDialogOpen
                  }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.title}</ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteDialogConfirm}
      />
      <Drawer
        open={open}
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
            height: isMobile ? "calc(100% - 58px)" : "calc(100% - 48px)",
            top: isMobile ? "57px" : "65px",
            borderTopRightRadius: isMobile ? "8px" : "0px",
            borderBottomRightRadius: isMobile ? "8px" : "0px",
          },
        }}
        onClose={() => toggleDrawer(false)}
        variant={isMobile ? "temporary" : "persistent"} // Use overlay style for mobile
      >
        {DrawerList}
      </Drawer>
      <Box
        sx={{
          marginLeft: open ? "250px" : "0",
          transition: "margin-left 0.3s",
          // height: "calc(100vh - 64px)",
          overflow: "auto",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: isLoadingChannel ? "flex" : "none",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
        {children}
      </Box>
    </>
  );
};

export default Toolbox;
