import { PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import PokeballBg from "@/assets/svg/pokeball_bg.svg";

import { Box } from "./Box";
import { Graphic } from "./Graphic";

export const PokeballBgScreenContent = ({ children }: PropsWithChildren) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <Box
        position="absolute"
        top={0}
        right={0}
        style={{
          zIndex: 0,
          transform: [{ translateX: 95 }, { translateY: -50 }]
        }}
      >
        <Graphic color="black" as={PokeballBg} />
      </Box>
      <Box paddingHorizontal="xl" style={{ paddingTop: insets.top }}>
        {children}
      </Box>
    </>
  );
};
