import { uploadFetcher } from "./fetchers";

import {
  UploadFile,
} from "../interfaces/entities";

import { AxiosRequestConfig } from "axios";
import {
  UploadFileApiPayload,
} from "@/interfaces/payloads";

const org = {

    createChannelByAudio: (
      payload?: UploadFileApiPayload,
      config?: AxiosRequestConfig<FormData>
    ) => {
      const {
        file,
      } = payload || {};

      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }
      
      return uploadFetcher.post<UploadFile[]>(
        `/organizations/4aba77788ae94eca8d6ff330506af944/channels/upload`,
        formData,
        config
      );
    },
};

const api = { org };

export default api;
