import { useRouter } from "expo-router";

import { Box, Button, FontText, Screen } from "@/components/shared";
import { useTranslation } from "@/i18n/hooks";

export default function StartScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <Screen.Container
      edges={["top", "bottom"]}
      paddingHorizontal="xl"
      centerContent
    >
      <Box flex={1} justifyContent="center" alignItems="center">
        <FontText
          fontFamily="inter"
          fontVariant="black"
          color="primary2"
          fontSize="hero"
        >
          {t("base:pokedex")}
        </FontText>
        {/* <Graphic as={PokeballColor} width={300} height={300} /> */}
      </Box>
      <Button
        marginTop="auto"
        onPress={() => router.navigate("/main/(tabs)")}
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
