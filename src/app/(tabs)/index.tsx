import { BackgroundPokeball, Screen } from "@/components/shared";

export default function HomeScreen() {
  return (
    <>
      <Screen.Container
        paddingHorizontal="xl"
        edges={["top", "bottom"]}
      ></Screen.Container>
      <BackgroundPokeball />
    </>
  );
}
