import React, { useState } from "react";
import {
  ListItemText,
  IconButton,
  TextField,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditRounded from "@mui/icons-material/EditRounded";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import { OrganizationChannel } from "@/interfaces/entities";

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

const EditableItem: React.FC<{
  channel: OrganizationChannel;
  onSave: (id: string, newTitle: string) => void;
  index: number;
  toolsAnchor: HTMLElement | null;
  activeIndex: number | null;
  handleCloseToolsMenu: () => void;
  handleDeleteChannelOpenConfirmDialog: () => void;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>, index: number) => void;
  setToolsAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}> = ({
  channel,
  onSave,
  index,
  toolsAnchor,
  activeIndex,
  handleCloseToolsMenu,
  handleDeleteChannelOpenConfirmDialog,
  handleMenuOpen,
  setToolsAnchor,
}) => {
  const [editedTitle, setEditedTitle] = useState(
    channel.organizationChannelTitle
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEdit = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsEditing(true);
    setToolsAnchor(null); // Close menu
  };

  const handleSave = () => {
    if (
      editedTitle.trim() &&
      editedTitle !== channel.organizationChannelTitle
    ) {
      onSave(channel.organizationChannelId, editedTitle);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditedTitle(channel.organizationChannelTitle); // Reset on cancel
      setIsEditing(false);
    }
  };

  return (
    <>
      {isEditing ? (
        <TextField
          value={editedTitle}
          onChange={(e) => {
            setEditedTitle(e.target.value);
          }}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
          variant="outlined"
          size="small"
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              fontSize: "0.85rem",
            },
          }}
        />
      ) : (
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
      )}
      {!isEditing && (
        <IconButton onClick={(event) => handleMenuOpen(event, index)}>
          <MoreHorizIcon />
        </IconButton>
      )}
      <Menu
        anchorEl={toolsAnchor}
        open={Boolean(toolsAnchor) && activeIndex === index}
        onClose={handleCloseToolsMenu}
        anchorOrigin={{
          vertical: "bottom", // Position relative to the menu button
          horizontal: "right", // Align to the right edge of the button
        }}
        transformOrigin={{
          vertical: "top", // Position relative to the menu
          horizontal: "right", // Align to the right edge of the menu
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
                : handleToggleEdit
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
