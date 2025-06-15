import { Text, TextProps } from "react-native";

export type DynamicColoredTextProps = {
  val: number;
  maxVal: number;
  lowLevel?: string;
  medLevel?: string;
  highLevel?: string;
  children?: React.ReactNode;
} & TextProps;

export function DynamicColorText({
  val,
  maxVal,
  lowLevel,
  medLevel,
  highLevel,
  style,
  children,
  ...rest
}: DynamicColoredTextProps) {
  const result = val / maxVal;
  let color = "";

  if (result > 1 || result < 0) {
    console.error("`val` can't be greater than `maxVal`");
  }

  if (result < 0.33) {
    color = lowLevel ?? "rgb(2, 122, 72)";
  } else if (result < 0.66) {
    color = medLevel ?? "rgb(179, 107, 0)";
  } else {
    color = highLevel ?? "rgb(185, 28, 28)";
  }

  const content = children ?? ` ${val}%`;

  return (
    <Text style={[style, { color: color }]} {...rest}>
      {content}
    </Text>
  );
}
