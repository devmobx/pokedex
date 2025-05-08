import { Text, View } from "@tamagui/core";

import { ScreenContainer } from "@/components/shared";
import { useTranslation } from "@/i18n";

export default function StartScreen() {
  const { t } = useTranslation();
  return (
    <ScreenContainer edges={["top", "bottom"]}>
      <View flex={1} justifyContent="center" alignItems="center">
        <Text
          color="$primary2"
          fontFamily="$heading"
          fontWeight="700"
          fontSize="$10"
        >
          {t("base:product_name")}
        </Text>
      </View>
    </ScreenContainer>
  );
}
