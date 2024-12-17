"use client";
import * as React from "react";
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
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import DeleteDialog from "@/app/home/components/DeleteDialog";

interface ToolboxProps {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
}
const listItems = [
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
const Toolbox: React.FC<ToolboxProps> = ({ open, toggleDrawer }) => {
  const [toolsAnchor, setToolsAnchor] = React.useState<null | HTMLElement>(
    null
  );
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    React.useState<boolean>(false);

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
          <Box sx={{ display: "flex" }}>
            <IconButton sx={{ color: "black", padding: 0.5 }}>
              <SearchRounded />
            </IconButton>
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
        {["頻道名稱", "頻道名稱", "頻道名稱", "頻道名稱"].map((text, index) => (
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
            <ListItemButton sx={{ padding: "4px 8px" }}>
              <ListItemText primary={text} />
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
              {listItems.map((item, index) => (
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
            top: "74px",
            height: "calc(100% - 64px)",
          },
        }}
        onClose={() => toggleDrawer(false)}
        variant="persistent"
      >
        {DrawerList}
      </Drawer>
    </>
  );
};

export default Toolbox;
