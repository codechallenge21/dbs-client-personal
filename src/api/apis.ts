import { downloadFetcher, uploadFetcher, fetcher } from "./fetchers";
import { getUploadFileFormData } from "@/hooks/apis/apis";
import queryString from "query-string";

import {
  OrganizationReport,
  OrganizationReportDetail,
  UploadFile,
} from "../interfaces/entities";

import { AxiosRequestConfig } from "axios";
import { OrganizationRole } from "../typings/apis";
import {
  CreateOrgReportSavingApiPayload,
  CreateOrgRoleApiPayload,
  DeleteOrgReportApiPayload,
  DeleteOrgRoleApiPayload,
  FileApiPayload,
  GetOrgReportDetailApiPayload,
  GetOrgReportListApiPayload,
  UpdateOrgReportApiPayload,
  UpdateOrgRoleApiPayload,
  UploadFilesApiPayload,
} from "@/interfaces/payloads";

// const tools = {
//   /**
//    * Log errors.
//    */
//   createLog: (payload?: LogApiPayload) => fetcher.post("/logs", payload),
// };

const org = {
  createOrgRole: (payload?: CreateOrgRoleApiPayload) => {
    const { organizationId, ...others } = payload || {};
    return fetcher.post<OrganizationRole>(
      `/organizations/${organizationId}/roles`,
      others
    );
  },
  updateOrgRole: (payload?: UpdateOrgRoleApiPayload) => {
    const { organizationId, organizationRoleId, ...others } = payload || {};
    return fetcher.patch(
      `/organizations/${organizationId}/roles/${organizationRoleId}`,
      others
    );
  },
  deleteOrgRole: (payload?: DeleteOrgRoleApiPayload) => {
    const { organizationId, organizationRoleId } = payload || {};
    return fetcher.delete(
      `/organizations/${organizationId}/roles/${organizationRoleId}`
    );
  },

  createOrgReportSave: (payload?: CreateOrgReportSavingApiPayload) => {
    const { organizationId, ...others } = payload || {};
    return fetcher.post<OrganizationReport>(
      `/organizations/${organizationId}/reports`,
      others
    );
  },

  getOrgReportList: (payload?: GetOrgReportListApiPayload) => {
    const { organizationId, serviceModuleValue } = payload || {};
    return fetcher.get<OrganizationReport[]>(
      `/organizations/${organizationId}/reports?${queryString.stringify({
        serviceModuleValue,
      })}`
    );
  },

  getOrgReportDetail: (payload?: GetOrgReportDetailApiPayload) => {
    const { organizationId, organizationReportId } = payload || {};
    return fetcher.get<OrganizationReportDetail>(
      `/organizations/${organizationId}/reports/${organizationReportId}`
    );
  },

  updateOrgReport: (payload?: UpdateOrgReportApiPayload) => {
    const { organizationId, organizationReportId, ...others } = payload || {};
    return fetcher.patch<OrganizationReport>(
      `/organizations/${organizationId}/reports/${organizationReportId}`,
      others
    );
  },

  deleteOrgReport: (payload?: DeleteOrgReportApiPayload) => {
    const { organizationId, organizationReportId } = payload || {};
    return fetcher.delete(
      `/organizations/${organizationId}/reports/${organizationReportId}`
    );
  },

  downloadOrgFile: (payload?: FileApiPayload) => {
    const { organizationId, uploadFileId, eGroupService } = payload || {};
    return downloadFetcher.post(
      `/organizations/${organizationId}/upload-files/${uploadFileId}/download?${queryString.stringify(
        {
          EGROUP_SERVICE_: eGroupService,
        }
      )}`
    );
  },
};

const publicapi = {
  /**
   * Upload Org files.
   */
  uploadFiles: (
    payload?: UploadFilesApiPayload,
    config?: AxiosRequestConfig<FormData>
  ) => {
    const {
      filePathType,
      imageSizeType,
      files: filesPayload,
      organizationShareShortUrl,
    } = payload || {};
    const formData = getUploadFileFormData(
      filePathType,
      imageSizeType,
      filesPayload
    );
    return uploadFetcher.post<UploadFile[]>(
      `/upload-files?${queryString.stringify({
        organizationShareShortUrl,
      })}`,
      formData,
      config
    );
  },
};

const api = { publicapi, org };

export default api;
