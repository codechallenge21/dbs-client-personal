import makeGetHook from "@eGroupAI/hooks/apis/makeGetHook";
import { fetcher } from "@/utils/hooks/apis/fetchers";
import { OrganizationChannel } from "@/interfaces/entities";

export type PathParams = {
  organizationId: string;

};

export type queryParams = {
  startIndex: number;
  size: number;
}

export const useLoadChatChannels = makeGetHook<OrganizationChannel[], PathParams>(
  "/organizations/{{organizationId}}/channels",
  fetcher,
);
