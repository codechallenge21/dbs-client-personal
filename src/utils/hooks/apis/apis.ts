import {
  OrganizationChannel,
  OrganizationChannelChatInteractResponse,
  OrganizationChannelResponse,
} from '@/interfaces/entities';
import {
  addUserFeedbackApiPayload,
  ChatWithFilesPayload,
  DeleteChannelApiPayload,
  ForgotPasswordApiPayload,
  GetChannelDetailApiPayload,
  GetChannelsApiPayload,
  getUserFeedbackApiPayload,
  LogApiPayload,
  LoginPayload,
  LogoutPayload,
  RegisterUserApiPayload,
  SubmitUserInputsApiPayload,
  UpdateChannelApiPayload,
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
  getUserInfo: () => {
    return fetcher.get('/organizations/yMJHyi6R1CB9whpdNvtA/users/info');
  },
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
    payload?: FormData,
    config?: AxiosRequestConfig<FormData>
  ) => {
    return uploadFetcher.post<OrganizationChannelResponse>(
      `/organizations/yMJHyi6R1CB9whpdNvtA/channels/upload`,
      payload,
      config
    );
  },

  submitUserInputs: (
    payload?: SubmitUserInputsApiPayload,
    config?: AxiosRequestConfig
  ) => {
    const { organizationId, organizationChannelId, query, advisorType } =
      payload || {};

    if (!organizationChannelId) {
      return fetcher.post<OrganizationChannelChatInteractResponse>(
        `/organizations/${organizationId}/channels/chat`,
        {
          query,
          advisorType,
        },
        config // Pass the entire config object
      );
    }

    return fetcher.post<OrganizationChannelChatInteractResponse>(
      `/organizations/${organizationId}/channels/chat`,
      {
        organizationChannelId,
        query,
        advisorType,
      },
      config // Pass the entire config object
    );
  },
  chatWithFiles: (
    payload?: ChatWithFilesPayload,
    config?: AxiosRequestConfig // Use AxiosRequestConfig instead of { signal?: AbortSignal }
  ) => {
    if (!payload) {
      return Promise.reject(new Error('Payload is required'));
    }
    const organizationId = payload.organizationId;

    const formData = new FormData();
    formData.append('chatRequest', JSON.stringify(payload.chatRequest));
    if (payload.files.length) {
      for (const file of payload.files) {
        formData.append('files', file);
      }
    }

    return fetcher.post(
      `/organizations/${organizationId}/channels/chat-with-files`,
      formData,
      config // Pass the AxiosRequestConfig containing the AbortSignal
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
  addUserFeedback: (payload?: addUserFeedbackApiPayload) => {
    const {
      organizationId,
      organizationChannelFeedbackTarget,
      organizationChannelFeedbackTargetId,
      organizationChannelFeedbackType,
      organizationChannelFeedbackNegativeCategory,
      organizationChannelFeedbackComment,
    } = payload || {};
    return fetcher.post(
      `/organizations/${organizationId}/channel-feedbacks/submit`,
      {
        organizationChannelFeedbackTarget,
        organizationChannelFeedbackType,
        organizationChannelFeedbackNegativeCategory,
        organizationChannelFeedbackComment,
        organizationChannelFeedbackTargetId,
      }
    );
  },
  getUserFeedback: (payload?: getUserFeedbackApiPayload) => {
    if (!payload) {
      throw new Error('Payload is undefined');
    }
    const { messageId, organizationChannelId, organizationId, feedbackType } =
      payload || {};

    return fetcher.get(
      `/organizations/${organizationId}/channels/${organizationChannelId}/${feedbackType}/${messageId}`
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
      `/organizations/yMJHyi6R1CB9whpdNvtA/users/forgot-password`,
      { organizationUserEmail }
    );
  },
  resetPassword: (payload?: {
    emailTokenId: string;
    organizationUserPassword: string;
  }) => {
    const { emailTokenId, organizationUserPassword } = payload || {};

    return fetcher.post(
      `/organizations/yMJHyi6R1CB9whpdNvtA/users/reset-password`,
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
