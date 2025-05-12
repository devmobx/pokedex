import { FontText, Screen, Wrapper } from "@/components/shared";

export default function HomeScreen() {
  return (
    <Screen.Container paddingHorizontal="xl" edges={["top", "bottom"]}>
      <Wrapper backgroundColor="male" fullWidth flex={1}>
        <FontText>Home</FontText>
      </Wrapper>
    </Screen.Container>
  );
}
