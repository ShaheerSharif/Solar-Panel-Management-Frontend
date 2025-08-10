import { BreakdownLegends } from "@/components/BreakdownLegends";
import { UsageLineChart } from "@/components/charts/UsageLineChart";
import { CleaningContainer, CleanType } from "@/components/cleaning";
import { StatusMetricGroup } from "@/components/status-icons/StatusMetricGroup";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetIcon,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetSectionHeaderText
} from "@/components/ui/actionsheet";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ChartColors } from "@/constants/GraphConstants";
import { useAuth, useCleaner, useInverter } from "@/hooks";
import { BreakdownType, PowerUsageType, TimeFormat } from "@/types/custom-types";
import { generateBreakdownData, getPower, metricPercentage } from "@/utils/breakdown-functions";
import { capitalize } from "@/utils/str-functions";
import { ArrowUpRightFromSquareIcon, TimerIcon, UserIcon } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { ScrollView } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";

const timePeriods: { format: TimeFormat, text: string }[] = [
  { format: "hour", text: "hourly" },
  { format: "day", text: "daily" },
  { format: "week", text: "weekly" },
  { format: "month", text: "monthly" }
]

const usageBtns: { format: PowerUsageType, text: string }[] = [
  { format: "produced", text: "Produced" },
  { format: "consumed", text: "Consumed" },
  { format: "output", text: "Net" },
]

