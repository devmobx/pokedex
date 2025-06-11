import { useRouter } from "expo-router";
import { ArrowRight } from "phosphor-react-native";

import {
  AnimatedPressable,
  Box,
  FontText,
  Graphic,
  Header,
  PokeballBgScreenContent,
  Screen
} from "@/components/shared";
import { useTranslation } from "@/i18n/hooks";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Screen.Container edges={["bottom"]}>
      <PokeballBgScreenContent>
        <Box justifyContent="flex-start">
          <Header>{t("base:settings")}</Header>
        </Box>
        <Box flex={1} justifyContent="flex-start">
          <Option
            header={t("settings:changeLanguage")}
            onPress={() => router.navigate("/main/settings/language")}
          />
        </Box>
      </PokeballBgScreenContent>
    </Screen.Container>
  );
}

type OptionProps = {
  header: string;
  onPress?: () => void;
};

export const Option = ({ header, onPress }: OptionProps) => {
  return (
    <AnimatedPressable
      borderRadius="xl"
      paddingHorizontal="md"
      paddingVertical="md"
      backgroundColor="background"
      borderWidth="sm"
      borderColor="grey5"
      marginBottom="md"
      style={{ overflow: "hidden" }}
      disabled={!onPress}
      onPress={onPress}
    >
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <FontText fontVariant="semi-bold">{header}</FontText>
        {onPress ? <Graphic as={ArrowRight} /> : null}
      </Box>
    </AnimatedPressable>
  );
};
