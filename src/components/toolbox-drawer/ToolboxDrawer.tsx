"use client";

import React, { useState, useCallback, useEffect, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import { CloseRounded, MenuRounded, SearchRounded } from "@mui/icons-material";
import {
  Box,
  Fade,
  List,
  CircularProgress,
  IconButton,
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
import EditableItem from "../editable-item/EditableItem";

interface ToolboxProps {
  open: boolean;
  channelList?: OrganizationChannel[];
  selectedChannel?: OrganizationChannel;
  toggleDrawer: (open: boolean) => void;
  children: React.ReactNode;
  openUpload?: boolean;
  setOpenUpload?: React.Dispatch<React.SetStateAction<boolean>>;
  timeoutRef?: React.RefObject<NodeJS.Timeout | null>;
  channels?: OrganizationChannel[];
}

const Toolbox: React.FC<ToolboxProps> = ({
  open,
  channelList,
  toggleDrawer,
  children,
  openUpload = false,
  setOpenUpload = () => {},
  timeoutRef,
  channels,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [toolsAnchor, setToolsAnchor] = useState<null | HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const { excute: deleteChannel } = useAxiosApi(apis.deleteChannel);

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
      // Add your search logic here
    }
  };

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

  const handleDeleteChannelOpenConfirmDialog = useCallback(() => {
    setIsDeleteDialogOpen(true);
    setToolsAnchor(null);
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    setIsDeleteDialogOpen(false);
    setToolsAnchor(null);
  }, []);

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

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setToolsAnchor(event.currentTarget);
    setActiveIndex(index);
  };

  const { excute: getChannelDetail, isLoading: isLoadingChannel } = useAxiosApi(
    apis.getChannelDetail
  );

  const { excute: updateChannelDetail } = useAxiosApi(apis.updateChannelDetail);

  const handleGetChannelDetail = useCallback(
    async (channelId: string) => {
      setOpenUpload(false);
      if (timeoutRef?.current) {
        clearTimeout(timeoutRef?.current);
      }
      const channel = channels?.find(
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
    [getChannelDetail, setOpenUpload, setSelectedChannel, timeoutRef, channels]
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
    <Box sx={{ width: 232, backgroundColor: "#ffffff" }} role="presentation">
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
              <EditableItem
                key={channel.organizationChannelId}
                channel={channel}
                onSave={async (id, newTitle) => {
                  await updateChannelDetail({
                    organizationId: "4aba77788ae94eca8d6ff330506af944",
                    organizationChannelId: id,
                    organizationChannelTitle: newTitle,
                  });
                  if (channelsMutate) channelsMutate();
                }}
                index={index}
                toolsAnchor={toolsAnchor}
                activeIndex={activeIndex}
                handleCloseToolsMenu={handleCloseToolsMenu}
                handleDeleteChannelOpenConfirmDialog={
                  handleDeleteChannelOpenConfirmDialog
                }
                handleMenuOpen={handleMenuOpen}
                setToolsAnchor={setToolsAnchor}
              />
            </ListItem>
          </Box>
        ))}
      </List>
      <UploadDialog open={openUpload} onClose={handleOpenUpload} />
    </Box>
  );

  return (
    <>
      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteChannelConfirm}
        deletableName={
          channelList?.[activeIndex!]?.organizationChannelTitle || ""
        }
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
        variant={isMobile ? "temporary" : "persistent"} // Use overlay style for mobile
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
