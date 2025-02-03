import makeGetHook from '@eGroupAI/hooks/apis/makeGetHook';
import { fetcher } from '@/utils/hooks/apis/fetchers';
import { OrganizationChannel } from '@/interfaces/entities';

export type PathParams = {
  organizationId?: string;
};

type UseAudioChannelsType = ReturnType<
  typeof makeGetHook<OrganizationChannel[], PathParams>
>;

export const useAudioChannels: UseAudioChannelsType = makeGetHook<
  OrganizationChannel[],
  PathParams
>('/organizations/{{organizationId}}/channels', fetcher, undefined, {
  organizationChannelType: 'MEETING',
});
