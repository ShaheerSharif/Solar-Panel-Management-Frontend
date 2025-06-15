import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { MyIcons, MyIconProps } from "./MyIcons";

export type CircleViewProps = {
  diameter: number;
  iconName: MyIconProps["name"];
  value: number;
  unit: string;
  subtext: string;
  color?: string;
};

export function CircleView({
  diameter,
  iconName,
  value,
  unit,
  subtext,
  color,
}: CircleViewProps) {
  const radius = diameter / 2;
  const componentColor = color ?? "black";

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.circleContainer,
          {
            borderWidth: 1,
            borderColor: componentColor,
            borderRadius: radius,
            width: diameter,
            height: diameter,
          },
        ]}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <MyIcons name={iconName} color={componentColor} size={radius} />
        </View>
      </View>
      <View>
        <View>
          <Text style={[styles.value, { color: componentColor }]}>
            {value.toString()}
            <Text style={[styles.unit, { color: componentColor }]}>{unit}</Text>
          </Text>
        </View>
        <View>
          <Text style={styles.subtext}>{subtext}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "column", justifyContent: "center" },
  circleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  value: { fontWeight: "bold", fontSize: 12, textAlign: "center" },
  unit: { fontSize: 10 },
  subtext: { fontSize: 10, textAlign: "center" },
});
