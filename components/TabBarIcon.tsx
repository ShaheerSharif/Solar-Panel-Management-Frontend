import React from "react";
import { Ionicons } from "@expo/vector-icons";

type TabBarIconProps = {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  focused?: boolean,
  unFocusedName?: React.ComponentProps<typeof Ionicons>["name"];
}

export default function TabBarIcon({
  name,
  color,
  focused = true,
  unFocusedName = name
}: TabBarIconProps) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} name={focused ? name : unFocusedName} color={color} />;
}
