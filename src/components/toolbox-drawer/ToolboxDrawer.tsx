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
  CloseRounded,
  DeleteRounded,
  EditRounded,
  MenuRounded,
  SearchRounded,
} from "@mui/icons-material";
import {
  Fade,
  IconButton,
  InputAdornment,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import DeleteDialog from "@/app/chat/components/DeleteDialog";

interface ToolboxProps {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
  children: React.ReactNode;
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
const Toolbox: React.FC<ToolboxProps> = ({ open, toggleDrawer, children }) => {
  const [toolsAnchor, setToolsAnchor] = React.useState<null | HTMLElement>(
    null
  );
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    React.useState<boolean>(false);
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

  const DrawerList = (
    <Box
      sx={{
        width: 250,
      }}
      role="presentation"
    >
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
            top: "65px",
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
          height: "calc(100vh - 64px)",
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Toolbox;
