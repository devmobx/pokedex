import { FontText, Screen } from "@/components/shared";
import { styled } from "@/theme";

const HeaderWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

export default function HomeScreen() {
  return (
    <Screen.Container paddingHorizontal="md" edges={["top", "bottom"]}>
      <HeaderWrapper>
        <FontText>Home</FontText>
      </HeaderWrapper>
    </Screen.Container>
  );
}
