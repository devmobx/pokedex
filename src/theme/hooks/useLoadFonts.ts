import { loadAsync } from "expo-font";
import { useCallback, useState } from "react";

import * as Inter from "@/assets/fonts/Inter";
import * as Poppins from "@/assets/fonts/Poppins";

export const useLoadFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = useCallback(async () => {
    await loadAsync({
      ...Inter,
      ...Poppins
    });
    setFontsLoaded(true);
  }, [setFontsLoaded]);

  return { loadFonts, fontsLoaded };
};
