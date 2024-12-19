
import { Locale } from "@eGroupAI/typings/apis";
import { Outcome } from "@eGroupAI/utils/getDeviceInfo";


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
  level: "ERROR" | "INFO";
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
