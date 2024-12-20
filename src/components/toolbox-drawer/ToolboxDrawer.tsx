"use client";

import { useState, useCallback, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  AddRounded,
  DeleteRounded,
  EditRounded,
  MenuRounded,
  SearchRounded,
} from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
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
  const [toolsAnchor, setToolsAnchor] = useState<null | HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const { excute: deleteChannel } = useAxiosApi(apis.deleteChannel);

  const { setIsLoadingChannel, setSelectedChannel, channelsMutate } =
    useContext(ChannelContentContext);

  const handleDeleteChannelOpenConfirmDialog = useCallback(
    () => setIsDeleteDialogOpen(true),
    []
  );
  const handleCloseDeleteDialog = useCallback(() => setIsDeleteDialogOpen(false), []);
  const handleDeleteChannelConfirm = useCallback(async () => {
    deleteChannel({
      organizationId: "4aba77788ae94eca8d6ff330506af944",
      organizationChannelId: channelList?.[activeIndex!].organizationChannelId || "",
    })
      .then(() => {
        setIsDeleteDialogOpen(false);
        if (channelsMutate) channelsMutate();
      })
      .catch(() => {});
  }, [activeIndex, channelList, channelsMutate, deleteChannel]);

  const handleEditChannelTitle = useCallback(() => setIsDeleteDialogOpen(false), []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, index: number) => {
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

  const handleStartNewChannel = useCallback(() => {
    setSelectedChannel(undefined);
  }, [setSelectedChannel]);

  useEffect(() => {
    setIsLoadingChannel(isLoadingChannel);
  }, [setIsLoadingChannel, isLoadingChannel]);

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
          <IconButton onClick={() => toggleDrawer(false)} sx={{ color: "black" }}>
            <MenuRounded />
          </IconButton>
          <Box sx={{ display: "flex" }}>
            <IconButton sx={{ color: "black", padding: 0.5 }}>
              <SearchRounded />
            </IconButton>
            <IconButton
              sx={{ color: "black", padding: 0.5 }}
              onClick={handleStartNewChannel}
            >
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
              onClick={() => handleGetChannelDetail(channel.organizationChannelId)}
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
              sx={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "20px",
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
                    width: "200px",
                    alignItems: "flex-start",
                    padding: "8px",
                    "&:hover": {
                      backgroundColor: "#F5F5F5",
                      borderRadius: "8px",
                      margin: "0px 4px",
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
          </ListItem>
        ))}
      </List>
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
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
            top: "74px",
            height: "calc(100% - 64px)",
          },
        }}
        onClose={() => toggleDrawer(false)}
        variant="persistent"
      >
        {DrawerList}
      </Drawer>
      <Box
        sx={{
          marginLeft: open ? "250px" : "0",
          transition: "margin-left 0.3s",
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
          <CircularProgress color="primary" />
        </Box>
        {children}
      </Box>
    </>
  );
};

export default Toolbox;
