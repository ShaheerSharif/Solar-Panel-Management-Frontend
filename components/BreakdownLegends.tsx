import { ViewProps, ColorValue } from "react-native";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import { Text } from "./ui/text";
import { Box } from "./ui/box";
import { Center } from "./ui/center";

import { capitalize } from "@/utils/str-functions";
import { totalPower } from "@/utils/breakdown-functions";
import { BreakdownType, UsageType } from "@/types/custom-types";

export type BreakdownLegendsProps = {
  overallBreakDown: BreakdownType[];
  breakDownMetric: BreakdownType["text"] | undefined;
  usageType: UsageType;
  className: ViewProps["className"];
};

type LegendProps = {
  label: string;
  color?: ColorValue;
};

export function BreakdownLegends({
  overallBreakDown,
  breakDownMetric,
  usageType,
  className = "",
}: BreakdownLegendsProps) {
  const sum = totalPower(overallBreakDown);
  const items = overallBreakDown.map((item) => ({
    label: `${capitalize(item.text)} ${capitalize(usageType)}`,
    color: item.color as ColorValue,
  }));

  return (
    <Center className={className}>
      <HStack className={"w-full items-center justify-center"} space="lg">
        <VStack className="w-1/2" space="md">
          <Legend label={`Total: ${sum.toFixed(1)} kWh`} />
          <Legend label={items[1].label} color={items[1].color} />
        </VStack>
        <VStack className="w-1/2" space="md">
          <Legend label={items[0].label} color={items[0].color} />
          <Legend label={items[2].label} color={items[2].color} />
        </VStack>
      </HStack>
    </Center>
  );
}

function Legend({ label, color = "rgba(255, 255, 255, 0)" }: LegendProps) {
  return (
    <HStack className="items-center justify-start" space="sm">
      <Box className="w-4 h-4 rounded-md" style={{ backgroundColor: color }} />
      <Text size="sm">{label}</Text>
    </HStack>
  );
}
