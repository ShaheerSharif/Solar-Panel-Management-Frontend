import {
  ArrowDownIcon,
  ArrowUpIcon,
  BatteryFullIcon,
  Grid2X2PlusIcon,
  HouseIcon,
  SunIcon,
} from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon/index.web";
import { StatusMetric } from "./StatusMetric";

export type StatusMetricGroupProps = {
  gridImport: number;
  gridExport: number;
  solarImport: number;
  batteryDischarge: number;
  batteryCharge: number;
  consumption: number;
};

export function StatusMetricGroup({
  gridImport,
  gridExport,
  solarImport,
  batteryDischarge,
  batteryCharge,
  consumption,
}: StatusMetricGroupProps) {
  const net =
    gridImport +
    solarImport +
    batteryDischarge -
    (gridExport + consumption + batteryCharge);

  return (
    <Center className="w-full">
      {/* Production/Comsumption */}
      <HStack space="sm" className="items-center">
        {/* Production */}
        <VStack space="md">
          {/* Production Grid */}
          <StatusMetric
            value={gridImport.toFixed(1)}
            detail="Imported"
            icon={Grid2X2PlusIcon}
          />
          {/* Production Solar */}
          <StatusMetric
            value={solarImport.toFixed(1)}
            detail="Produced"
            icon={SunIcon}
            color="blue"
          />
          {/* Production Battery */}
          <StatusMetric
            value={batteryDischarge.toFixed(1)}
            detail="Discharged"
            icon={BatteryFullIcon}
            color="green"
          />
        </VStack>
        {/* Net Production/Consumption */}
        <VStack
          className={`border-2 rounded-full py-4 px-6 ${
            net > 0 ? "border-blue-500" : "border-orange-500"
          }`}
        >
          <Center className="w-full">
            <Icon
              as={net > 0 ? ArrowUpIcon : ArrowDownIcon}
              size="xl"
              color={net > 0 ? "#3b82f6" : "#f97316"}
            />
            <Text
              className={`font-bold ${
                net > 0 ? "text-blue-500" : "text-orange-500"
              }`}
            >
              {net > 0 ? net.toFixed(1) : (-net).toFixed(1)}{" "}
              <Text
                className={`text-xs ${
                  net > 0 ? "text-blue-500" : "text-orange-500"
                }`}
              >
                kWh
              </Text>
            </Text>
            <Text className="text-xs">Net</Text>
            <Text className="text-xs">{net > 0 ? "Produced" : "Consumed"}</Text>
          </Center>
        </VStack>

        {/* Exported */}
        <VStack space="md">
          {/* Exported Grid */}
          <StatusMetric
            value={gridExport.toFixed(1)}
            detail="Exported"
            icon={Grid2X2PlusIcon}
            arrowLeft
          />
          {/* House Consumption */}
          <StatusMetric
            value={consumption.toFixed(1)}
            detail="Consumed"
            icon={HouseIcon}
            color="orange"
            arrowLeft
          />
          {/* Exported Battery */}
          <StatusMetric
            value={batteryCharge.toFixed(1)}
            detail="Charged"
            icon={BatteryFullIcon}
            color="green"
            arrowLeft
          />
        </VStack>
      </HStack>
    </Center>
  );
}
