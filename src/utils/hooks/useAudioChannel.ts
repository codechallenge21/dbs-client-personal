import makeGetHook from "@eGroupAI/hooks/apis/makeGetHook";
import { fetcher } from "@/utils/hooks/apis/fetchers";
import { OrganizationChannel } from "@/interfaces/entities";

export type PathParams = {
  organizationId?: string;
  organizationChannelId?: string;
};

export const useAudioChannel = makeGetHook<OrganizationChannel, PathParams>(
  "/organizations/{{organizationId}}/channels/{{organizationChannelId}}",
  fetcher,
);
