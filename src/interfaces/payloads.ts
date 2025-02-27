import { AdvisorType } from '@/app/chat/types';
import { Locale } from '@eGroupAI/typings/apis';
import { Outcome } from '@eGroupAI/utils/getDeviceInfo';

export interface UploadFileApiPayload {
  file: File;
}

export type LogApiPayload = {
  function: string;
  browserDescription: string;
  jsonData: {
    action?: unknown;
    store?: unknown;
    deviceInfo?: Outcome[];
    data?: unknown;
  };
  level: 'ERROR' | 'INFO';
  message?: string;
};

export interface FileApiPayload {
  uploadFileId: string;
}

export interface GetChannelsApiPayload {
  organizationId: string;
  locale?: Locale;
}

export interface GetChannelDetailApiPayload {
  organizationId: string;
  organizationChannelId: string;
}

export interface SubmitUserInputsApiPayload {
  organizationId: string;
  organizationChannelId?: string;
  query: string;
  advisorType: AdvisorType;
}

export interface DeleteChannelApiPayload {
  organizationId: string;
  organizationChannelId: string;
}

export interface UpdateChannelApiPayload {
  organizationId: string;
  organizationChannelId: string;
  organizationChannelTitle: string;
}

export interface RegisterUserApiPayload {
  organizationId: string;
  organizationUserNameZh: string;
  organizationUserEmail: string;
  organizationUserPassword: string;
}

export interface VerifyAccountApiPayload {
  emailTokenId: string;
}

export interface LoginPayload {
  organizationUserAccount: string;
  organizationUserPassword: string;
}

export interface LogoutPayload {
  organizationUserAccount: string;
  organizationUserPassword: string;
}

export interface ForgotPasswordApiPayload {
  organizationUserEmail: string;
}
