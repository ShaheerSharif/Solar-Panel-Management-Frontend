export type Weather = {
  temperature: number;
  outlook: "sunny" | "cloudy" | "rain" | "snow" | "clear";
};

export type SystemStatus = {
  gridPower: number;
  solarPower: number;
  batteryPercentage: number;
  batteryIsCharging: boolean;
};

export type BatteryStatus = {
  status: "charging" | "full" | "normal" | "low" | "critical" | "dead";
};

export function getSystemStatus() {
  const systemStatus: SystemStatus = {
    gridPower: 121,
    solarPower: 121,
    batteryPercentage: 30,
    batteryIsCharging: true,
  };

  return systemStatus;
}

export function getBatteryStatus(
  batteryPercentage: SystemStatus["batteryPercentage"],
  batteryIsCharging: SystemStatus["batteryIsCharging"]
): BatteryStatus {
  if (batteryIsCharging) {
    return { status: "charging" };
  } else if (batteryPercentage >= 90) {
    return { status: "full" };
  } else if (batteryPercentage >= 50) {
    return { status: "normal" };
  } else if (batteryPercentage >= 30) {
    return { status: "low" };
  } else if (batteryPercentage >= 0) {
    return { status: "critical" };
  }

  return { status: "dead" };
}

export function getWeather() {
  const weather: Weather = {
    temperature: 23,
    outlook: "sunny",
  };

  return weather;
}

export function getGridDependance() {
  return 79;
}

export function getNetImport() {
  return 121;
}

export function getDate() {
  return "14 Jun 2025";
}

export function getUpdatedTimeDelta() {
  return "1 min";
}
