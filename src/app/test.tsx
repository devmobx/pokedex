import { useRouter } from "expo-router";

import PokeballBg from "@/assets/svg/pokeball_bg.svg";
import { Box, Button, FontText, Graphic, Screen } from "@/components/shared";
import { useTranslation } from "@/i18n";

export default function TestScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <Screen.Container
      edges={["top", "bottom"]}
      paddingHorizontal="xl"
      centerContent
    >
      <Graphic as={PokeballBg} />
      <Box flex={1} justifyContent="center">
        <FontText
          fontFamily="inter"
          fontVariant="black"
          color="primary2"
          fontSize="hero"
        >
          {t("base:product_name")}
        </FontText>
      </Box>
      <Button
        marginTop="auto"
        onPress={() => router.navigate("/(tabs)")}
        labelColor="white"
        fontSize="md"
        fontVariant="bold"
        backgroundColor="primary3"
      >
        ENTER
      </Button>
    </Screen.Container>
  );
}
