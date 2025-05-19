import { useRouter } from "expo-router";

import { HomeActionTile } from "@/components/app/Home";
import {
  Box,
  FontText,
  PokeballBgScreenContent,
  Screen
} from "@/components/shared";
import { useTranslation } from "@/i18n/hooks";

export default function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      <Screen.Container edges={["bottom"]}>
        <PokeballBgScreenContent>
          <Box flex={1} justifyContent="flex-start">
            <Box marginVertical="xxl">
              <FontText
                fontFamily="poppins"
                fontVariant="bold"
                fontSize="display"
              >
                {t("home:title")}
              </FontText>
            </Box>
            <Box flexDirection="row" width="100%">
              <Box width="50%" paddingRight="xxs">
                <HomeActionTile
                  backgroundColor="primary1"
                  marginBottom="sm"
                  onPress={() => router.navigate("/(tabs)/pokemon")}
                >
                  {t("base:pokemon")}
                </HomeActionTile>
                <HomeActionTile backgroundColor="primary3" marginBottom="sm">
                  {t("base:abilities")}
                </HomeActionTile>
                <HomeActionTile backgroundColor="primary5" marginBottom="none">
                  {t("base:locations")}
                </HomeActionTile>
              </Box>
              <Box width="50%" paddingLeft="xxs">
                <HomeActionTile backgroundColor="primary2" marginBottom="sm">
                  {t("base:moves")}
                </HomeActionTile>
                <HomeActionTile backgroundColor="primary4" marginBottom="sm">
                  {t("base:items")}
                </HomeActionTile>
                <HomeActionTile backgroundColor="primary6" marginBottom="none">
                  {t("base:type_charts")}
                </HomeActionTile>
              </Box>
            </Box>
          </Box>
        </PokeballBgScreenContent>
      </Screen.Container>
    </>
  );
}
