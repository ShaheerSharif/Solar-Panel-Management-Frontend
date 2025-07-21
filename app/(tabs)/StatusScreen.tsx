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
import { MyIcons } from "@/components/MyIcons";

import {
  BadgeCheckIcon,
  BadgeInfoIcon,
  BatteryCharging,
  BatteryFullIcon,
  Grid2X2PlusIcon,
  HouseIcon,
  LucideBatteryPlus,
  SunIcon,
} from "lucide-react-native";
import { } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { Divider } from "@/components/ui/divider";
import { Icon } from "@/components/ui/icon/index.web";

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

  return (
    <SafeAreaView edges={["left", "right"]}>
      <ScrollView style={{ flex: 1 }}>
        {/* Main Container */}
        <VStack className="bg-white px-4 py-4" space="md">
          {/* Status Container */}
          <VStack space="md">
            <HStack space="4xl" className="w-full">
              <HStack className="w-1/2">
                <Badge size="sm" variant="outline" action="info">
                  <BadgeIcon as={BadgeInfoIcon} className="mr-1" />
                  <BadgeText>
                    {batteryStatus.status.charAt(0) +
                      batteryStatus.status.slice(1)}
                  </BadgeText>
                </Badge>
              </HStack>
              <HStack space="sm" className="justify-end">
                <Icon as={SunIcon} />
                <Text>Sunny</Text>
              </HStack>
            </HStack>
            <Box className="w-full">
              <Text>On Grid</Text>
            </Box>
            <Box className="w-full">
              <Text>
                22 Jun 2025
                <Text className="text-gray-400"> Updated (1 min ago)</Text>
              </Text>
            </Box>
          </VStack>

          {/* Charging and Power */}
          <Center className="w-full border-2 py-2 mt-3 rounded-lg">
            <HStack space="4xl">
              <HStack space="sm">
                <Center>
                  <Icon as={BatteryCharging} size="xl" />
                </Center>
                <VStack>
                  <Text>Charging</Text>
                  <Text>30%</Text>
                </VStack>
              </HStack>
              <Divider orientation="vertical" />
              <HStack space="sm">
                <Center>
                  <Icon as={LucideBatteryPlus} size="xl" />
                </Center>
                <VStack>
                  <Text>Charging</Text>
                  <Text>30%</Text>
                </VStack>
              </HStack>
            </HStack>
          </Center>

          {/* Production/Comsumption */}
          <Center className="w-full mt-6">
            <VStack space="4xl">
              {/* Production */}
              <HStack>
                {/* Production Grid */}
                <Center className="w-1/3">
                  <Center className="border-2 rounded-full p-2">
                    <Icon as={Grid2X2PlusIcon} size="xl" />
                  </Center>
                  <Text className="font-bold text-sm">
                    5.4 <Text className="text-xs">kWh</Text>
                  </Text>
                  <Text className="text-xs">Imported</Text>
                </Center>
                {/* Production Solar */}
                <Center className="w-1/3">
                  <Center className="border-2 rounded-full p-2">
                    <Icon as={SunIcon} size="xl" />
                  </Center>
                  <Text className="font-bold text-sm">
                    5.4 <Text className="text-xs">kWh</Text>
                  </Text>
                  <Text className="text-xs">Produced</Text>
                </Center>
                {/* Production Battery */}
                <Center className="w-1/3">
                  <Center className="border-2 rounded-full p-2">
                    <Icon as={BatteryFullIcon} size="xl" />
                  </Center>
                  <Text className="font-bold text-sm">
                    5.4 <Text className="text-xs">kWh</Text>
                  </Text>
                  <Text className="text-xs">Discharged</Text>
                </Center>
              </HStack>
              {/* Consumption House */}
              <HStack>
                <Center className="w-full">
                  <Center className="border-2 rounded-full p-4">
                    <Icon as={HouseIcon} size="xl" />
                    <Text className="font-bold text-sm">
                      5.4 <Text className="text-xs">kWh</Text>
                    </Text>
                    <Text className="text-xs">Consumed</Text>
                  </Center>
                </Center>
              </HStack>

              {/* Exported */}
              <HStack>
                {/* Exported Grid */}
                <Center className="w-1/2">
                  <Center className="border-2 rounded-full p-2">
                    <Icon as={Grid2X2PlusIcon} size="xl" />
                  </Center>
                  <Text className="font-bold text-sm">
                    5.4 <Text className="text-xs">kWh</Text>
                  </Text>
                  <Text className="text-xs">Exported</Text>
                </Center>
                {/* Exported Battery */}
                <Center className="w-1/2">
                  <Center className="border-2 rounded-full p-2">
                    <Icon as={BatteryFullIcon} size="xl" />
                  </Center>
                  <Text className="font-bold text-sm">
                    5.4 <Text className="text-xs">kWh</Text>
                  </Text>
                  <Text className="text-xs">Charged</Text>
                </Center>
              </HStack>
            </VStack>
          </Center>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
