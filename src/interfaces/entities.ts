import { AdvisorType } from '@/app/chat/components/types';

export interface Creator {
  loginId: string;
  memberName: string;
  loginCheck: boolean;
  organizationMemberCheck: boolean;
}

export interface Organization {
  organizationId: string;
  organizationName: string;
  organizationCountry: string;
  organizationCity: string;
  organizationArea: string;
  organizationZIPCode: string;
  organizationAddress: string;
  organizationWebsite: string;
  organizationInvoiceTaxIdNumber: string;
  organizationTelephone: string;
  organizationEmail: string;
  organizationFacebookUrl: string;
  organizationYoutubeUrl: string;

  organizationCreateDate: string;
  organizationUpdateDate: string;
  googleDelegatedAccount: string;
  organizationLoginTitle: string;
  organizationRegisterTitle: string;
  organizationLoginBackgroundText: string;
  organizationRegisterBackgroundText: string;
  organizationDomainName: string;
}

export interface FileListType {
  file: File;
  preview: string | null;
}

export interface OrganizationChannelMessage {
  organizationChannelMessageId?: string;
  organizationChannelMessageType: 'AI' | 'USER';
  organizationChannelMessageContent: string;
  organizationChannelTitle?: string;
  organizationChannelMessageTokenCount?: number;
  organizationChannelMessageCreateDate?: string;
  organizationChannelFiles?: FileListType[];
}

export interface OrganizationChannelFile {
  organizationChannelFileId: string;
  organizationChannelFileName: string;
  organizationChannelFileUrl: string;

  organizationChannelFileSize: number;
  organizationChannelFileExtensionName: string;
  organizationChannelFilePath: string;
  organizationChannelFileCreateDate: string;
}

export interface OrganizationChannelTranscript {
  organizationChannelTranscriptId: string;
  organizationChannelTranscriptUrl: string;
  organizationChannelTranscriptCreateDate: string;

  organizationChannelTranscriptContent: string;
  organizationChannelTranscriptStatus: 'COMPLETE';
}

export type OrganizationChannelTypes = 'CHAT' | 'MEETING';

export interface OrganizationChannelChatInteractResponse {
  status: 'success';
  organizationChannelId: string;
  organizationChannelTitle: string;
  response: string;
  contextInfo: {
    hasContext: boolean;
    historyLength: number;
    advisorType: AdvisorType;
    modelConfig: {
      maxLength: number;
      temperature: number;
      topP: number;
    };
  };
  tokenInfo: {
    inputTokens: {
      total: number;
      query: number;
      context: number;
      systemPrompt: number;
      history: number;
    };
    outputTokens: {
      total: number;
    };
  };
}

export interface OrganizationChannel {
  organizationChannelId: string;
  organization: Organization;
  organizationChannelTitle: string;
  organizationChannelCreateDate: string;
  organizationChannelFileList: OrganizationChannelFile[];
  organizationChannelTranscriptList: OrganizationChannelTranscript[];
  organizationChannelMessageList: OrganizationChannelMessage[];
  organizationChannelType: OrganizationChannelTypes;
}

export interface OrganizationChannelDetail {
  organizationChannelId: string;
  organization: Organization;
  organizationChannelTitle: '5566';
  organizationChannelCreateDate: '2024-12-18T10:41:27.000Z';
  organizationChannelUpdateDate: '2024-12-18T16:07:18.000Z';
  organizationChannelFileList: OrganizationChannelFile[];
  organizationChannelTranscriptList: OrganizationChannelTranscript[];
  organizationChannelMessageList: OrganizationChannelMessage[];
}

export interface OrganizationChannelResponse {
  organizationChannelId: string;
  organization: Organization;
  organizationChannelTitle: string;
  creator: Creator;
  organizationChannelType: 'MEETING' | 'CHAT';
}
