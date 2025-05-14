import { BackgroundPokeball, Box, FontText, Screen } from "@/components/shared";
import { useTranslation } from "@/i18n";

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <>
      <Screen.Container paddingHorizontal="xl" edges={["top", "bottom"]}>
        <Box>
          <FontText
            fontFamily="inter"
            fontVariant="bold"
            fontSize="lg"
            color="contrast"
          >
            {t("home:header")}
          </FontText>
        </Box>
      </Screen.Container>
      <BackgroundPokeball />
    </>
  );
}
