import { FontText, ScreenContainer } from "@/components/shared";
import { styled } from "@/theme";

const HeaderWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

export default function HomeScreen() {
  return (
    <ScreenContainer edges={["top", "bottom"]}>
      <HeaderWrapper>
        <FontText>Home</FontText>
      </HeaderWrapper>
    </ScreenContainer>
  );
}
