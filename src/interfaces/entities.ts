// import {
//   ColumnType,
//   Equal,
//   FilterSearch,
//   ModulePermission,
//   OrgChartReportMode,
//   Range,
//   ServiceModuleMap,
//   ChartTimeGranularity,
//   UploadOrgFilesApiPayload,
//   ChartRecentTimeGranularity,
// } from "../typings/apis";

import {
  ChartTimeGranularity,
  ColumnRelatedServiceModuleValue,
  ColumnType,
  FilterSearch,
  OrgChartReportMode,
} from "@/typings/apis";
import {
  ColumnTable,
  OrganizationMediaSizeType,
  OrganizationMediaType,
  ServiceModuleValue,
} from "./utils";

export interface UploadFile {
  uploadFileTitle: string;
  organizationTagTargetList: OrganizationTagTarget[];
  uploadFileId: string;
  uploadFileName: string;
  uploadFileExtensionName: string;
  uploadFileFullTextSearch: string;
  uploadFilePath: string;
  uploadFileSize: number;
  uploadFileCreateDate: string;
  uploadFileUpdateDate: string;
  uploadFileReviewStatus: string;
  uploadFilePathType: ServiceModuleValue;
  uploadFileBucket: string;
  uploadFileBuckedUrl: string;
  dynamicColumnTargetList?: DynamicColumnTarget[];
  uploadFileTargetCreateDate: string;
  creator: Creator;
}

export interface Updater {
  loginId?: string;
  memberName?: string;
}

export interface Creator {
  loginId: string;
  memberName: string;
  memberEmail: string;
  loginCheck: boolean;
  organizationMemberCheck: boolean;
}

type ChartReportDataSource = {
  mode: OrgChartReportMode | string;
  value: string;
  serviceModuleValue: ServiceModuleValue | string;
  timeGranularity?: ChartTimeGranularity | string;
  axisName?: string;
  valueMapping?: Record<string, string>;
};

export type ReportColumnType = {
  columnId?: string;
  filterKey?: string;
  reportColumnName: string;
  reportColumnType: ColumnType;
};

export type ReportColumnList = {
  [key: number | string]: ReportColumnType;
};

export type ReportData = {
  [key: number | string]: string | number;
};

export interface ChartReportResult {
  reportColumnList: ReportColumnList;
  reportDataList: ReportData[];
  totalCount?: number;
}

export interface OrganizationReport {
  organizationReportId: string;
  organization: Organization;
  organizationReportName: string;
  reportChartType: string;
  chartTimeGranularity?: ChartTimeGranularity;
  widgetConfig: {
    dataSourceList?: ChartReportDataSource[];
    hasPeriodComparison?: "TRUE" | "FALSE";
    filterObject?: FilterSearch;
  };
  hasFixedResult: "TRUE" | "FALSE";
  organizationReportFixedResultFilePath: string;
  isPublic: 0 | 1;
  organizationReportCreateDate: string;
  organizationReportUpdateDate: string;
  serviceModuleValue: ServiceModuleValue;
  creator: Creator;
  updater: Updater;
}

export interface OrganizationReportDetail extends OrganizationReport {
  reportResult: ChartReportResult;
}

export interface OrganizationTag {
  inputValue?: string;
  tagId: string;
  tagCreateDate: string;
  tagUpdateDate?: string;
  tagName: string;
  tagScore: number;
  tagColor: string;
  organizationTagGroup: OrganizationTagGroup;
  organizationMediaList?: OrganizationMedia[];
  organizationRoleTargetAuthList?: {
    organizationRole: {
      organizationRoleId: string;
      organizationRoleNameZh: string;
    };
    organizationRoleTargetAuthPermission: string[];
  }[];
}

export interface OrganizationMedia {
  organizationMediaCreateDate: string;
  organizationMediaId: string;
  organizationMediaType: OrganizationMediaType;
  organizationMediaTitle?: string;
  organizationMediaLinkURL?: string;
  organizationMediaYoutubeURL?: string;
  organizationMediaUpdateDate: string;
  targetId: string;
  uploadFile: UploadFile;
  organizationMediaSizeType: OrganizationMediaSizeType;
  organizationMediaDescription?: string;
  organizationTagTargetList?: OrganizationTagTarget[];
}

