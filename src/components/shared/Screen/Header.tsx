import { FontText } from "../FontText";

type Props = { children: string };

export const Header = ({ children }: Props) => {
  return (
    <FontText
      fontFamily="poppins"
      fontVariant="bold"
      fontSize="display"
      paddingBottom="lg"
    >
      {children}
    </FontText>
  );
};
