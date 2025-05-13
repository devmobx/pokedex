import PokeballBg from "@/assets/svg/pokeball_bg.svg";

import { Box } from "./Box";
import { Graphic } from "./Graphic";

export const BackgroundPokeball = () => (
  <Box
    position="absolute"
    top={0}
    right={0}
    style={{
      transform: [{ translateX: 95 }, { translateY: -50 }]
    }}
  >
    <Graphic as={PokeballBg} />
  </Box>
);