export interface OrganizationTagGroup {
  organization: {
    organizationId: string;
  };
  tagGroupId: string;
  tagGroupName: string;
  tagGroupCreateDate: string;
  tagGroupUpdateDate: string;
  serviceModuleValue: string;
  tagGroupValue: string;
  organizationTagList?: OrganizationTag[];
}
export interface OrganizationTagTarget {
  organizationTag: OrganizationTag;
  targetId: string;
  tagTargetCreateDate?: string;
  tagTargetUpdateDate?: string;
  id?: {
    tagId: string;
  };
}

export interface ColumnGroup {
  inputValue?: string;
  columnGroupId: string;
  columnGroupName: string;
  columnGroupCreateDate: string;
  columnGroupUpdateDate: string;
  creator: {
    loginCheck: boolean;
    organizationMemberCheck: boolean;
  };
  updater: {
    loginCheck: boolean;
    organizationMemberCheck: boolean;
  };
  serviceModuleValue: ServiceModuleValue;
  organizationColumnList: OrganizationColumn[];
  organizationColumnListCount: number;
  organizationTagTargetList: OrganizationTagTarget[];
}

export interface OrganizationShareEdit {
  organizationShareEditKey: string;
  organizationShareEditType: ColumnType;
  organizationShareEditIsRequired?: number;
  isAutoFill?: string;
  isDynamicColumn?: string;
}

export interface DynamicColumnTarget {
  organizationColumn: OrganizationColumn;
  targetId: string;
  columnTargetId: string;
  columnTargetValue: string | number;
  columnTargetValueList?: {
    organizationOptionId: string;
    organizationOptionName: string;
    columnTargetValueRemark?: string;
  }[];
  columnTargetRelatedTargetId: string;
  columnTargetValueRemarkList?: {
    organizationOptionId: string;
    organizationOptionName: string;
    columnTargetValueRemark?: string;
  }[];
}

export interface OrganizationOption {
  organizationOptionCreateDate: string;
  organizationOptionId: string;
  organizationOptionName: string;
  organizationOptionNextColumnId: string;
  organizationOptionUpdateDate: string;
  updaterLoginId: string;
}

export interface OrganizationColumn {
  columnId: string;
  columnName: string;
  columnType: ColumnType;
  columnRelatedServiceModuleValue?: ColumnRelatedServiceModuleValue;
  columnTargetRelatedTargetId?: string;
  columnSort: number;
  columnTable: ColumnTable;
  columnCreateDate: string;
  columnUpdateDate: string;
  organization: Organization;
  organizationOptionList?: OrganizationOption[];
  columnDescription?: string;
  updater: Updater;
  isRequired: number;
  isRelatedServiceModule: number;
  hasNextColumn: number;
  isEditor?: number;
  columnEditorTemplateContent?: string;
  hasValueRemark?: number;
  isRequiredValueRemark?: number;
  columnNumberMax?: number;
  columnNumberMin?: number;
  columnNumberUnit?: string;
  columnNumberOfDecimal?: number;
  hasValidator?: number;
  isUniqueValue?: number;
  columnValidatorRegex?: string;
  organizationColumnGroup?: {
    columnGroupId: ColumnGroup["columnGroupId"];
    columnGroupName: ColumnGroup["columnGroupName"];
  };
  isCommentEnabled?: string;
  maxOptionBeSelected?: number;
  minOptionBeSelected?: number;
}

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

export interface OrganizationChannelMessage {
  organizationChannelMessageId: string;
  organizationChannelMessageType: "AI" | "USER";
  organizationChannelMessageContent: string;
  organizationChannelMessageTokenCount: number;
  organizationChannelMessageCreateDate: string;
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
  organizationChannelTranscriptStatus: "COMPLETE";
}

export type OrganizationChannelTypes = "CHAT" | "MEETING";

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
  organizationChannelTitle: "5566";
  organizationChannelCreateDate: "2024-12-18T10:41:27.000Z";
  organizationChannelUpdateDate: "2024-12-18T16:07:18.000Z";
  organizationChannelFileList: OrganizationChannelFile[];
  organizationChannelTranscriptList: OrganizationChannelTranscript[];
  organizationChannelMessageList: OrganizationChannelMessage[];
}
