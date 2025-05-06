import { Namespace } from "i18next";
import { useTranslation as _useTranslation } from "react-i18next";

export const useTranslation = (namespace?: Namespace) => {
  const { t, i18n } = _useTranslation(namespace);

  return { t, i18n };
};
