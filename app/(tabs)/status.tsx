import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  getBatteryStatus,
  getDate,
  getGridDependance,
  getNetImport,
  getSystemStatus,
  getUpdatedTimeDelta,
  getWeather,
} from "@/utils/status-functions";
import { DynamicColorText } from "@/components/DynamicColorText";
import { WeatherIcon } from "@/components/WeatherIcon";
import { BatteryIcon } from "@/components/BatteryIcon";
import { CircleView } from "@/components/CircleView";
import { CircleContainedView } from "@/components/CircleContainedView";
import { MyIconProps, MyIcon } from "@/components/MyIcon";

import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { Divider } from "@/components/ui/divider";
import { ComponentProps } from "react";
import { CloudDrizzle } from "lucide-react-native";

export default function StatusScreen() {
  const gridDependance = getGridDependance();
  const systemStatus = getSystemStatus();
  const weather = getWeather();
  const date = getDate();
  const updated = getUpdatedTimeDelta();
  const batteryStatus = getBatteryStatus(
    systemStatus.batteryPercentage,
    systemStatus.batteryIsCharging
  );

  const colors = {
    blue: "rgb(0, 122, 255)",
    green: "rgb(0, 153, 51)",
    yellow: "rgb(234, 179, 8)",
    orange: "rgb(255, 143, 0)",
    red: "rgb(185, 28, 28)",
  };

  const StatusContainer = ({ value, unit, detail, iconName }: { value: string, unit: string, detail: string, iconName: MyIconProps["name"] }) => (
    <Box className="w-1/2 px-2 py-2 elevation-sm bg-cyan-50 rounded-lg">
      <VStack className="gap-1 items-start">
        <HStack className="w-full items-end justify-between">
          <Text size="2xl">
            {value + " "}
            <Text>{unit}</Text>
          </Text>
          <Box>
            <MyIcon name={iconName} size={30} />
          </Box>
        </HStack>
        <Text className="text-slate-400 text-left">{detail}</Text>
      </VStack>
    </Box>
  )

  return (
    <SafeAreaView edges={["left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
      <ScrollView>
        <VStack className="mt-3 gap-2 px-4 justify-center">
          <Box className="px-6 py-4 bg-cyan-50 elevation-sm rounded-lg">
            <HStack className="items-center justify-start gap-3">
              <CloudDrizzle size={40} />
              <Text size="4xl">32 °C</Text>
              <Text size="xl" className="text-slate-400 ml-auto">Pakistan</Text>
            </HStack>
          </Box>
          <HStack className="gap-2">
            <StatusContainer value="700" unit="Wh" iconName="grid-outline" detail="Daily Production" />
            <StatusContainer value="700" unit="Wh" iconName="grid-outline" detail="Daily Consumption" />
          </HStack>
          <HStack className="gap-2">
            <StatusContainer value="700" unit="Wh" iconName="grid-outline" detail="Daily Production" />
            <StatusContainer value="700" unit="Wh" iconName="grid-outline" detail="Daily Production" />
          </HStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
