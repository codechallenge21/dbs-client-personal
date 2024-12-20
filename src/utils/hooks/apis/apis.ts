import { fetcher, fetcherConfig } from "@eGroupAI/hooks/apis/fetchers";
import axios from "axios";
import {
  OrganizationChannel,
  OrganizationChannelChatInteractResponse,
} from "@/interfaces/entities";
import {
  LogApiPayload,
  GetChannelsApiPayload,
  GetChannelDetailApiPayload,
  SubmitUserInputsApiPayload,
  DeleteChannelApiPayload,
} from "@/interfaces/payloads";
// import Cookies from "universal-cookie";

// const cookies = new Cookies();

const tools = {
  /**
   * Log errors.
   */
  createLog: (payload?: LogApiPayload) => fetcher.post("/logs", payload),
};

const baseURL =
  process.env.NODE_ENV === "production"
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
  getChannelDetail: (payload?: GetChannelDetailApiPayload) => {
    const { organizationId, organizationChannelId } = payload || {};
    return fetcher.get<OrganizationChannel>(
      `/v1/organizations/${organizationId}/channels/${organizationChannelId}`
    );
  },
  submitUserInputs: (payload?: SubmitUserInputsApiPayload) => {
    const { organizationId, organizationChannelId, query, advisorType } = payload || {};
    if (!organizationChannelId) {
      return fetcher.post<OrganizationChannelChatInteractResponse>(
        `/v1/organizations/${organizationId}/channels/chat`,
        {
          query,
          advisorType,
        }
      );
    }
    return fetcher.post<OrganizationChannelChatInteractResponse>(
      `/v1/organizations/${organizationId}/channels/chat`,
      {
        organizationChannelId,
        query,
        advisorType,
      }
    );
  },
  deleteChannel: (payload?: DeleteChannelApiPayload) => {
    const { organizationId, organizationChannelId } = payload || {};
    return fetcher.delete(
      `/v1/organizations/${organizationId}/channels/${organizationChannelId}`
    );
  },
};

const apiExports = {
  tools,
  serverSide,
  ...apis,
};

export default apiExports;
