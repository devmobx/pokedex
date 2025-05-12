import { useRouter } from "expo-router";

import { Button, FontText, ScreenContainer } from "@/components/shared";
import { useTranslation } from "@/i18n";
import { styled } from "@/theme";

const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-horizontal: ${props => props.theme.spacing.md}px;
`;

const HeaderWrapper = styled.View`
  flex: 1;
  justify-content: center;
`;

export default function StartScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <ScreenContainer edges={["top", "bottom"]}>
      <Content>
        <HeaderWrapper>
          <FontText
            fontFamily="inter"
            fontVariant="bold"
            color="primary2"
            fontSize="xl"
          >
            {t("base:product_name")}
          </FontText>
        </HeaderWrapper>
        <Button marginTop="auto" onPress={() => router.navigate("/(tabs)")}>
          Enter
        </Button>
      </Content>
    </ScreenContainer>
  );
}
