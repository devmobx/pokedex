import { BackgroundPokeball, Box, FontText, Screen } from "@/components/shared";
import { useTranslation } from "@/i18n";

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <>
      <Screen.Container paddingHorizontal="xl" edges={["top", "bottom"]}>
        <Box marginVertical="xxl">
          <FontText fontFamily="poppins" fontVariant="bold" fontSize="display">
            {t("home:header")}
          </FontText>
        </Box>
      </Screen.Container>
      <BackgroundPokeball />
    </>
  );
}
