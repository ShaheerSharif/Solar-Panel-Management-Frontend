import { View, Text, StyleSheet } from "react-native";
import { DynamicColorText } from "./DynamicColorText";
import { SystemStatus } from "@/utils/status-functions";
import { Ionicons } from "@expo/vector-icons";
import { BatteryStatus } from "@/utils/status-functions";

export type BatteryIconProps = {
  batteryPercentage: SystemStatus["batteryPercentage"];
  batteryIsCharging: boolean;
};

const batteryIconMap: Record<
  BatteryStatus["status"],
  [keyof typeof Ionicons.glyphMap, string]
> = {
  charging: ["battery-charging", "rgb(0, 122, 255)"],
  full: ["battery-full", "rgb(2, 122, 72)"],
  normal: ["battery-half", "rgb(179, 107, 0)"],
  low: ["battery-half", "rgb(255, 143, 0)"],
  critical: ["battery-half", "rgb(185, 28, 28)"],
  dead: ["battery-dead", "rgb(0, 0, 0)"],
};

export function BatteryIcon({
  batteryPercentage,
  batteryIsCharging = false,
}: BatteryIconProps) {
  let batteryStatus: BatteryStatus["status"];

  if (batteryIsCharging) {
    batteryStatus = "charging";
  } else if (batteryPercentage >= 90) {
    batteryStatus = "full";
  } else if (batteryPercentage >= 50) {
    batteryStatus = "normal";
  } else if (batteryPercentage >= 30) {
    batteryStatus = "low";
  } else if (batteryPercentage >= 0) {
    batteryStatus = "critical";
  } else {
    batteryStatus = "dead";
  }

  const [status, color] = batteryIconMap[batteryStatus];

  return (
    <View style={styles.iconContainer}>
      <View style={{ transform: [{ rotate: "270deg" }] }}>
        <Ionicons name={status} size={48} color={color} />
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Text style={{ textTransform: "uppercase", color: "#6e6e6e" }}>
          {batteryStatus.toUpperCase()}
        </Text>
        <Text style={{ color: color }}>{batteryPercentage.toString()} %</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    padding: 5,
  },
});
