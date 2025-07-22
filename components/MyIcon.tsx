import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type MyIconProps = ComponentProps<typeof Ionicons>;

export function MyIcon(props: MyIconProps) {
  return <Ionicons {...props} />;
}
