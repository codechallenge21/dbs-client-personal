import makeGetHook from '@eGroupAI/hooks/apis/makeGetHook';
import { fetcher } from '@/utils/hooks/apis/fetchers';
import { OrganizationChannel } from '@/interfaces/entities';

export type PathParams = {
  organizationId: string;
};

type UseChatChannelsType = ReturnType<
  typeof makeGetHook<OrganizationChannel[], PathParams>
>;

export const useChatChannels: UseChatChannelsType = makeGetHook<
  OrganizationChannel[],
  PathParams
>('/organizations/{{organizationId}}/channels', fetcher, undefined, {
  organizationChannelType: 'CHAT',
});
