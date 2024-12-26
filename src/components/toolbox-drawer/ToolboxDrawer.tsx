"use client";

import React, { useState, useCallback, useEffect, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  CloseRounded,
  DeleteRounded,
  EditRounded,
  MenuRounded,
  SearchRounded,
} from "@mui/icons-material";
import {
  Box,
  Fade,
  List,
  CircularProgress,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DeleteDialog from "@/app/chat/components/DeleteDialog";
import { OrganizationChannel } from "@/interfaces/entities";
import useAxiosApi from "@eGroupAI/hooks/apis/useAxiosApi";
import apis from "@/utils/hooks/apis/apis";
import ChannelContentContext from "@/app/chat/components/ChannelContentContext";
import UploadDialog from "../uploadDialog/page";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLoadChatChannels } from "@/utils/hooks/useLoadChatChannels";

interface ToolboxProps {
  open: boolean;
  selectedChannel?: OrganizationChannel;
  toggleDrawer: (open: boolean) => void;
  children: React.ReactNode;
  openUpload?: boolean;
  setOpenUpload?: React.Dispatch<React.SetStateAction<boolean>>;
  timeoutRef?: React.RefObject<NodeJS.Timeout | null>;
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
  toggleDrawer,
  children,
  openUpload = false,
  setOpenUpload = () => {},
  timeoutRef,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [channelList, setChannelList] = useState<OrganizationChannel[]>([]);
  const [toolsAnchor, setToolsAnchor] = useState<null | HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const { excute: deleteChannel } = useAxiosApi(apis.deleteChannel);

  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev); // Toggle the search field visibility
    setSearchTerm(""); // Clear the search field when toggled
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      // Add your search logic here
    }
  };

  const [page, setPage] = useState(0);
  const itemsPerPage = 20;
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const { mutate: loadChannels, data: loadedChannelsData } =
    useLoadChatChannels(
      {
        organizationId: "4aba77788ae94eca8d6ff330506af944",
      },
      {
        startIndex: page,
        size: itemsPerPage,
      }
    );

  // Initialize channelList with loadedChannelsData
  useEffect(() => {
    if (loadedChannelsData) {
      setChannelList(loadedChannelsData);
    }
  }, [loadedChannelsData]);

  const fetchMoreData = useCallback(async () => {
    if (isFetching || !hasMore) return;

    setIsFetching(true);
    try {
      const response = await loadChannels();
      const newChannels: OrganizationChannel[] = response?.data || [];
      if (newChannels.length > 0) {
        setChannelList((prev: OrganizationChannel[]) => [
          ...prev,
          ...newChannels,
        ]);
        setHasMore(newChannels.length === itemsPerPage);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading channels:", error);
      setHasMore(false);
    } finally {
      setIsFetching(false);
    }
  }, [isFetching, hasMore, loadChannels, page]);

  const {
    selectedChannel,
    selectedChannelId,
    setSelectedChannelId,
    setIsLoadingChannel,
    setSelectedChannel,
    channelsMutate,
  } = useContext(ChannelContentContext);

  const handleCloseToolsMenu = useCallback(() => {
    setToolsAnchor(null);
    setActiveIndex(null);
  }, []);

  const handleDeleteChannelOpenConfirmDialog = useCallback(
    () => setIsDeleteDialogOpen(true),
    []
  );
  const handleCloseDeleteDialog = useCallback(
    () => setIsDeleteDialogOpen(false),
    []
  );
  const handleDeleteChannelConfirm = useCallback(async () => {
    deleteChannel({
      organizationId: "4aba77788ae94eca8d6ff330506af944",
      organizationChannelId:
        channelList?.[activeIndex!].organizationChannelId || "",
    })
      .then(() => {
        setIsDeleteDialogOpen(false);
        handleCloseToolsMenu();
        if (channelsMutate)
          channelsMutate().then(() => {
            if (selectedChannelId === selectedChannel?.organizationChannelId)
              setSelectedChannel(undefined);
            setSelectedChannelId(undefined);
          });
      })
      .catch(() => {});
  }, [
    deleteChannel,
    channelList,
    activeIndex,
    handleCloseToolsMenu,
    channelsMutate,
    selectedChannelId,
    selectedChannel?.organizationChannelId,
    setSelectedChannel,
    setSelectedChannelId,
  ]);

  const handleOpenUpload = () => {
    setOpenUpload(false);
  };

  const handleEditChannelTitle = useCallback(
    () => setIsDeleteDialogOpen(false),
    []
  );

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
      setOpenUpload(false);
      if (timeoutRef?.current) {
        clearTimeout(timeoutRef?.current);
      }
      const channel = channelList?.find(
        (ch) => ch.organizationChannelId === channelId
      );
      if (channel) {
        setSelectedChannel(channel);
      } else {
        const res = await getChannelDetail({
          organizationId: "4aba77788ae94eca8d6ff330506af944",
          organizationChannelId: channelId,
        });
        setSelectedChannel(res.data);
      }
    },
    [getChannelDetail, setOpenUpload, setSelectedChannel, timeoutRef, channelList]
  );

  const handleStartNewChannel = useCallback(() => {
    setOpenUpload(true);
    setSelectedChannel(undefined);
    setSelectedChannelId(undefined);
  }, [setOpenUpload, setSelectedChannel, setSelectedChannelId]);

  useEffect(() => {
    setIsLoadingChannel(isLoadingChannel);
  }, [setIsLoadingChannel, isLoadingChannel]);

  const DrawerList = (
    <Box
      sx={{
        backgroundColor: "#ffffff",
      }}
      role="presentation"
    >
      <List>
        <ListItem
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
            <IconButton
              sx={{ color: "black", padding: 0.5 }}
              onClick={handleStartNewChannel}
            >
              <FileUploadIcon />
            </IconButton>
          </Box>
        </ListItem>
      </List>
      <Box
        id="scrollableDiv"
        sx={{
          overflow: "auto",
          height: "900px",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c1c1c1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#a8a8a8",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "4px",
          },
        }}
      >
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

        <InfiniteScroll
          dataLength={channelList.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "16px",
              }}
            >
              <CircularProgress
                style={{ display: isFetching ? "block" : "none" }}
              />
            </Box>
          }
          scrollableTarget="scrollableDiv"
        >
          {channelList.map((channel, index) => (
            <Box
              key={index}
              sx={{
                width: "93%",
                marginLeft: "8px",
                borderRadius: "10px",
                backgroundColor:
                  selectedChannelId === channel.organizationChannelId
                    ? "#9B9B9B33"
                    : "white",
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: "#9B9B9B33",
                },
              }}
            >
              <ListItem
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
              </ListItem>
              <Menu
                anchorEl={toolsAnchor}
                open={Boolean(toolsAnchor) && activeIndex === index}
                onClose={handleCloseToolsMenu}
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
                        ? handleDeleteChannelOpenConfirmDialog
                        : handleEditChannelTitle
                    }
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText>{item.title}</ListItemText>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ))}
        </InfiniteScroll>
      </Box>
      <UploadDialog open={openUpload} onClose={handleOpenUpload} />
    </Box>
  );

  return (
    <>
      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteChannelConfirm}
      />
      <Drawer
        open={open}
        sx={{
          width: 250,
          backgroundColor: "#ffffff",
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
        variant={isMobile ? "temporary" : "persistent"}
      >
        {DrawerList}
      </Drawer>
      <Box
        sx={{
          marginLeft: open && !isMobile ? "250px" : "0",
          transition: "margin-left 0.3s",
          height: "calc(100vh - 64px)",
          overflow: "auto",
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
          <CircularProgress color="primary" />
        </Box>
        {children}
      </Box>
    </>
  );
};

export default Toolbox;
