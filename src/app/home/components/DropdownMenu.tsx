"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentIcon from "@mui/icons-material/Assignment"; // 債務 icon
import WorkIcon from "@mui/icons-material/Work"; // 意外事件
import WarningIcon from "@mui/icons-material/Warning"; // 詐騙事件
import MedicalServicesIcon from "@mui/icons-material/MedicalServices"; // 醫療事件
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"; // 就業協助
import SavingsIcon from "@mui/icons-material/Savings"; // 財務事件

const listItems = [
  {
    title: "債務事件顧問",
    description: "提供債務管理與還款建議，幫助改善財務壓力。",
    icon: <AssignmentIcon />,
  },
  {
    title: "意外事件顧問",
    description: "快速提供應急策略與風險評估。",
    icon: <WorkIcon />,
  },
  {
    title: "詐騙事件顧問",
    description: "快速辨識詐騙風險，提供建議與後續行動指引。",
    icon: <WarningIcon />,
  },
  {
    title: "醫療事件顧問",
    description: "提供您醫療事件應對策略與資源連結。",
    icon: <MedicalServicesIcon />,
  },
  {
    title: "就業協助顧問",
    description: "支援您求職與職涯規劃。",
    icon: <BusinessCenterIcon />,
  },
  {
    title: "財務事件顧問",
    description: "提供儲蓄、投資與債務建議。",
    icon: <SavingsIcon />,
  },
];

export default function DropdownMenu() {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleToggle}
      sx={{
        cursor: "pointer",
        border: "1px solid #ccc",
        borderRadius: "8px",
        paddingX: 2,
        paddingY: 1,
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Dropdown Header */}
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" fontWeight="bold">
          債務顧問
        </Typography>
      </AccordionSummary>

      {/* Dropdown Content */}
      <AccordionDetails
        sx={{
          width: "358px",
          height: "392px",
        }}
      >
        <List>
          {listItems.map((item, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography fontWeight="bold">{item.title}</Typography>
                }
                secondary={
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
