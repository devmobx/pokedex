import {
  Box,
  FontText,
  PokeballBgScreenContent,
  Screen
} from "@/components/shared";
import { useTranslation } from "@/i18n";

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <Screen.Container edges={["bottom"]}>
      <PokeballBgScreenContent>
        <Box marginVertical="xxl">
          <FontText fontFamily="poppins" fontVariant="bold" fontSize="display">
            {t("base:pokedex")}
          </FontText>
        </Box>
      </PokeballBgScreenContent>
    </Screen.Container>
  );
}
