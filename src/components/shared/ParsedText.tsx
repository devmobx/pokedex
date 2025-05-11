import { useCallback, useRef } from 'react';
import { Text, TextStyle } from 'react-native';

type Props = {
  styles: {
    default?: TextStyle | TextStyle[];
    [tag: string]: TextStyle | TextStyle[] | undefined;
  };
  children: string;
};

/**
 * The ParsedText component parses a string containing simple HTML-like tags
 * (e.g. `<strong>`, `</strong>`) and applies React Native text styles based
 * on those tags.
 *
 * **Usage:**
 *
 * ```tsx
 * const message = "This is <strong>bold</strong> text, and this is <em>italic</em> text."
 *
 * <ParsedText
 *   styles={{
 *     default: { color: 'black', fontSize: 16 },
 *     strong: { fontWeight: 'bold' },
 *     em: { fontStyle: 'italic' }
 *   }}
 * >
 *   {message}
 * </ParsedText>
 * ```
 */

export const ParsedText = ({ styles = {}, children }: Props) => {
  const parts = children
    .split(/(<\/?[a-zA-Z]+>)/g)
    .filter((part) => part !== '' && part !== undefined);

  const activeTagRef = useRef<string | null>(null);

  const textPart = useCallback(
    (part: string, index: number) => {
      const tagMatch = /^<\/?([a-zA-Z]+)>$/.exec(part);

      if (tagMatch) {
        const tag = tagMatch[1];
        const isClosingTag = part.startsWith('</');

        if (isClosingTag) {
          activeTagRef.current = null;
          return null;
        }

        activeTagRef.current = tag;
        return null;
      }

      const tagStyle =
        activeTagRef.current && styles[activeTagRef.current]
          ? styles[activeTagRef.current]
          : styles.default;

      return (
        <Text style={tagStyle as TextStyle[]} key={index}>
          {part}
        </Text>
      );
    },
    [styles]
  );

  try {
    return <Text>{parts.map(textPart)}</Text>;
  } catch (err) {
    throw new Error(
      `ParsedText component failed to parse text: ${(err as Error)?.message}`
    );
  }
};
