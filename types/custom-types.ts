import { ColorValue } from "react-native";

export type TimeFormat = "hour" | "day" | "week" | "month"

export type PowerUsageType = "produced" | "consumed" | "output"

export type BreakdownType = {
  text: "solar" | "grid"
  value: number
  color?: string
  gradientCenterColor?: string
}

export type ChartColorType = {
  lineGraph: ColorValue
  pieColor1: ColorValue
  pieGrad1: ColorValue
  pieColor2: ColorValue
  pieGrad2: ColorValue
  pieColor3: ColorValue
  pieGrad3: ColorValue
}
