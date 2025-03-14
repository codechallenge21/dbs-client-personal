// import SettingsIcon from "@mui/icons-material/Settings";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PolicyRoundedIcon from "@mui/icons-material/PolicyRounded";
import { Box, Divider, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";

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
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <>
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
          sx: { p: "4px" },
        }}
      >
        <MenuItem onClick={onClose} sx={{ p: "8px" }}>
          <Typography
            variant="subtitle1"
            sx={{
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
        <Divider sx={{ my: 1, color: "#919EAB33" }} />
        {/* <MenuItem sx={{ p: "8px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              width: "100%",
            }}
          >
            <SettingsRoundedIcon />
            <Typography
              sx={{
                color: "var(--Primary-DBS-Red, #212B36)",
                fontFamily: "var(--font-bold)",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              設定
            </Typography>
          </Box>
        </MenuItem> */}
        <MenuItem sx={{ p: "8px" }} onClick={handleMenuOpen}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                width: "100%",
              }}
            >
              <PolicyRoundedIcon />
              <Typography
                sx={{
                  textOverflow: "ellipsis",
                  color: "var(--Primary-DBS-Red, #212B36)",
                  fontFamily: "var(--font-bold)",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                了解更多
              </Typography>
            </Box>
            <ChevronRightRoundedIcon />
          </Box>
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ p: "8px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              width: "100%",
            }}
          >
            <LogoutRoundedIcon
              style={{ color: "var(--Primary-DBS-Red, #C00)" }}
            />
            <Typography
              sx={{
                color: "var(--Primary-DBS-Red, #C00)",
                fontFamily: "var(--font-bold)",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              登出
            </Typography>
          </Box>
        </MenuItem>
      </Menu>

      {anchorElement && (
        <Menu
          anchorEl={anchorElement}
          open={Boolean(anchorElement)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "center", horizontal: 225 }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          slotProps={{
            paper: {
              sx: {
                width:
                  anchorElement && isExpanded
                    ? anchorElement.clientWidth
                    : "226px",
              },
            },
          }}
          MenuListProps={{
            sx: { p: "4px" },
          }}
        >
          <MenuItem
            onClick={() => window.open("/policies?tab=termsOfUse", "_blank")}
            sx={{ p: "8px" }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: "var(--Primary-Black, #212B36)",
                fontFamily: "var(--font-bold)",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              服務條款
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => window.open("/policies?tab=privacyPolicy", "_blank")}
            sx={{ p: "8px" }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: "var(--Primary-Black, #212B36)",
                fontFamily: "var(--font-bold)",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              隱私政策
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => window.open("/policies?tab=cookiePolicy", "_blank")}
            sx={{ p: "8px" }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: "var(--Primary-Black, #212B36)",
                fontFamily: "var(--font-bold)",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              Cookie 政策
            </Typography>
          </MenuItem>
        </Menu>
      )}
    </>
  );
};

export default UserActionMenu;
