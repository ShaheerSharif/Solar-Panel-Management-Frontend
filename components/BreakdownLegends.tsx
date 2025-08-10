import { ColorValue, ViewProps } from "react-native";
import { Box } from "./ui/box";
import { Center } from "./ui/center";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

import { BreakdownType } from "@/types/custom-types";
import { totalPower } from "@/utils/breakdown-functions";
import { capitalize } from "@/utils/str-functions";

export type BreakdownLegendsProps = {
  overallBreakDown: BreakdownType[]
  breakDownMetric: BreakdownType["text"] | null
  className: ViewProps["className"]
};

type LegendProps = {
  label: string;
  color?: ColorValue;
};

export function BreakdownLegends({
  overallBreakDown,
  className = "",
}: BreakdownLegendsProps) {
  const sum = totalPower(overallBreakDown);
  const items = overallBreakDown.map((item) => ({
    label: `${capitalize(item.text)} Production`,
    color: item.color as ColorValue,
  }));

  return (
    <Center className={className}>
      <HStack className="w-full items-center justify-center" space="lg">
        <VStack className="w-1/2 h-10 justify-start" space="md">
          <Legend label={`Total: ${sum.toFixed(1)} Wh`} />
          <Legend label={items[1].label} color={items[1].color} />
        </VStack>
        <VStack className="w-1/2 h-10 justify-start" space="md">
          <Legend label={items[0].label} color={items[0].color} />
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
