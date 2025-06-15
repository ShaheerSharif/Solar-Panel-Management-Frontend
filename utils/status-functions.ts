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

export function getSystemStatus() {
  const systemStatus: SystemStatus = {
    gridPower: 121,
    solarPower: 121,
    batteryPercentage: 30,
    batteryIsCharging: true,
  };

  return systemStatus;
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
