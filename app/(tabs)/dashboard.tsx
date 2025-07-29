import { ArrowUpRightFromSquareIcon, DownloadIcon, TimerIcon, UploadIcon, UserIcon } from "lucide-react-native";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { LineChart, PieChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";

import { BreakdownLegends } from "@/components/BreakdownLegends";
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
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ChartColors, TimePeriodEnum } from "@/constants/GraphConstants";
import { BreakdownType } from "@/types/custom-types";
import {
  generateBreakdownData,
  getPower,
  metricPercentage
} from "@/utils/breakdown-functions";
import {
  daily,
  generatePowerUsageData,
  hours,
  months,
  weeks,
  yearly
} from "@/utils/chart-data";
import { capitalize } from "@/utils/str-functions";

type BreakdownModeType = "production" | "consumption"

export default function DashboardScreen() {
  const [timePeriod, setTimePeriod] = useState<TimePeriodEnum>(TimePeriodEnum.hourly);

  const [showProduced, setShowProduced] = useState(true);
  const [showConsumed, setShowConsumed] = useState(true);

  const [breakDownMetric, setBreakDownMetric] = useState<BreakdownType["text"]>("solar");

  const [showCleaningActionSheet, setShowCleaningActionSheet] = useState(false);
  const [cleanMethod, setCleanMethod] = useState<CleanType>("timer");
  const [sensorCleanThreshold, setSensorCleanThreshold] = useState(40);

  const [showBreakdownActionSheet, setShowBreakdownActionSheet] = useState(false);
  const [breakdownMode, setBreakdownMode] = useState<BreakdownModeType>("consumption");

  const changeTimePeriod = (key: TimePeriodEnum) => setTimePeriod(key);

  const openCleaningSheet = () => setShowCleaningActionSheet(true)

  const closeCleaningSheet = () => setShowCleaningActionSheet(false)

  const openBreakdownSheet = () => setShowBreakdownActionSheet(true)

  const closeBreakdownSheet = () => setShowBreakdownActionSheet(false)

  const selectSolarCleanMethod = (method: CleanType) => {
    if (method !== cleanMethod) {
      setCleanMethod(method)
    }
    closeCleaningSheet()
  }

  const selectBreakdownMode = (mode: BreakdownModeType) => {
    if (mode !== breakdownMode) {
      selectBreakdownMode(mode)
    }
    closeBreakdownSheet()
  }

  const [min, max] = [1, 9.5]

  const powerUsage = useMemo(
    (): Record<
      TimePeriodEnum,
      {
        produced: { label: string; value: number }[];
        consumed: { label: string; value: number }[];
      }
    > => ({
      yearly: {
        produced: generatePowerUsageData(min, max, yearly),
        consumed: generatePowerUsageData(min, max, yearly),
      },
      monthly: {
        produced: generatePowerUsageData(min, max, months),
        consumed: generatePowerUsageData(min, max, months),
      },
      weekly: {
        produced: generatePowerUsageData(min, max, weeks),
        consumed: generatePowerUsageData(min, max, weeks),
      },
      daily: {
        produced: generatePowerUsageData(min, max, daily),
        consumed: generatePowerUsageData(min, max, daily),
      },
      hourly: {
        produced: generatePowerUsageData(min, max, hours),
        consumed: generatePowerUsageData(min, max, hours),
      },
    }),
    [min, max]
  );

  const breakdownOverall = useMemo(
    (): Record<TimePeriodEnum,
      {
        produced: BreakdownType[];
        consumed: BreakdownType[];
      }
    > => ({
      yearly: generateBreakdownData(min, max),
      monthly: generateBreakdownData(min, max),
      weekly: generateBreakdownData(min, max),
      daily: generateBreakdownData(min, max),
      hourly: generateBreakdownData(min, max),
    }),
    [min, max]
  );

  const statusMetrics = {
    batteryDischarge: Math.round((Math.random() * (max - min) + min) * 10) / 10,
    batteryCharge: Math.round((Math.random() * (max - min) + min) * 10) / 10,
    solarImport: Math.round((Math.random() * (max - min) + min) * 10) / 10,
    consumption: Math.round((Math.random() * (max - min) + min) * 10) / 10,
    gridImport: Math.round((Math.random() * (max - min) + min) * 10) / 10,
    girdExport: Math.round((Math.random() * (max - min) + min) * 10) / 10,
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
          {Object.values(TimePeriodEnum).map((key: keyof typeof powerUsage) => (
            <Button
              key={key}
              variant={timePeriod === key ? "solid" : "outline"}
              onPress={() => changeTimePeriod(key)}
              size="sm"
              className="border-0 rounded-lg mx-2"
            >
              <Text
                className={timePeriod === key ? "text-white" : "text-black"}
                size="sm"
              >
                {key.toUpperCase()}
              </Text>
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
              gridExport={statusMetrics.girdExport}
            />
          </Box>

          <Center className="my-4">
            <Divider orientation="horizontal" className="w-11/12" />
          </Center>

          <Text size="2xl" className="bold mb-4 text-center" bold>
            Power Usage
          </Text>

          {/* Power Usage Chart */}
          <Center>
            <LineChart
              data={
                showProduced ? powerUsage[timePeriod].produced : undefined
              }
              color={ChartColors.production.lineGraph.toString()}
              startFillColor={ChartColors.production.lineGraph.toString()}
              endFillColor={ChartColors.production.lineGraph.toString()}
              startOpacity={0.9}
              endOpacity={0.2}
              data2={
                showConsumed ? powerUsage[timePeriod].consumed : undefined
              }
              color2={ChartColors.consumtion.lineGraph.toString()}
              startFillColor2={ChartColors.consumtion.lineGraph.toString()}
              endFillColor2={ChartColors.consumtion.lineGraph.toString()}
              startOpacity2={0.2}
              endOpacity2={0.9}
              stepValue={2}
              xAxisLabelTextStyle={{ color: "#999", fontSize: 10 }}
              xAxisTextNumberOfLines={2}
              yAxisTextStyle={{ color: "#999", fontSize: 11 }}
              xAxisColor="#ddd"
              yAxisColor="#ddd"
              yAxisLabelSuffix=" kWh"
              yAxisThickness={0}
              yAxisTextNumberOfLines={2}
              maxValue={max + 1}
              hideRules
              hideDataPoints
              showFractionalValues
              showVerticalLines
              adjustToWidth={
                timePeriod !== TimePeriodEnum.hourly &&
                timePeriod !== TimePeriodEnum.daily
              }
              curved
              areaChart
              areaChart1
              isAnimated
              animationDuration={1000}
            />
          </Center>

          {/* Production/Consumption Buttons */}
          <Center className="items-center">
            <HStack className="p-2 rounded-xl" space="sm">
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    borderColor: ChartColors.production.lineGraph,
                    backgroundColor: showProduced
                      ? ChartColors.production.lineGraph
                      : "white",
                  },
                ]}
                onPress={() => setShowProduced(!showProduced)}
              >
                <Text
                  className="py-2 px-4 font-medium text-center"
                  style={{
                    color: showProduced
                      ? "white"
                      : ChartColors.production.lineGraph,
                  }}
                >
                  Produced
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    borderColor: ChartColors.consumtion.lineGraph,
                    backgroundColor: showConsumed
                      ? ChartColors.consumtion.lineGraph
                      : "white",
                  },
                ]}
                onPress={() => setShowConsumed(!showConsumed)}
              >
                <Text
                  className="py-2 px-4 font-medium text-center"
                  style={{
                    color: showConsumed
                      ? "white"
                      : ChartColors.consumtion.lineGraph,
                  }}
                >
                  Consumed
                </Text>
              </TouchableOpacity>
            </HStack>
          </Center>

          <Center className="my-6">
            <Divider orientation="horizontal" className="w-11/12" />
          </Center>

          {/* Breakdown Chart */}

          <HStack className="w-full justify-center items-center gap-1">
            <Button variant="link" onPress={openBreakdownSheet}>
              <Heading size="xl">Usage Breakdown</Heading>
              <ArrowUpRightFromSquareIcon />
            </Button>
          </HStack>

          <Center>
            <PieChart
              data={breakdownOverall[timePeriod].produced}
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
                        breakdownOverall[timePeriod].produced,
                        breakDownMetric
                      ).toFixed(1)}%`}
                    </Text>
                    <Divider orientation="horizontal" className="w-full" />
                    <Text className="font-bold" size="lg">
                      {`${getPower(
                        breakdownOverall[timePeriod].produced,
                        breakDownMetric
                      ).toFixed(1)} kWh`}
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
            overallBreakDown={breakdownOverall[timePeriod].produced}
            breakDownMetric={breakDownMetric}
            usageType="production"
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

          {/* Cleaning Progress */}
          {/* <CleaningProgress value={25} mode={cleanMethod} /> */}

          <CleaningContainer
            type={cleanMethod}
            sliderValue={sensorCleanThreshold}
            setSliderValue={setSensorCleanThreshold}
          />
        </VStack>

        {/* Breakdown Action Sheet */}
        <Actionsheet isOpen={showBreakdownActionSheet} snapPoints={[40]} onClose={closeBreakdownSheet}>
          <ActionsheetBackdrop />
          <ActionsheetContent>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <HStack className="w-full mt-2 mb-4 justify-center items-center">
              <Heading>Choose Breakdown Mode</Heading>
            </HStack>
            <Divider orientation="horizontal" className="h-[1px] w-full" />
            <ActionsheetItem onPress={() => selectSolarCleanMethod("manual")}>
              <ActionsheetIcon size="md" as={UploadIcon} />
              <ActionsheetItemText size="md">Production</ActionsheetItemText>
            </ActionsheetItem>
            <Divider orientation="horizontal" className="h-[1px] w-full" />
            <ActionsheetItem onPress={() => selectSolarCleanMethod("manual")}>
              <ActionsheetIcon size="md" as={DownloadIcon} />
              <ActionsheetItemText size="md">Consumption</ActionsheetItemText>
            </ActionsheetItem>
            <Divider orientation="horizontal" className="h-[1px] w-full" />
          </ActionsheetContent>
        </Actionsheet>

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
            <Divider orientation="horizontal" className="h-[1px] w-full" />
            <ActionsheetItem onPress={() => selectSolarCleanMethod("manual")}>
              <ActionsheetIcon size="md" as={UserIcon} />
              <ActionsheetItemText size="md">Manual</ActionsheetItemText>
            </ActionsheetItem>
            <Divider orientation="horizontal" className="h-[1px] w-full" />
            <ActionsheetSectionHeaderText size="md" className="w-full text-left">
              Automatic
            </ActionsheetSectionHeaderText>
            <Divider orientation="horizontal" className="h-[1px] w-full" />
            <ActionsheetItem onPress={() => selectSolarCleanMethod("timer")}>
              <ActionsheetIcon size="md" as={TimerIcon} />
              <ActionsheetItemText size="md">Timer</ActionsheetItemText>
            </ActionsheetItem>
            <Divider orientation="horizontal" className="h-[1px] w-full" />
          </ActionsheetContent>
        </Actionsheet>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderRadius: 10,

    // IOS Shadow
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Android Shadow
    elevation: 5,
  },
});
