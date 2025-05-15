import { BackgroundPokeball, Box, FontText, Screen } from "@/components/shared";
import { useTranslation } from "@/i18n";

import { MenuActionTile } from "./Menu/MenuActionTile";

export default function MenuScreen() {
  const { t } = useTranslation();

  return (
    <>
      <Screen.Container paddingHorizontal="xl" edges={["top", "bottom"]}>
        <Box flex={1} justifyContent="center">
          <Box marginVertical="xxl">
            <FontText
              fontFamily="poppins"
              fontVariant="bold"
              fontSize="display"
            >
              {"What Pokémon are you looking for ?"}
            </FontText>
          </Box>
          <Box flexDirection="row" width="100%">
            <Box width="50%" paddingRight="xxs">
              <MenuActionTile backgroundColor="primary1" marginBottom="sm">
                {t("base:pokedex")}
              </MenuActionTile>
              <MenuActionTile backgroundColor="primary3" marginBottom="sm">
                {t("base:abilities")}
              </MenuActionTile>
              <MenuActionTile backgroundColor="primary5" marginBottom="none">
                {t("base:locations")}
              </MenuActionTile>
            </Box>
            <Box width="50%" paddingLeft="xxs">
              <MenuActionTile backgroundColor="primary2" marginBottom="sm">
                {t("base:moves")}
              </MenuActionTile>
              <MenuActionTile backgroundColor="primary4" marginBottom="sm">
                {t("base:items")}
              </MenuActionTile>
              <MenuActionTile backgroundColor="primary6" marginBottom="none">
                {t("base:type_charts")}
              </MenuActionTile>
            </Box>
          </Box>
        </Box>
      </Screen.Container>
      <BackgroundPokeball />
    </>
  );
}
