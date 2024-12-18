import {
  ChartRecentTimeGranularity,
  ChartTimeGranularity,
  ColumnType,
  FilterSearch,
  OrgChartReportMode,
} from "../typings/apis";
import { UploadOrgFilesApiPayload } from "../typings/apis";
import { ServiceModuleValue, FilePathType, ColumnTable } from "./utils";
import { OrganizationShareEdit } from "./entities";

export type ChartReportDataSource = {
  mode: OrgChartReportMode | string;
  value: string | undefined;
  serviceModuleValue: ServiceModuleValue | string;
  timeGranularity?: ChartTimeGranularity | string;
  recentTimeGranularity?: ChartRecentTimeGranularity | string;
  startDate?: string;
  endDate?: string;
  axisName?: string;
  valueMapping?: {
    [key: string]: string;
  };
};

export type LoginApiPayload = {
  code: string;
  organizationId?: string;
};

export interface UploadFilesApiPayload
  extends Omit<
    UploadOrgFilesApiPayload<ServiceModuleValue>,
    "organizationId" | "eGroupService" | "filePathType"
  > {
  organizationShareShortUrl: string;
  filePathType: FilePathType;
}

interface ColumnApiPayload {
  columnId?: string;
  columnName: string;
  columnType: ColumnType;
  columnTable: ColumnTable;
  organizationOptionList?: {
    organizationOptionName: string;
  }[];
}

export interface CreateOrgRoleApiPayload {
  organizationId: string;
  organizationRoleNameZh?: string;
}
export interface UpdateOrgRoleApiPayload {
  organizationId: string;
  organizationRoleId: string;
  organizationRoleNameZh?: string;
  organizationRoleStatus?: number;
}

export interface DeleteOrgRoleApiPayload {
  organizationId: string;
  organizationRoleId: string;
}

export interface CreateOrgReportSavingApiPayload {
  organizationId: string;
  organizationReportName: string;
  reportChartType: string;
  serviceModuleValue: string;
  hasFixedResult: string;
  isPublic: number;
  widgetConfig: {
    dataSourceList: ChartReportDataSource[];
    hasPeriodComparison?: "TRUE" | "FALSE" | undefined;
    filterObject?: FilterSearch;
  };
}

export interface GetOrgReportListApiPayload {
  organizationId: string;
  serviceModuleValue: ServiceModuleValue;
}

export interface GetOrgReportDetailApiPayload {
  organizationId: string;
  organizationReportId: string;
}

export interface UpdateOrgReportApiPayload
  extends CreateOrgReportSavingApiPayload {
  organizationReportId: string;
}

export interface DeleteOrgReportApiPayload {
  organizationId: string;
  organizationReportId: string;
}

export interface UpdateOrgDynamicColumnApiPayload {
  organizationId: string;
  columnTable: ColumnTable;
  organizationColumnList: ColumnApiPayload[];
}

export interface CreateOrgShareApiPayload {
  organizationId: string;
  targetId: string;
  organizationShareTargetType: ServiceModuleValue;
  organizationShareEditList: OrganizationShareEdit[];
  organizationFinanceTemplateList: {
    organizationFinanceTemplateId: string;
  }[];
  uploadFileTargetList: {
    uploadFile: {
      uploadFileId: string;
    };
  }[];
  organizationShareEditNeedUpload?: string;
  organizationShareUploadDescription?: string;
  organizationShareWelcomeMessage?: string;
  organizationShareFinishMessage?: string;
  organizationShareIsOneTime: string;
  organizationShareExpiredDate?: string;
  organizationShareExpiredDateString?: string;
  organizationShareEndDaysInterval?: number;
}

export interface FileApiPayload {
  organizationId: string;
  uploadFileId: string;
  eGroupService?: "WEBSITE";
}

export interface UploadFilesApiPayload
  extends Omit<
    UploadOrgFilesApiPayload<ServiceModuleValue>,
    "organizationId" | "eGroupService" | "filePathType"
  > {
  organizationShareShortUrl: string;
  filePathType: FilePathType;
}
