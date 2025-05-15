import { AxiosError } from "axios";

export type FailureResponse = AxiosError<unknown, unknown> | string | undefined;

export type RequestPayload<Values, SuccessResponse> = {
  body: Values;
  onSuccess?: (params: SuccessResponse) => void | Promise<void>;
  onFailure?: (params: FailureResponse) => void | Promise<void>;
};
