"use client";

import { useState } from "react";
import {
  Typography,
  ListItemIcon,
  ListItemText,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  AccountBalanceWalletRounded,
  BusinessCenterRounded,
  KeyboardArrowDown,
  LocalHospitalRounded,
  MoneyOffRounded,
  PhishingRounded,
  WorkRounded,
} from "@mui/icons-material";

const listItems = [
  {
    title: "債務事件顧問",
    description: "提供債務管理與還款建議，幫助改善財務壓力。",
    icon: <MoneyOffRounded />,
  },
  {
    title: "意外事件顧問",
    description: "快速提供應急策略與風險評估。",
    icon: <BusinessCenterRounded />,
  },
  {
    title: "詐騙事件顧問",
    description: "快速辨識詐騙風險，提供建議與後續行動指引。",
    icon: <PhishingRounded />,
  },
  {
    title: "醫療事件顧問",
    description: "提供您醫療事件應對策略與資源連結。",
    icon: <LocalHospitalRounded />,
  },
  {
    title: "就業協助顧問",
    description: "支援您求職與職涯規劃。",
    icon: <WorkRounded />,
  },
  {
    title: "財務事件顧問",
    description: "提供儲蓄、投資與債務建議。",
    icon: <AccountBalanceWalletRounded />,
  },
];

export default function DropdownMenu() {
  const [toolsAnchor, setToolsAnchor] = useState<null | HTMLElement>(null);

  return (
    <>
      <Button
        endIcon={<KeyboardArrowDown />}
        onClick={(e) => setToolsAnchor(e.currentTarget)}
        sx={{
          height: "40px",
          alignItems: "center",
          justifyContent: "center",
          padding: "4px 12px 4px 16px",
          color: toolsAnchor ? "#0066cc" : "black",
          backgroundColor: toolsAnchor ? "#F5F5F5" : "white",
        }}
      >
        債務顧問
      </Button>
      <Menu
        anchorEl={toolsAnchor}
        open={Boolean(toolsAnchor)}
        onClose={() => setToolsAnchor(null)}
      >
        {listItems.map((item, index) => (
          <MenuItem
            key={index}
            sx={{
              alignItems: "flex-start",
              padding: "8px",
              margin: "0px 4px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#F5F5F5",
                borderRadius: "8px",
                margin: "0px 4px",
              },
            }}
          >
            <ListItemIcon sx={{ color: "black" }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={<Typography fontWeight="bold">{item.title}</Typography>}
              secondary={
                <Typography variant="body2" color="textSecondary">
                  {item.description}
                </Typography>
              }
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
