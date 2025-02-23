import {
  OrganizationChannel,
  OrganizationChannelMessage,
} from '@/interfaces/entities';
import { AxiosResponse } from 'axios';
import { createContext, Dispatch, SetStateAction } from 'react';
import { KeyedMutator } from 'swr';
import { AdvisorType } from '@/app/chat/types';

export type ChannelContentContextProps = {
  isLoadingChannel: boolean;
  setIsLoadingChannel: Dispatch<SetStateAction<boolean>>;
  isInteractingInChat: boolean;
  setIsInteractingInChat: Dispatch<SetStateAction<boolean>>;
  selectedChannel?: OrganizationChannel;
  setSelectedChannel: Dispatch<SetStateAction<OrganizationChannel | undefined>>;
  selectedChannelId?: string;
  setSelectedChannelId: Dispatch<SetStateAction<string | undefined>>;
  chatResponses: OrganizationChannelMessage[];
  setChatResponses: Dispatch<SetStateAction<OrganizationChannelMessage[]>>;
  channelsMutate?: KeyedMutator<AxiosResponse<OrganizationChannel[], unknown>>;
  advisorType: AdvisorType;
  setAdvisorType?: Dispatch<SetStateAction<AdvisorType>>;
};

const ChannelContentContext = createContext<ChannelContentContextProps>({
  isLoadingChannel: false,
  setIsLoadingChannel: () => {},
  isInteractingInChat: false,
  setIsInteractingInChat: () => {},
  setSelectedChannel: () => {},
  setSelectedChannelId: () => {},
  chatResponses: [],
  setChatResponses: () => {},
  setAdvisorType: () => {},
  advisorType: AdvisorType.DEFAULT,
});

export default ChannelContentContext;
