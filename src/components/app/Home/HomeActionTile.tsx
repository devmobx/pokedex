import PokeballBg from "@/assets/svg/pokeball_bg.svg";
import { AnimatedPressable, FontText, Graphic } from "@/components/shared";
import { Color, Spacing } from "@/theme";

type Props = {
  children: string;
  backgroundColor: Color;
  marginBottom: Spacing;
  onPress?: () => void;
};

export const HomeActionTile = ({
  backgroundColor,
  marginBottom,
  children,
  onPress = () => null
}: Props) => {
  return (
    <AnimatedPressable
      height={90}
      backgroundColor={backgroundColor}
      borderRadius="xl"
      justifyContent="center"
      paddingHorizontal="md"
      marginBottom={marginBottom}
      style={{ overflow: "hidden" }}
      onPress={onPress}
    >
      <Graphic
        style={{ position: "absolute", left: -100, bottom: 0 }}
        color="white"
        as={PokeballBg}
      />
      <Graphic
        style={{ position: "absolute", right: -50 }}
        color="white"
        as={PokeballBg}
      />
      <FontText
        color="white"
        fontFamily="inter"
        fontVariant="bold"
        fontSize="md"
      >
        {children}
      </FontText>
    </AnimatedPressable>
  );
};
