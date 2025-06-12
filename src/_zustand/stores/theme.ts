import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { ColorScheme } from "@/theme";

import { storeLogger } from "../middleware";
import { createSelectors } from "../utils";

type ThemeState = {
  colorScheme: ColorScheme;
  setColorScheme: (theme: ColorScheme) => void;
};

export const themeStore = create<ThemeState>()(
  devtools(
    storeLogger(
      "THEME",
      persist(
        (set): ThemeState => ({
          colorScheme: "light",
          setColorScheme: colorScheme => {
            set({ colorScheme }, undefined, "setColorScheme");
          }
        }),
        {
          name: "theme",
          storage: createJSONStorage(() => AsyncStorage)
        }
      )
    )
  )
);

export const useThemeStore = createSelectors(themeStore);
