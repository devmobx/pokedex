import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import i18n, { SupportedLanguages } from "../../i18n";
import { storeLogger } from "../middleware";
import { createSelectors } from "../utils";

type LanguageState = {
  language: SupportedLanguages;
  setLanguage: (lang: SupportedLanguages) => void;
};

export const languageStore = create<LanguageState>()(
  devtools(
    storeLogger(
      "LANGUAGE",
      persist(
        (set): LanguageState => ({
          language: "en",
          setLanguage: language => {
            console.log("i18n instance", i18n);
            set({ language }, false, "setLanguage");
            i18n.changeLanguage(language);
          }
        }),
        {
          name: "userLanguage",
          storage: createJSONStorage(() => AsyncStorage)
        }
      )
    )
  )
);

export const useLanguageStore = createSelectors(languageStore);
