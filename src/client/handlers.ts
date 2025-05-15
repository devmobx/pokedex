import axios, { AxiosResponse } from "axios";

import { showToast, styledLog } from "@/utils";

import { RequestPayload } from "./types";

export const handleApiCall = async <T>(
  request: Promise<AxiosResponse<T>>,
  handlers: RequestPayload<T, AxiosResponse<T, unknown>>["handlers"]
) => {
  try {
    const response = await request;
    styledLog("AXIOS", { text: "lightblue", background: "blue" }, response);
    handlers?.onSuccess?.(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      styledLog(
        "AXIOS",
        { text: "#FFCCCC", background: "#8B0000" },
        error.response?.data ?? error.message
      );
      showToast({
        type: "error",
        text1: "API Error",
        text2: "A problem with the api call"
      });
      handlers?.onFailure?.(error);
    } else {
      console.error("handleApiCall UNKNOWN_ERROR:", error);
      handlers?.onFailure?.("UNKNOWN_ERROR");
    }
  }
};
