import { getLocales } from "expo-localization";
import i18n, { InitOptions, Namespace } from "i18next";
import { initReactI18next } from "react-i18next";

import { Env } from "@/env";

import Resources from "./resources";
import resourcesEn from "./resources/en";
import resourcesFr from "./resources/fr";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: Namespace;
    resources: Resources;
  }
}

export type SupportedLanguages = keyof typeof resources;

const resources = { en: resourcesEn, fr: resourcesFr };

const lng = getLocales()[0]?.languageCode ?? "en";

const config: InitOptions = {
  debug: Env.ENVIRONMENT === "development",
  compatibilityJSON: "v4",
  fallbackLng: "en",
  resources,
  lng,
  interpolation: {
    escapeValue: false
  },
  react: {
    useSuspense: false
  }
};

i18n.use(initReactI18next).init(config);

export default i18n;
