import { Weather } from "@/utils/status-functions";
import { Ionicons } from "@expo/vector-icons";

const outlookIconMap: Record<
  Weather["outlook"],
  keyof typeof Ionicons.glyphMap
> = {
  sunny: "sunny-outline",
  cloudy: "cloud-outline",
  clear: "partly-sunny-outline",
  rain: "rainy-outline",
  snow: "snow-outline",
};

export type WeatherIconProps = {
  outlook: Weather["outlook"];
};

export function WeatherIcon({ outlook }: WeatherIconProps) {
  return <Ionicons name={outlookIconMap[outlook]} size={20} />;
}
