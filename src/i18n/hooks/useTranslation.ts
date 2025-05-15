import { Namespace } from "i18next";
import { useTranslation as _useTranslation } from "react-i18next";

import { useLanguageStore } from "@/_zustand";

export const useTranslation = (namespace?: Namespace) => {
  const translationUtils = _useTranslation(namespace);
  const language = useLanguageStore.use.language();
  const setLanguage = useLanguageStore.use.setLanguage();

  return { ...translationUtils, language, setLanguage };
};
