import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon/index.web";
import { Text } from "@/components/ui/text";
import { LucideIcon, MoveRightIcon } from "lucide-react-native";
import { TextProps } from "react-native";

const ColorToProp: Record<string, [string, TextProps["className"]]> = {
  blue: ["#3b82f6", "text-blue-500"],
  green: ["#16a34a", "text-green-600"],
  orange: ["#f97316", "text-orange-500"],
  black: ["#000000", "text-black"],
};

export type StatusIconProps = {
  value: string;
  detail: string;
  icon: LucideIcon;
  arrowLeft?: boolean | undefined;
  color?: keyof typeof ColorToProp;
};

export function StatusMetric({
  value,
  detail,
  icon,
  arrowLeft,
  color = "black",
}: StatusIconProps) {
  arrowLeft = arrowLeft ?? false;
  const [iconColor, textColor] = ColorToProp[color];

  return (
    <HStack space="sm" className="items-center">
      {arrowLeft && <Icon as={MoveRightIcon} color={iconColor} />}
      <Icon as={icon} size="xl" color={iconColor} />
      <Box className="w-18">
        <Text className={`font-bold text-left ${textColor}`}>
          {value} <Text className={`text-xs ${textColor}`}>Wh</Text>
        </Text>
        <Text className="text-xs text-left text-b">{detail}</Text>
      </Box>
      {!arrowLeft && <Icon as={MoveRightIcon} color={iconColor} />}
    </HStack>
  );
}
