import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";

export type VerticalSeparatorProps = {
  height: ViewStyle["height"];
  style?: StyleProp<ViewStyle>;
} & ViewStyle;

export type HorizontalSeparatorProps = {
  width: ViewStyle["width"];
  style?: StyleProp<ViewStyle>;
} & ViewStyle;

export function VerticalSeparator({ height, style }: VerticalSeparatorProps) {
  return (
    <View style={[styles.verticalSeparator, { height: height }, style]}></View>
  );
}

export function HorizontalSeparator({
  width,
  style,
}: HorizontalSeparatorProps) {
  return (
    <View style={[styles.horizontalSeparator, { width: width }, style]}></View>
  );
}

const styles = StyleSheet.create({
  verticalSeparator: {
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  horizontalSeparator: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});
