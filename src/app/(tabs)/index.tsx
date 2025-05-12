import PokeballBg from "@/assets/svg/pokeball_bg.svg";
import { Graphic, Screen } from "@/components/shared";

export default function HomeScreen() {
  return (
    <Screen.Container paddingHorizontal="xl" edges={["top", "bottom"]}>
      <Graphic as={PokeballBg} />
    </Screen.Container>
  );
}
