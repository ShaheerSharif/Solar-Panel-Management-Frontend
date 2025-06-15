import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Rect, Defs, LinearGradient, Stop } from "react-native-svg";

export default function SVGProgressBar({ progress = 0.6 }) {
  const width = 300;
  const height = 15;
  const borderRadius = 12;
  const progressWidth = Math.max(0, Math.min(progress, 1)) * width;

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        <Defs>
          {/* Gradient for fill and border */}
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor="green" />
            <Stop offset="50%" stopColor="yellow" />
            <Stop offset="100%" stopColor="red" />
          </LinearGradient>
        </Defs>

        {/* Border outline — full size, always visible */}
        <Rect
          x="0"
          y="0"
          width={width}
          height={height}
          rx={borderRadius}
          ry={borderRadius}
          fill="none"
          stroke="url(#grad)"
          strokeWidth={2}
        />

        {/* Progress Fill — width based on progress */}
        <Rect
          x="0"
          y="0"
          width={progressWidth}
          height={height}
          rx={borderRadius}
          ry={borderRadius}
          fill="url(#grad)"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
});
