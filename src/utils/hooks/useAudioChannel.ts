import makeGetHook from '@eGroupAI/hooks/apis/makeGetHook';
import { fetcher } from '@/utils/hooks/apis/fetchers';
import { OrganizationChannel } from '@/interfaces/entities';

export type PathParams = {
  organizationId?: string;
  organizationChannelId?: string;
};

type UseAudioChannelType = ReturnType<
  typeof makeGetHook<OrganizationChannel, PathParams>
>;

export const useAudioChannel: UseAudioChannelType = makeGetHook<
  OrganizationChannel,
  PathParams
>(
  '/organizations/{{organizationId}}/channels/{{organizationChannelId}}',
  fetcher
);
