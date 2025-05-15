import { ErrorCode } from "./codes";

export type ErrorMessages = {
  en: Record<ErrorCode, string>;
  fr: Record<ErrorCode, string>;
};

const defaultMessage = {
  en: "An error occurred, please try again",
  fr: "Une erreur est survenue, veuillez réessayer"
};

export const errorMessages: ErrorMessages = {
  en: {
    ERR_BAD_REQUEST: "A bad request",
    DEFAULT: defaultMessage.en
  },
  fr: {
    ERR_BAD_REQUEST: "Une mauvaise requête",
    DEFAULT: defaultMessage.fr
  }
};
