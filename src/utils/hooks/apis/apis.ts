import { fetcher, fetcherConfig, uploadFetcher } from './fetchers';
import axios from 'axios';
import {
  OrganizationChannel,
  OrganizationChannelResponse,
  OrganizationChannelChatInteractResponse,
} from '@/interfaces/entities';
import {
  LogApiPayload,
  GetChannelsApiPayload,
  GetChannelDetailApiPayload,
  UploadFileApiPayload,
  SubmitUserInputsApiPayload,
  DeleteChannelApiPayload,
  UpdateChannelApiPayload,
  RegisterUserApiPayload,
  VerifyAccountApiPayload,
} from '@/interfaces/payloads';
import { AxiosRequestConfig } from 'axios';

const tools = {
  /**
   * Log errors.
   */
  createLog: (payload?: LogApiPayload) => fetcher.post('/logs', payload),
};

const baseURL =
  process.env.NODE_ENV === 'production'
    ? `${process.env.URL_FOR_NEXTJS_SERVER_SIDE_API}/api/v1/`
    : `${process.env.NEXT_PUBLIC_PROXY_URL}/api/v1/`;

const ssFetcher = axios.create({
  ...fetcherConfig,
  baseURL,
});

const serverSide = {
  getChannels: (payload?: GetChannelsApiPayload) => {
    const { organizationId } = payload || {};
    return ssFetcher.get<OrganizationChannel[] | undefined>(
      `/organizations/${organizationId}/channels`
    );
  },
};

const apis = {
  getChannelDetail: (payload?: GetChannelDetailApiPayload) => {
    const { organizationId, organizationChannelId } = payload || {};
    return fetcher.get<OrganizationChannel>(
      `/organizations/${organizationId}/channels/${organizationChannelId}`
    );
  },
  createChannelByAudio: (
    payload?: UploadFileApiPayload,
    config?: AxiosRequestConfig<FormData>
  ) => {
    const { file } = payload || {};

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }

    return uploadFetcher.post<OrganizationChannelResponse>(
      `/organizations/4aba77788ae94eca8d6ff330506af944/channels/upload`,
      formData,
      config
    );
  },
  submitUserInputs: (payload?: SubmitUserInputsApiPayload) => {
    const { organizationId, organizationChannelId, query, advisorType } =
      payload || {};
    if (!organizationChannelId) {
      return fetcher.post<OrganizationChannelChatInteractResponse>(
        `/organizations/${organizationId}/channels/chat`,
        {
          query,
          advisorType,
        }
      );
    }
    return fetcher.post<OrganizationChannelChatInteractResponse>(
      `/organizations/${organizationId}/channels/chat`,
      {
        organizationChannelId,
        query,
        advisorType,
      }
    );
  },
  updateChannelDetail: (payload?: UpdateChannelApiPayload) => {
    const { organizationId, organizationChannelId, organizationChannelTitle } =
      payload || {};
    return fetcher.patch<OrganizationChannel>(
      `/organizations/${organizationId}/channels/${organizationChannelId}`,
      {
        organizationChannelTitle,
      }
    );
  },
  deleteChannel: (payload?: DeleteChannelApiPayload) => {
    const { organizationId, organizationChannelId } = payload || {};
    return fetcher.delete(
      `/organizations/${organizationId}/channels/${organizationChannelId}`
    );
  },
  registerUser: (payload?: RegisterUserApiPayload) => {
    const {
      organizationId,
      organizationUserNameZh,
      organizationUserEmail,
      organizationUserPassword,
    } = payload || {};

    return fetcher.post(`/organizations/${organizationId}/users/register`, {
      organizationUserNameZh,
      organizationUserEmail,
      organizationUserPassword,
    });
  },
  verifyAccount: (payload?: VerifyAccountApiPayload) => {
    const { emailTokenId } = payload || {};
    return fetcher.post(
      `/organizations/4aba77788ae94eca8d6ff330506af944/users/verify-account`,
      { emailTokenId }
    );
  },
};

const apiExports = {
  tools,
  serverSide,
  ...apis,
};

export default apiExports;
