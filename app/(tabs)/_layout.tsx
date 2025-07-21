import React, { useContext } from "react";
import { Redirect, Tabs } from "expo-router";
import { SunIcon } from "lucide-react-native";

import { AuthContext } from "@/utils/authContext";
import Colors from "@/constants/Colors";

import TabBarIcon from "@/components/TabBarIcon";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon/index.web";

export default function TabLayout() {
  const title = "Solar Monitor";
  const colorScheme = useColorScheme();
  const authState = useContext(AuthContext);

  if (!authState.isLoggedIn) {
    return <Redirect href="/(auth)/LoginScreen" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerStyle: { backgroundColor: "#3b82f6" },
        headerTitle(props) {
          return (
            <HStack
              className="justify-start items-center w-full bg-transparent"
              space="md"
            >
              <Icon as={SunIcon} size="xl" color="white" />
              <Text className="font-extrabold color-white" size="2xl">
                {title.toUpperCase()}
              </Text>
            </HStack>
          );
        },
        tabBarLabelStyle: {
          fontWeight: "800",
        },
      }}
    >
      <Tabs.Screen
        name="DashboardScreen"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) =>
            <TabBarIcon name="home" unFocusedName="home-outline" color={color} focused={focused} />
        }}
      />
      <Tabs.Screen
        name="StatusScreen"
        options={{
          title: "Status",
          tabBarIcon: ({ color, focused }) =>
            <TabBarIcon name="analytics" unFocusedName="analytics-outline" color={color} focused={focused} />
        }}
      />
      <Tabs.Screen
        name="NotificationScreen"
        options={{
          title: "Notification",
          tabBarIcon: ({ color, focused }) =>
            <TabBarIcon name="notifications" unFocusedName="notifications-outline" color={color} focused={focused} />
        }}
      />
    </Tabs>
  );
}
