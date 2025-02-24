import {
  OrganizationChannel,
  OrganizationChannelChatInteractResponse,
  OrganizationChannelResponse,
} from '@/interfaces/entities';
import {
  DeleteChannelApiPayload,
  GetChannelDetailApiPayload,
  GetChannelsApiPayload,
  LogApiPayload,
  SubmitUserInputsApiPayload,
  UpdateChannelApiPayload,
  UploadFileApiPayload,
} from '@/interfaces/payloads';
import axios, { AxiosRequestConfig } from 'axios';
import { fetcher, fetcherConfig, uploadFetcher } from './fetchers';
// import { fetcher, fetcherConfig, uploadFetcher } from "@eGroupAI/hooks/apis/fetchers";

// import Cookies from "universal-cookie";

// const cookies = new Cookies();

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
  ApiRegenerateSummary: (payload?: GetChannelDetailApiPayload) => {
    const { organizationId, organizationChannelId } = payload || {};
    return fetcher.post<OrganizationChannel>(
      `/organizations/${organizationId}/channels/${organizationChannelId}/regenerate-summary`
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
      `/organizations/yMJHyi6R1CB9whpdNvtA/channels/upload`,
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
};

const apiExports = {
  tools,
  serverSide,
  ...apis,
};

export default apiExports;
