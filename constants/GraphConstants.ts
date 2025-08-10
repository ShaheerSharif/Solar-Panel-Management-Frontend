import { ChartColorType, PowerUsageType } from "@/types/custom-types";

export const ChartColors: Record<PowerUsageType, ChartColorType> = {
  produced: {
    lineGraph: "rgb(106, 126, 207)",
    pieColor1: "#009FFF",
    pieGrad1: "#006DFF",
    pieColor2: "#93FCF8",
    pieGrad2: "#3BE9DE",
    pieColor3: "#BDB2FA",
    pieGrad3: "#8F80F3",
  },
  consumed: {
    lineGraph: "rgb(241, 124, 58)",
    pieColor1: "#009FFF",
    pieGrad1: "#006DFF",
    pieColor2: "#93FCF8",
    pieGrad2: "#3BE9DE",
    pieColor3: "#BDB2FA",
    pieGrad3: "#8F80F3",
  },
  output: {
    lineGraph: "rgb(34, 197, 94)",
    pieColor1: "#00C851",
    pieGrad1: "#007E33",
    pieColor2: "#A8E063",
    pieGrad2: "#56AB2F",
    pieColor3: "#C6FFDD",
    pieGrad3: "#11998E",

  }
}

export enum TimePeriodEnum {
  hourly = "hourly",
  daily = "daily",
  weekly = "weekly",
  monthly = "monthly",
}