export default function DashboardScreen() {
  const authState = useAuth()
  const { getReadings } = useInverter()
  const { triggerCleaning, listenCleaning, stopListeningCleaning } = useCleaner(authState)

  const [isCleaning, setIsCleaning] = useState(false)
  const [timeFormat, setTimeFormat] = useState<TimeFormat>("hour");
  const [showUsageType, setShowUsageType] = useState<PowerUsageType>("produced")
  const [breakDownMetric, setBreakDownMetric] = useState<BreakdownType["text"]>("solar");
  const [showCleaningActionSheet, setShowCleaningActionSheet] = useState(false);
  const [cleanMethod, setCleanMethod] = useState<CleanType>("manual");

  const openCleaningSheet = () => setShowCleaningActionSheet(true)

  const closeCleaningSheet = () => setShowCleaningActionSheet(false)

  const selectSolarCleanMethod = (method: CleanType) => {
    if (method !== cleanMethod) {
      setCleanMethod(method)
    }
    closeCleaningSheet()
  }

  const [min, max] = [1, 200]

  const [powerUsageData, setPowerUsageData] = useState<{ label: string; value: { grid: number; solar: number; house: number; battery: number } }[]>([])

  useEffect(() => {
    if (authState) {
      listenCleaning(setIsCleaning)

      return stopListeningCleaning
    }
  }, [authState])

  useEffect(() => {
    const loadReadings = async () => {
      try {
        const data = await getReadings(timeFormat)
        setPowerUsageData(data)
        console.log(`Usage data: ${powerUsageData.length}`)
      } catch (err: any) {
        console.error("Failed to load readings", err)
      }
    }

    loadReadings()
  }, [getReadings, timeFormat])


  const breakdownOverall = useMemo(
    (): Record<TimeFormat, BreakdownType[]> => ({
      month: generateBreakdownData(min, max),
      week: generateBreakdownData(min, max),
      day: generateBreakdownData(min, max),
      hour: generateBreakdownData(min, max)
    }),
    [min, max]
  );

  const statusMetrics = {
    batteryDischarge: Math.round((Math.random() * (max - min) + min) * 10) / 10,
    batteryCharge: Math.round((Math.random() * (max - min) + min) * 10) / 10,
    solarImport: Math.round((Math.random() * (max - min) + min) * 10) / 10,
    consumption: Math.round((Math.random() * (max - min) + min) * 10) / 10,
    gridImport: Math.round((Math.random() * (max - min) + min) * 10) / 10,
    gridExport: Math.round((Math.random() * (max - min) + min) * 10) / 10,
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
      edges={["left", "right"]}
    >
      {/* Time Period Buttons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="w-full py-3 border-b-hairline border-slate-400"
      >
        <HStack className="overflow-x-auto justify-between">
          {timePeriods.map((value) => (
            <Button
              key={value.format}
              variant={timeFormat === value.format ? "solid" : "outline"}
              onPress={() => setTimeFormat(value.format)}
              size="sm"
              className="border-0 rounded-lg mx-2"
            >
              <ButtonText size="sm">
                {value.text.toUpperCase()}
              </ButtonText>
            </Button>
          ))}
        </HStack>
      </ScrollView>

      <ScrollView>
        <Box className="p-4 flex-1">

          {/* Status Metrics */}

          <Box className="w-full mb-6 mt-2">
            <StatusMetricGroup
              batteryDischarge={statusMetrics.batteryDischarge}
              batteryCharge={statusMetrics.batteryCharge}
              solarImport={statusMetrics.solarImport}
              consumption={statusMetrics.consumption}
              gridImport={statusMetrics.gridImport}
              gridExport={statusMetrics.gridExport}
            />
          </Box>

          <Center className="my-4">
            <Divider orientation="horizontal" className="w-11/12" />
          </Center>

          <Heading className="text-center mb-5" size="xl">
            Power Usage
          </Heading>

          <UsageLineChart data={powerUsageData} max={max} usageType={showUsageType} />

          {/* Production/Consumption Buttons */}

          <Center className="items-center">
            <HStack className="p-2 rounded-xl" space="sm">
              {usageBtns.map(value => {
                const color = ChartColors[value.format].lineGraph.toString()

                if (value.format === showUsageType) {
                  return (
                    <Button
                      key={value.format}
                      className="rounded-lg"
                      style={{ backgroundColor: color }}
                      onPress={() => setShowUsageType(value.format)}
                    >
                      <ButtonText>
                        {value.text}
                      </ButtonText>
                    </Button>
                  )
                }

                return (
                  <Button
                    key={value.format}
                    className="rounded-lg"
                    onPress={() => setShowUsageType(value.format)}
                  >
                    <ButtonText>
                      {value.text}
                    </ButtonText>
                  </Button>
                )
              })}
            </HStack>
          </Center>

          <Center className="my-6">
            <Divider orientation="horizontal" className="w-11/12" />
          </Center>

          {/* Breakdown Chart */}

          <Heading size="xl" className="text-center mb-5">Usage Breakdown</Heading>

          <Center>
            <PieChart
              data={breakdownOverall[timeFormat]}
              donut
              radius={110}
              innerRadius={70}
              focusOnPress
              isAnimated
              animationDuration={1000}
              onPress={(item: BreakdownType) => setBreakDownMetric(item.text)}
              centerLabelComponent={() => {
                return (
                  <Center>
                    <Text className="font-bold" size="lg">
                      {`${metricPercentage(
                        breakdownOverall[timeFormat],
                        breakDownMetric
                      ).toFixed(1)}%`}
                    </Text>
                    <Divider orientation="horizontal" className="w-full" />
                    <Text className="font-bold" size="lg">
                      {`${getPower(
                        breakdownOverall[timeFormat],
                        breakDownMetric
                      ).toFixed(1)} Wh`}
                    </Text>
                    <Text size="xs">{capitalize(breakDownMetric)}</Text>
                    <Text size="xs">Production</Text>
                  </Center>
                );
              }}
            />
          </Center>

          <BreakdownLegends
            className="mt-6 w-full px-6"
            overallBreakDown={breakdownOverall[timeFormat]}
            breakDownMetric={breakDownMetric}
          />

          <Center className="my-6">
            <Divider orientation="horizontal" className="w-11/12" />
          </Center>
        </Box>

        <VStack className="justify-center gap-7 px-6 mb-6">

          <HStack className="w-full justify-center items-center gap-1">
            <Button variant="link" onPress={openCleaningSheet}>
              <Heading size="xl">Cleaning</Heading>
              <ArrowUpRightFromSquareIcon />
            </Button>
          </HStack>

          <CleaningContainer
            type={cleanMethod}
            isCleaning={isCleaning}
            triggerCleaning={triggerCleaning}
            setPrevCleanSchedule={(date: Date) => { }}
            setNextCleanSchedule={(date: Date) => { }}
          />
        </VStack>

        {/* Cleaning Action Sheet */}
        <Actionsheet isOpen={showCleaningActionSheet} snapPoints={[40]} onClose={closeCleaningSheet}>
          <ActionsheetBackdrop />
          <ActionsheetContent>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <HStack className="w-full mt-2 mb-4 justify-center items-center">
              <Heading>Choose Cleaning Method</Heading>
            </HStack>
            <ActionsheetSectionHeaderText size="sm" className="w-full text-left">
              Manual
            </ActionsheetSectionHeaderText>
            <ActionsheetItem onPress={() => selectSolarCleanMethod("manual")}>
              <ActionsheetIcon size="md" as={UserIcon} />
              <ActionsheetItemText size="md">Manual</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetSectionHeaderText size="sm" className="w-full text-left">
              Automatic
            </ActionsheetSectionHeaderText>
            <ActionsheetItem onPress={() => selectSolarCleanMethod("timer")}>
              <ActionsheetIcon size="md" as={TimerIcon} />
              <ActionsheetItemText size="md">Timer</ActionsheetItemText>
            </ActionsheetItem>
          </ActionsheetContent>
        </Actionsheet>

      </ScrollView>
    </SafeAreaView>
  );
}
