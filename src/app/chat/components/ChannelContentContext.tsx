import { OrganizationChannel } from "@/interfaces/entities";
import { createContext, Dispatch, SetStateAction } from "react";

export type ChannelContentContextProps = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  selectedChannel?: OrganizationChannel;
  setSelectedChannel: Dispatch<SetStateAction<OrganizationChannel | undefined>>;
};

const ChannelContentContext = createContext<ChannelContentContextProps>({
  isLoading: false,
  setIsLoading: () => {},
  setSelectedChannel: () => {},
});

export default ChannelContentContext;
