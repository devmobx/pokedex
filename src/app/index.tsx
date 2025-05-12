import { useRouter } from "expo-router";

import { Button, FontText, Screen } from "@/components/shared";
import { useTranslation } from "@/i18n";
import { styled } from "@/theme";

const HeaderWrapper = styled.View`
  flex: 1;
  justify-content: center;
`;

export default function StartScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <Screen.Container
      edges={["top", "bottom"]}
      paddingHorizontal="xl"
      centerContent
    >
      <HeaderWrapper>
        <FontText
          fontFamily="inter"
          fontVariant="black"
          color="primary2"
          fontSize="hero"
        >
          {t("base:product_name")}
        </FontText>
      </HeaderWrapper>
      <Button marginTop="auto" onPress={() => router.navigate("/(tabs)")}>
        Enter
      </Button>
    </Screen.Container>
  );
}
