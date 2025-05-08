import { Namespace } from "i18next";
import { useTranslation as _useTranslation } from "react-i18next";

export const useTranslation = (namespace?: Namespace) => {
  const translationUtils = _useTranslation(namespace);
  return translationUtils;
};
