import PokeballBg from "@/assets/svg/pokeball_bg.svg";

import { Box } from "./Box";
import { Graphic } from "./Graphic";

export const BackgroundPokeball = () => (
  <Box
    position="absolute"
    top={0}
    right={0}
    style={{
      zIndex: -0,
      transform: [{ translateX: 95 }, { translateY: -50 }]
    }}
  >
    <Graphic color="black" as={PokeballBg} />
  </Box>
);
