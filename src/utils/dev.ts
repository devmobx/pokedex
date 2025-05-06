export const styledLog = (
  label: string | [string, unknown],
  colors: { text: string; background: string },
  ...values: unknown[]
): void => {
  const style = `color: ${colors.text}; background-color: ${colors.background}; padding: 2px 5px; margin: 3px 10px 3px 0; border: 1px solid ${colors.text}; border-radius: 2px;`;

  if (Array.isArray(label)) {
    const [labelName, descriptor] = label;
    console.log(`%c ${labelName} %o`, style, descriptor, ...values);
  } else {
    console.log(`%c ${label} %o`, style, ...values);
  }
};

export const enum LogIcon {
  WARNING = "⚠️",
  IMPORTANT_ALERT = "🚨",
  CRITICAL = "🔥",
  STOP = "🛑",
  ERROR = "❌",
  IMPORTANT = "❗"
}
