'use client';
import { useCallback, useContext, useEffect, useState } from 'react';
import Header from '@/components/chat-page/components/Header';
import MainContent from '@/components/chat-page/components/MainContent';
import SwitchDialog from '@/components/dialogs/SwitchDialog';
import ToolbarDrawer from '@/components/toolbar-drawer-new/ToolbarDrawer';
import { Box } from '@mui/material';
import ChannelContentContext from '../../components/channel-context-provider/ChannelContentContext';
import { useSearchParams } from 'next/navigation';
import useAxiosApi from '@eGroupAI/hooks/apis/useAxiosApi';
import apis from '@/utils/hooks/apis/apis';

export default function Home() {
  const searchParams = useSearchParams();

  const organizationChannelId = searchParams.get('organizationChannelId') || '';
  console.log('organizationChannelId', organizationChannelId);

  const {
    selectedChannel,
    setSelectedChannelId,
    advisorType,
    setSelectedChannel,
  } = useContext(ChannelContentContext);
  const { excute: getChannelDetail } = useAxiosApi(apis.getChannelDetail);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(true);

  const handleClose = () => setIsOpen(false);

  const handleConfirm = () => {
    setIsOpen(false);
  };

  const toggleDrawer = (newOpen: boolean) => {
    setIsOpenDrawer(newOpen);
  };

  console.log('selected', selectedChannel);
  console.log('advisorType', advisorType);

  const fetchChannelDetail = useCallback(
    async (organizationChannelId: string) => {
      console.log('fetchChannelDetail', organizationChannelId);
      if (!organizationChannelId) {
        setSelectedChannel(undefined);
        setSelectedChannelId(undefined);
        return;
      }
      const res = await getChannelDetail({
        organizationId: '4aba77788ae94eca8d6ff330506af944',
        organizationChannelId,
      });
      console.log('22222');
      setSelectedChannel(res.data);
      setSelectedChannelId(organizationChannelId);
    },
    [getChannelDetail, setSelectedChannel, setSelectedChannelId]
  );

  useEffect(() => {
    if (selectedChannel) {
      setSelectedChannelId(selectedChannel?.organizationChannelId);
    } else {
      fetchChannelDetail(organizationChannelId);
    }
  }, [selectedChannel, setSelectedChannelId, fetchChannelDetail, organizationChannelId]);

  return (
    <ToolbarDrawer open={isOpenDrawer} toggleDrawer={toggleDrawer}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 32px)',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
        }}
      >
        <Header
          isChat
          toggleDrawer={toggleDrawer}
          open={isOpenDrawer}
          advisor={advisorType}
        />
        <MainContent />
        <SwitchDialog
          open={isOpen}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      </Box>
    </ToolbarDrawer>
  );
}
