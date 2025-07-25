import { ColorValue } from "react-native";
import { BreakdownType } from "@/types/custom-types";
import { ChartColorType, UsageType } from "@/types/custom-types";
import { ChartColors } from "@/constants/GraphConstants";

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const hours = [
  "12 am",
  "1 am",
  "2 am",
  "3 am",
  "4 am",
  "5 am",
  "6 am",
  "7 am",
  "8 am",
  "9 am",
  "10 am",
  "11 am",
  "12 pm",
  "1 pm",
  "2 pm",
  "3 pm",
  "4 pm",
  "5 pm",
  "6 pm",
  "7 pm",
  "8 pm",
  "9 pm",
  "10 pm",
  "11 pm",
];

export const daily = [
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
  "13th",
  "14th",
  "15th",
  "16th",
  "17th",
  "18th",
  "19th",
  "20th",
  "21st",
  "22nd",
  "23rd",
  "24th",
  "25th",
  "26th",
  "27th",
  "28th",
  "29th",
  "30th",
  "31st",
];

export const yearly = ["2020", "2021", "2022", "2023", "2024", "2025"];

export const barData = [
  { value: 20, label: "Jan" },
  { value: 45, label: "Feb" },
  { value: 28, label: "Mar" },
  { value: 80, label: "Apr" },
  { value: 99, label: "May" },
  { value: 43, label: "Jun" },
];

export const pieData = {
  produced: [
    { value: 40, color: "#f00", text: "Solar" },
    { value: 30, color: "#0f0", text: "Grid" },
    { value: 30, color: "#00f", text: "Battery" },
  ],

  consumed: [
    { value: 40, color: "#f00", text: "Solar" },
    { value: 30, color: "#0f0", text: "Grid" },
    { value: 30, color: "#00f", text: "Battery" },
  ],
};

export function generatePowerUsageData(
  min: number,
  max: number,
  labels: string[]
) {
  return labels.map((label) => ({
    label,
    value: Math.round((Math.random() * (max - min) + min) * 10) / 10,
  }));
}
