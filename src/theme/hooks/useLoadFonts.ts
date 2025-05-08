import { loadAsync } from "expo-font";
import { useEffect, useState } from "react";

import * as Inter from "@/assets/fonts/Inter";
import * as Poppins from "@/assets/fonts/Poppins";

export const useLoadFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await loadAsync({
          ...Inter,
          ...Poppins
        });
        setFontsLoaded(true);
      } catch (err) {
        throw new Error(`Failed to load fonts: ${err as string}`);
      }
    })();
  }, []);

  return fontsLoaded;
};
