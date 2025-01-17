import React from "react";
import {
  Menu,
  MenuItem,
  Typography,
  IconButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  EditRounded,
  DeleteRounded,
  MoreVertRounded,
} from "@mui/icons-material";

const menuActions = [
  {
    title: (
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: "400",
          overflow: "hidden",
          fontStyle: "normal",
          lineHeight: "normal",
          textOverflow: "ellipsis",
          fontFamily: "DFPHeiBold-B5",
          color: "var(--Primary-Black, #000)",
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
          color: "red",
          fontSize: "16px",
          fontWeight: "400",
          overflow: "hidden",
          fontStyle: "normal",
          lineHeight: "normal",
          textOverflow: "ellipsis",
          fontFamily: "DFPHeiBold-B5",
        }}
      >
        刪除
      </Typography>
    ),
    icon: <DeleteRounded sx={{ color: "red" }} />,
  },
];

const EditableItem: React.FC<{
  index: number;
  toolsAnchor: HTMLElement | null;
  activeIndex: number | null;
  handleCloseToolsMenu: () => void;
  handleOpenEditChannelDialog: () => void;
  handleDeleteChannelOpenConfirmDialog: () => void;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>, index: number) => void;
  setToolsAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}> = ({
  index,
  toolsAnchor,
  activeIndex,
  handleMenuOpen,
  handleCloseToolsMenu,
  handleOpenEditChannelDialog,
  handleDeleteChannelOpenConfirmDialog,
}) => {
  return (
    <>
      <IconButton onClick={(event) => handleMenuOpen(event, index)}>
        <MoreVertRounded sx={{ color: "black" }} />
      </IconButton>
      <Menu
        anchorEl={toolsAnchor}
        open={Boolean(toolsAnchor) && activeIndex === index}
        onClose={handleCloseToolsMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
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
                : handleOpenEditChannelDialog
            }
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.title}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default EditableItem;
