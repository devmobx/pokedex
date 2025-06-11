import { useRouter } from "expo-router";
import { FC } from "react";
import { SvgProps } from "react-native-svg";

import EnFlag from "@/assets/svg/flags/en_flag.svg";
import FrFlag from "@/assets/svg/flags/fr_flag.svg";
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

export default function LanguageScreen() {
  const { t, setLanguage } = useTranslation();
  const router = useRouter();

  return (
    <Screen.Container edges={["bottom"]}>
      <PokeballBgScreenContent>
        <Box justifyContent="flex-start">
          <Header>{t("base:language")}</Header>
        </Box>
        <Box flex={1} justifyContent="flex-start">
          <LanguageSelector
            header="English"
            FlagIcon={EnFlag}
            onPress={() => setLanguage("en")}
          />
          <LanguageSelector
            header="Français"
            FlagIcon={FrFlag}
            onPress={() => setLanguage("fr")}
          />
        </Box>
      </PokeballBgScreenContent>
    </Screen.Container>
  );
}

type LanguageSelectorProps = {
  header: string;
  onPress: () => void;
  FlagIcon: FC<SvgProps>;
};

export const LanguageSelector = ({
  header,
  FlagIcon,
  onPress
}: LanguageSelectorProps) => {
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
        <Graphic as={FlagIcon} />
      </Box>
    </AnimatedPressable>
  );
};
