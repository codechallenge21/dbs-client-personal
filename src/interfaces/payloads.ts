import { AdvisorType } from '@/app/chat/types';
import { Locale } from '@eGroupAI/typings/apis';
import { Outcome } from '@eGroupAI/utils/getDeviceInfo';

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

export interface ChatWithFilesPayload {
  chatRequest: {
    query: string;
    advisorType: string;
  };
  files: File[];
  organizationId: string;
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

export interface getUserFeedbackApiPayload {
  messageId: string;
  organizationChannelId: string;
  organizationId: string;
  feedbackType: 'messages' | 'transcripts';
}

export interface addUserFeedbackApiPayload {
  organizationId: string;
  organizationChannelFeedbackTarget: string;
  organizationChannelFeedbackTargetId: string;
  organizationChannelFeedbackType: string;
  organizationChannelFeedbackNegativeCategory?: string;
  organizationChannelFeedbackComment: string;
}
