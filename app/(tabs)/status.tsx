import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { VerticalSeparator, HorizontalSeparator } from "@/components/Separator";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "@/utils/authContext";
import { Redirect } from "expo-router";
import SVGProgressBar from "@/components/SVGProgressBar";

import {
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

export default function StatusScreen() {
  const authState = useContext(AuthContext);
  const gridDependance = getGridDependance();
  const systemStatus = getSystemStatus();
  const weather = getWeather();
  const date = getDate();
  const updated = getUpdatedTimeDelta();

  const colors = {
    blue: "rgb(0, 122, 255)",
    green: "rgb(0, 153, 51)",
    yellow: "rgb(234, 179, 8)",
    orange: "rgb(255, 143, 0)",
    red: "rgb(185, 28, 28)",
  };

  if (!authState.isLoggedIn) {
    return <Redirect href="/(auth)/login"></Redirect>;
  }

  return (
    <View style={styles.pageContainer}>
      <ScrollView>
        {/* Main Container */}
        <View style={styles.mainContainer}>
          <View
            style={[
              styles.rowContainer,
              styles.textContainer,
              { marginTop: 10 },
            ]}
          >
            <Text>Normal</Text>
            <View style={{ flexDirection: "row" }}>
              <WeatherIcon outlook={weather.outlook} />
              <Text style={{ textAlign: "right" }}>
                {weather.temperature}°C
              </Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text>On Grid</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>
              {date}
              <Text style={styles.subText}> (Updated {updated} ago)</Text>
            </Text>
          </View>
          <View style={styles.chargingContainer}>
            <BatteryIcon
              batteryIsCharging={systemStatus.batteryIsCharging}
              batteryPercentage={systemStatus.batteryPercentage}
            />
            <VerticalSeparator height="70%" style={styles.separator} />
            <View style={styles.iconContainer}>
              <View style={{ paddingHorizontal: 10 }}>
                <Ionicons name="flash" size={48} color="yellow" />
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Text style={[styles.subText, { textTransform: "uppercase" }]}>
                  Power
                </Text>
                <Text>{systemStatus.solarPower.toString()} kWh</Text>
              </View>
            </View>
          </View>

          {/* Circle Icons Container */}
          <View style={styles.circleColumnContainer}>
            <View style={styles.circleRowContainer}>
              <CircleView
                diameter={40}
                iconName="grid-outline"
                value={5.4}
                unit="kWh"
                subtext="Imported"
              />
              <CircleView
                diameter={40}
                iconName="sunny-outline"
                value={0.2}
                unit="kWh"
                subtext="Produced"
                color={colors.yellow}
              />
              <CircleView
                diameter={40}
                iconName="battery-dead-outline"
                value={0.2}
                unit="kWh"
                subtext="Discharged"
                color={colors.green}
              />
            </View>
            <View
              style={[
                styles.circleRowContainer,
                { alignSelf: "center", marginTop: 30, marginBottom: 18 },
              ]}
            >
              <CircleContainedView
                diameter={80}
                iconName="home-outline"
                value={0.9}
                unit="kWh"
                subtext="Consumed"
                color={colors.orange}
              />
            </View>
            <View style={styles.circleRowContainer}>
              <CircleView
                diameter={40}
                iconName="grid-outline"
                value={0.9}
                unit="kWh"
                subtext="Exported"
              />
              <CircleView
                diameter={40}
                iconName="battery-dead-outline"
                value={0.9}
                unit="kWh"
                subtext="Charged"
                color={colors.green}
              />
            </View>
          </View>
        </View>

        {/* Title Container */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Performance</Text>
        </View>

        {/* Main Container */}
        <View
          style={[
            styles.mainContainer,
            styles.columnContainer,
            // { height: "100%" },
            { paddingVertical: 10 },
          ]}
        >
          <View style={[styles.performanceContainer, { width: "100%" }]}>
            <Text style={{ paddingHorizontal: 10 }}>
              Grid Dependance:
              <DynamicColorText val={gridDependance} maxVal={100} />
            </Text>
          </View>
          <View style={[styles.performanceContainer, { paddingVertical: 5 }]}>
            <SVGProgressBar progress={gridDependance / 100} />
          </View>
          <View style={[styles.performanceContainer, { width: "100%" }]}>
            <Text style={[styles.subText, { paddingHorizontal: 10 }]}>
              Measures dependance to the utility grid
            </Text>
          </View>
          <HorizontalSeparator
            width="95%"
            style={[
              styles.separator,
              { marginVertical: 15, paddingHorizontal: 10 },
            ]}
          />
          <View style={[styles.performanceContainer, { width: "100%" }]}>
            <Text style={{ paddingHorizontal: 10 }}>Net Imported</Text>
          </View>
          <View style={[styles.performanceContainer, { width: "100%" }]}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
            >
              <MyIcons
                name="arrow-down-circle-outline"
                color="orange"
                size={20}
              />
              <View>
                <Text>{getNetImport().toString()}kWh</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Title Container */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Cleaning</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  mainContainer: {
    paddingHorizontal: 12,
    backgroundColor: "rgb(255, 255, 255)",
  },
  textContainer: {
    paddingVertical: 6,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  columnContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  subText: {
    color: "#6e6e6e",
  },
  chargingContainer: {
    flexDirection: "row",
    borderColor: "#6e6e6e",
    borderRadius: 5,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 15,
    marginVertical: 15,
  },
  performanceContainer: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  separator: {
    alignSelf: "center",
  },
  iconContainer: {
    flexDirection: "row",
    padding: 5,
  },
  titleContainer: {
    marginVertical: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  title: {
    color: "#6e6e6e",
    textTransform: "uppercase",
  },
  circleColumnContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 20,
  },
  circleRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
