import encodeFilesNameToUtf8 from "@/utils/encodeFilesNameToUtf8";
import {
  CreateFeedbackApiPayload,
  UploadFilesApiPayload,
  UploadOrgFilesApiPayload,
} from "../../typings/apis";
import { AxiosRequestConfig } from "axios";
import queryString from "query-string";
import { fetcher, uploadFetcher } from "../../api/fetchers";

export const getUploadFileFormData = (
  filePathType?: string,
  imageSizeType?: string,
  filesPayload?: File[],
  targetId?: string
) => {
  const formData = new FormData();
  if (filePathType) {
    formData.append("filePathType", filePathType);
  }
  if (imageSizeType) {
    formData.append("imageSizeType", imageSizeType);
  }
  if (filesPayload) {
    const files = encodeFilesNameToUtf8(filesPayload);
    files.forEach((el) => {
      formData.append("files", el);
    });
  }
  if (targetId) {
    formData.append("targetId", targetId);
  }
  return formData;
};

const apis = {
  /**
   * Create feedback.
   */
  createFeedback: (
    payload?: CreateFeedbackApiPayload,
    config?: AxiosRequestConfig<CreateFeedbackApiPayload>
  ) => fetcher.post(`/feedbacks`, payload, config),

  /**
   * Upload files.
   */
  uploadFiles: <ServiceModuleValue extends string>(
    payload?: UploadFilesApiPayload<ServiceModuleValue>,
    config?: AxiosRequestConfig<FormData>
  ) => {
    const { targetId, filePathType, files: filesPayload } = payload || {};
    const formData = getUploadFileFormData(
      filePathType,
      undefined,
      filesPayload,
      targetId
    );
    return uploadFetcher.post(`/upload-files`, formData, config);
  },
  /**
   * Upload Org files.
   */
  uploadOrgFiles: <ServiceModuleValue extends string>(
    payload?: UploadOrgFilesApiPayload<ServiceModuleValue>,
    config?: AxiosRequestConfig<FormData>
  ) => {
    const {
      organizationId,
      filePathType,
      imageSizeType,
      files: filesPayload,
      eGroupService,
      timeZone,
    } = payload || {};
    const formData = getUploadFileFormData(
      filePathType,
      imageSizeType,
      filesPayload
    );
    return uploadFetcher.post(
      `/organizations/${organizationId}/upload-files?${queryString.stringify({
        EGROUP_SERVICE_: eGroupService,
        timeZone,
      })}`,
      formData,
      config
    );
  },
};

export default apis;
