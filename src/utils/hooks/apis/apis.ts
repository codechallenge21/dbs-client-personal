import {
  OrganizationChannel,
  OrganizationChannelChatInteractResponse,
  OrganizationChannelResponse,
} from '@/interfaces/entities';
import {
  DeleteChannelApiPayload,
  ForgotPasswordApiPayload,
  GetChannelDetailApiPayload,
  GetChannelsApiPayload,
  LogApiPayload,
  LoginPayload,
  LogoutPayload,
  RegisterUserApiPayload,
  SubmitUserInputsApiPayload,
  UpdateChannelApiPayload,
  UploadFileApiPayload,
  VerifyAccountApiPayload,
} from '@/interfaces/payloads';
import axios, { AxiosRequestConfig } from 'axios';
import { fetcher, fetcherConfig, uploadFetcher } from './fetchers';

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
    if (!payload) {
      throw new Error('Payload is undefined');
    }
    const { organizationId, organizationChannelId } = payload;
    return fetcher.get<OrganizationChannel>(
      `/organizations/${organizationId}/channels/${organizationChannelId}`
    );
  },
  ApiRegenerateSummary: (payload?: GetChannelDetailApiPayload) => {
    if (!payload) {
      throw new Error('Payload is undefined');
    }
    const { organizationId, organizationChannelId } = payload;
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
      `/organizations/yMJHyi6R1CB9whpdNvtA/users/verify-account`,
      { emailTokenId }
    );
  },
  login: (payload?: LoginPayload) => {
    const { organizationUserAccount, organizationUserPassword } = payload || {};
    return fetcher.post(`/organizations/yMJHyi6R1CB9whpdNvtA/users/login`, {
      organizationUserAccount,
      organizationUserPassword,
    });
  },
  logout: (payload?: LogoutPayload) => {
    return fetcher.post(`/organizations/yMJHyi6R1CB9whpdNvtA/users/logout`);
  },
  googleLoginUrl: () => {
    return fetcher.get(
      `/organizations/yMJHyi6R1CB9whpdNvtA/users/google/login-url`
    );
  },
  googleLogin: (payload?: { code: string }) => {
    return fetcher.post(
      `/organizations/yMJHyi6R1CB9whpdNvtA/users/google/login`,
      payload
    );
  },
  forgotPassword: (payload?: ForgotPasswordApiPayload) => {
    const { organizationUserEmail } = payload || {};

    return fetcher.post(
      `/organizations/4aba77788ae94eca8d6ff330506af944/users/forgot-password`,
      { organizationUserEmail }
    );
  },
  resetPassword: (payload?: {
    emailTokenId: string;
    organizationUserPassword: string;
  }) => {
    const { emailTokenId, organizationUserPassword } = payload || {};

    return fetcher.post(
      `/organizations/4aba77788ae94eca8d6ff330506af944/users/reset-password`,
      { emailTokenId, organizationUserPassword }
    );
  },
};

const apiExports = {
  tools,
  serverSide,
  ...apis,
};

export default apiExports;
