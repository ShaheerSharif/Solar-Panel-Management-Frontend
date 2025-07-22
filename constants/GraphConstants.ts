import { ChartColorType } from "@/types/custom-types";

export const ChartColors: {
  production: ChartColorType;
  consumtion: ChartColorType;
} = {
  production: {
    lineGraph: "rgb(106, 126, 207)",
    pieColor1: "#009FFF",
    pieGrad1: "#006DFF",
    pieColor2: "#93FCF8",
    pieGrad2: "#3BE9DE",
    pieColor3: "#BDB2FA",
    pieGrad3: "#8F80F3",
  },
  consumtion: {
    lineGraph: "rgb(241, 124, 58)",
    pieColor1: "#009FFF",
    pieGrad1: "#006DFF",
    pieColor2: "#93FCF8",
    pieGrad2: "#3BE9DE",
    pieColor3: "#BDB2FA",
    pieGrad3: "#8F80F3",
  },
};

export enum TimePeriodEnum {
  hourly = "hourly",
  daily = "daily",
  weekly = "weekly",
  monthly = "monthly",
  yearly = "yearly",
}
