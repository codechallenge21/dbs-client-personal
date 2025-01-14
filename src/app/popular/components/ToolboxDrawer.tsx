"use client";
import React from "react";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import {
  StarRounded,
  PaidRounded,
  BuildRounded,
  CampaignRounded,
  MenuOpenRounded,
  PsychologyRounded,
  AutoStoriesRounded,
  PermIdentityRounded,
  LocalFireDepartmentRounded,
  EmojiObjectsRounded,
} from "@mui/icons-material";
import {
  Box,
  List,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";

interface ToolboxDrawerProps {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
  children: React.ReactNode;
}

const drawerItems = [
  {
    text: "發燒內容",
    icon: (
      <LocalFireDepartmentRounded
        sx={{
          color: "red",
          marginRight: "16px",
        }}
      />
    ),
  },
  {
    text: "我的最愛",
    icon: <StarRounded sx={{ color: "black", marginRight: "8px" }} />,
  },
  {
    text: "活動公告",
    icon: <CampaignRounded sx={{ color: "black", marginRight: "8px" }} />,
  },
  {
    text: "解決麻煩事",
    icon: <PsychologyRounded sx={{ color: "black", marginRight: "8px" }} />,
  },
  {
    text: "工具箱",
    icon: <BuildRounded sx={{ color: "black", marginRight: "8px" }} />,
  },
  {
    text: "財務快篩",
    icon: <PaidRounded sx={{ color: "black", marginRight: "8px" }} />,
  },
  {
    text: "知識庫",
    icon: <AutoStoriesRounded sx={{ color: "black", marginRight: "8px" }} />,
  },
];

const ToolboxDrawer: React.FC<ToolboxDrawerProps> = ({
  open,
  toggleDrawer,
  children,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const DrawerList = (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      role="presentation"
    >
      <List sx={{ padding: "0", flexGrow: 1 }}>
        <ListItem
          sx={{
            display: "flex",
            padding: "4px 8px",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              color: "var(--Primary-Black, #212B36)",
              fontFamily: "DFPHeiUBold-B5",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 800,
              lineHeight: "normal",
            }}
          >
            好理家在
          </Typography>
          <IconButton
            onClick={() => toggleDrawer(false)}
            sx={{ color: "black" }}
          >
            <MenuOpenRounded />
          </IconButton>
        </ListItem>

        <ListItem
          sx={{
            display: "flex",
            padding: " 8px",
            justifyContent: "space-between",
          }}
        >
          <Button
            sx={{
              gap: "8px",
              width: "100%",
              color: "black",
              height: "38px",
              padding: "8px",
              display: "flex",
              borderRadius: "8px",
              alignItems: "center",
              alignSelf: "stretch",
              justifyContent: "center",
              border: "1px solid var(--Primary-Black, #212B36)",
            }}
          >
            + New Chat
          </Button>
        </ListItem>
        {drawerItems.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              padding: "8px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <Typography
              sx={{
                display: "flex",
                fontWeight: 400,
                fontSize: "16px",
                overflow: "hidden",
                fontStyle: "normal",
                lineHeight: "normal",
                alignItems: "center",
                textOverflow: "ellipsis",
                fontFamily: "DFPHeiBold-B5",
                color: index === 0 ? "red" : "black",
              }}
            >
              <span>{item.icon}</span> {item.text}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          gap: "8px",
          padding: "8px",
          display: "flex",
          alignSelf: "stretch",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: "16px",
            alignItems: "center",
          }}
        >
          <PermIdentityRounded sx={{ color: "black", marginRight: "8px" }} />
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: "16px",
              overflow: "hidden",
              fontStyle: "normal",
              lineHeight: "normal",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              fontFamily: "DFPHeiBold-B5",
              color: "var(--Primary-Black, #212B36)",
            }}
          >
            UserName
          </Typography>
        </Box>
        <Button
          sx={{
            gap: "8px",
            color: "white",
            display: "flex",
            padding: "4px 8px",
            borderRadius: "8px",
            alignSelf: "stretch",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--Secondary-, #5C443A)",
          }}
        >
          <EmojiObjectsRounded sx={{ color: "white" }} />
          許願池
        </Button>
        <Button
          sx={{
            gap: "8px",
            color: "white",
            display: "flex",
            padding: "4px 8px",
            borderRadius: "8px",
            alignSelf: "stretch",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--Secondary-, #5C443A)",
          }}
        >
          諮詢師專區
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box>
      <Drawer
        open={open}
        sx={{
          flexShrink: 0,
          backgroundColor: "#ffffff",
          "& .MuiDrawer-paper": {
            width: 250,
            height: "96%",
            margin: "16px",
            borderRadius: "8px",
          },
        }}
        onClose={() => toggleDrawer(false)}
        variant={isMobile ? "temporary" : "persistent"}
      >
        {DrawerList}
      </Drawer>
      <Box
        sx={{
          overflow: "auto",
          marginTop: "16px",
          marginRight: "16px",
          marginBottom: "16px",
          transition: "margin-left 0.3s",
          marginLeft: open && !isMobile ? "282px" : "0",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ToolboxDrawer;
