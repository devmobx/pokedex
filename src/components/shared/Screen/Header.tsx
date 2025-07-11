import { Box } from "../Box";
import { FontText } from "../FontText";

type Props = { children: string };

export const Header = ({ children }: Props) => {
  return (
    <Box>
      <FontText fontFamily="poppins" fontVariant="bold" fontSize="display">
        {children}
      </FontText>
    </Box>
  );
};
