import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function HeaderIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={25} style={{ marginBottom: -3 }} {...props} />;
}
