// import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Divider, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";

interface UserActionMenuProps {
  email: string;
  handleLogout: () => void;
  anchorEl: null | HTMLElement;
  onClose: () => void;
  anchorOrigin: {
    vertical: "top" | "center" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  transformOrigin: {
    vertical: "top" | "center" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  isExpanded: boolean;
}

export const UserActionMenu: React.FC<UserActionMenuProps> = ({
  email,
  handleLogout,
  anchorEl,
  onClose,
  anchorOrigin,
  transformOrigin,
  isExpanded,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      slotProps={{
        paper: {
          sx: {
            width: anchorEl && isExpanded ? anchorEl.clientWidth : "226px",
          },
        },
      }}
      MenuListProps={{
        sx: { p: "10px" },
      }}
    >
      <MenuItem onClick={onClose} sx={{ p: 0 }}>
        <Typography
          variant="subtitle1"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            alignSelf: "stretch",
            color: "var(--Primary-Black, #212B36)",
            fontFamily: "var(--font-bold)",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "24px", // 150%
          }}
        >
          {email}
        </Typography>
      </MenuItem>
      <Divider sx={{ my: 1, color: "#F5F5F5" }} />
      <MenuItem sx={{ p: "6px 8px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* <Typography
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              flex: "1 0 0",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "var(--Primary-DBS-Red, #212B36)",
              fontFamily: "var(--font-bold)",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "24px",
            }}
          >
            設置
          </Typography> */}
        </Box>
      </MenuItem>
      <MenuItem onClick={handleLogout} sx={{ p: "6px 8px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",

            width: "100%",
          }}
        >
          <Typography
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              flex: "1 0 0",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "var(--Primary-DBS-Red, #C00)",
              fontFamily: "var(--font-bold)",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "24px", // 150%
            }}
          >
            登出
          </Typography>
        </Box>
      </MenuItem>
    </Menu>
  );
};

export default UserActionMenu;
