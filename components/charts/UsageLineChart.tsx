import { ChartColors } from "@/constants/GraphConstants"
import { PowerUsageType } from "@/types/custom-types"
import { LineChart } from "react-native-gifted-charts"
import { Center } from "../ui/center"

type UsageLineChartProps = {
  data: {
    label: string, value: {
      grid: number
      solar: number
      house: number
      battery: number
    }
  }[]
  max: number
  usageType: PowerUsageType
}

export function UsageLineChart({ data, max, usageType }: UsageLineChartProps) {
  const chartData = data.map((item) => {
    let sum = 0

    if (usageType === "produced") {
      sum = item.value.grid + item.value.solar
    }
    else if (usageType === "consumed") {
      sum = item.value.house
    }
    else if (usageType === "output") {
      sum = item.value.house - item.value.solar + item.value.grid
    }

    return {
      label: item.label,
      value: sum
    }
  })

  return (
    <Center>
      <LineChart
        data={chartData}
        color={ChartColors[usageType].lineGraph.toString()}
        startFillColor={ChartColors[usageType].lineGraph.toString()}
        startOpacity={0.9}
        endOpacity={0.2}
        xAxisLabelTextStyle={{ color: "#999", fontSize: 10 }}
        xAxisTextNumberOfLines={2}
        yAxisTextStyle={{ color: "#999", fontSize: 11 }}
        xAxisColor="#ddd"
        yAxisColor="#ddd"
        yAxisLabelSuffix=" Wh"
        maxValue={usageType !== "output" ? max : Math.round(max / 2)}
        mostNegativeValue={usageType !== "output" ? 0 : Math.round(-max / 2)}
        areaChart
        curved
      />
    </Center>
  )
}
