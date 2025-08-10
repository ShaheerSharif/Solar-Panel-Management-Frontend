import { ChartColors } from "@/constants/GraphConstants";
import { BreakdownType, ChartColorType } from "@/types/custom-types";

export function totalPower(overallBreakdown: BreakdownType[]) {
  return overallBreakdown.reduce((sum, item) => item.value + sum, 0);
}

export function getPower(
  overallBreakdown: BreakdownType[],
  metric: BreakdownType["text"]
) {
  return overallBreakdown.find((item) => item.text === metric)?.value ?? 0;
}

export function metricPercentage(
  overallBreakdown: BreakdownType[],
  metric: BreakdownType["text"]
) {
  const total = totalPower(overallBreakdown);
  const metricVal = getPower(overallBreakdown, metric);

  return (metricVal / total) * 100.0;
}

function generateBreakdown(
  min: number,
  max: number,
  colors: ChartColorType,
): BreakdownType[] {
  return [
    {
      text: "solar",
      value: Math.round((Math.random() * (max - min) + min) * 10) / 10,
      color: colors.pieColor2.toString(),
      gradientCenterColor: colors.pieGrad2.toString(),
    },
    {
      text: "grid",
      value: Math.round((Math.random() * (max - min) + min) * 10) / 10,
      color: colors.pieColor1.toString(),
      gradientCenterColor: colors.pieGrad1.toString(),
    },
  ];
}

export function generateBreakdownData(min: number, max: number) {
  return generateBreakdown(min, max, ChartColors.produced)
}
