"use client";
import React, { useCallback, useContext, useState } from "react";
import {
  Box,
  Tab,
  Tabs,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  TableContainer,
} from "@mui/material";
import {
  MicRounded,
  StarRounded,
  SearchRounded,
  UploadRounded,
  // MoreVertRounded,
} from "@mui/icons-material";
import { useAudioChannels } from "@/utils/hooks/useAudioChannels";
import apis from "@/utils/hooks/apis/apis";
import EditableItem from "../editable-item/EditableItem";
import useAxiosApi from "@eGroupAI/hooks/apis/useAxiosApi";
import ChannelContentContext from "@/app/chat/components/ChannelContentContext";
import UploadDialog from "../uploadDialog/page";

interface SummaryCardProps {
  openUpload?: boolean;
  setOpenUpload?: React.Dispatch<React.SetStateAction<boolean>>;
}
const SummaryCard: React.FC<SummaryCardProps> = ({
  openUpload = false,
  setOpenUpload = () => {},
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [toolsAnchor, setToolsAnchor] = useState<null | HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const { data: channelsData } = useAudioChannels({
    organizationId: "4aba77788ae94eca8d6ff330506af944",
  });

  const { excute: updateChannelDetail } = useAxiosApi(apis.updateChannelDetail);

  const {
    selectedChannel,
    selectedChannelId,
    setSelectedChannelId,
    setIsLoadingChannel,
    setSelectedChannel,
    channelsMutate,
  } = useContext(ChannelContentContext);

  const handleCloseToolsMenu = useCallback(() => {
    setToolsAnchor(null);
    setActiveIndex(null);
  }, []);

  const handleDeleteChannelOpenConfirmDialog = useCallback(() => {
    setIsDeleteDialogOpen(true);
    setToolsAnchor(null);
  }, []);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setToolsAnchor(event.currentTarget);
    setActiveIndex(index);
  };

  const handleCloseUploadDialog = () => {
    setOpenUpload(false);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "96vh",
        maxHeight: "96vh",
        overflowY: "auto",
        borderRadius: "8px",
        padding: "16px 32px",
        backgroundColor: "white",
      }}
    >
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{ mb: 2 }}
        TabIndicatorProps={{
          style: {
            backgroundColor: "#212B36",
          },
        }}
      >
        <Tab
          label="智能生活轉文字"
          sx={{
            color: "#637381",
            "&.Mui-selected": {
              color: "#212B36",
            },
          }}
        />
        <Tab
          label="家系圖"
          sx={{
            color: "#637381",
            "&.Mui-selected": {
              color: "#212B36",
            },
          }}
        />
        <Tab
          label="問答語音錄音"
          sx={{
            color: "#637381",
            "&.Mui-selected": {
              color: "#212B36",
            },
          }}
        />
        <Tab
          label="個別與實時錄音"
          sx={{
            color: "#637381",
            "&.Mui-selected": {
              color: "#212B36",
            },
          }}
        />
      </Tabs>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch",
        }}
      >
        <Typography
          sx={{
            color: "var(--Primary-Black, #212B36)",
            fontFamily: "DFPHeiUBold-B5",
            fontSize: "32px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
          }}
          gutterBottom
        >
          歡迎使用 語音轉文字
        </Typography>

        <Box
          sx={{
            display: "flex",
            width: "458px",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <IconButton
            sx={{
              display: "flex",
              padding: "8px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50px",
            }}
          >
            <SearchRounded />
          </IconButton>
          <Button
            sx={{
              gap: "8px",
              display: "flex",
              color: "#5C443A",
              padding: "6px 12px",
              background: "white",
              borderRadius: "8px",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--Secondary-, #5C443A)",
            }}
            variant="contained"
            startIcon={<MicRounded />}
          >
            開始錄音
          </Button>
          <Button
            sx={{
              display: "flex",
              padding: "6px 12px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              borderRadius: "8px",
              background: "var(--Secondary-, #5C443A)",
            }}
            variant="contained"
            color="primary"
            startIcon={<UploadRounded />}
            onClick={() => setOpenUpload(true)}
          >
            上傳檔案
          </Button>
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>標題</TableCell>
              <TableCell>狀態</TableCell>
              <TableCell>建立時間</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {channelsData?.map((channel, index) => (
              <TableRow key={index}>
                <TableCell>{channel?.organizationChannelTitle}</TableCell>
                <TableCell>
                  {
                    channel.organizationChannelTranscriptList[0]
                      ?.organizationChannelTranscriptStatus
                  }
                </TableCell>
                <TableCell>{channel.organizationChannelCreateDate}</TableCell>
                <TableCell>
                  <IconButton>
                    <StarRounded sx={{ color: "black" }} />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <EditableItem
                    key={channel.organizationChannelId}
                    channel={channel}
                    onSave={async (id, newTitle) => {
                      await updateChannelDetail({
                        organizationId: "4aba77788ae94eca8d6ff330506af944",
                        organizationChannelId: id,
                        organizationChannelTitle: newTitle,
                      });
                      if (channelsMutate) channelsMutate();
                    }}
                    index={index}
                    toolsAnchor={toolsAnchor}
                    activeIndex={activeIndex}
                    handleCloseToolsMenu={handleCloseToolsMenu}
                    handleDeleteChannelOpenConfirmDialog={
                      handleDeleteChannelOpenConfirmDialog
                    }
                    handleMenuOpen={handleMenuOpen}
                    setToolsAnchor={setToolsAnchor}
                  />
                  {/* <IconButton>
                    <MoreVertRounded sx={{ color: "black" }} />
                  </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UploadDialog open={openUpload} onClose={handleCloseUploadDialog} />
    </Box>
  );
};

export default SummaryCard;
