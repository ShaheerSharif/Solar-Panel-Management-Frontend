import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { MyIcon, MyIconProps } from "./MyIcon";

export type CircleContainedViewProps = {
  diameter: number;
  iconName: MyIconProps["name"];
  value: number;
  unit: string;
  subtext: string;
  color?: string;
};

export function CircleContainedView({
  diameter,
  iconName,
  value,
  unit,
  subtext,
  color,
}: CircleContainedViewProps) {
  const radius = diameter / 2;
  const iconSize = radius / 2;
  const componentColor = color ?? "black";

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.circleContainer,
          {
            borderWidth: 3,
            borderColor: componentColor,
            borderRadius: radius,
            width: diameter,
            height: diameter,
          },
        ]}
      >
        <MyIcon name={iconName} color={componentColor} size={iconSize} />
        <View>
          <View>
            <Text style={[styles.value, { color: componentColor }]}>
              {value.toString()}
              <Text style={[styles.unit, { color: componentColor }]}>
                {unit}
              </Text>
            </Text>
          </View>
          <View>
            <Text style={styles.subtext}>{subtext}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "column", justifyContent: "center" },
  circleContainer: {
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  value: { fontWeight: "bold", fontSize: 12, textAlign: "center" },
  unit: { fontSize: 10 },
  subtext: { fontSize: 10, textAlign: "center" },
});
