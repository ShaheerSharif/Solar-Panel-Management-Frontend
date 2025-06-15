import React, { useContext } from "react";
import Colors from "@/constants/Colors";
import TabBarIcon from "@/components/TabBarIcon";
import { Ionicons } from "@expo/vector-icons";
import { Link, Redirect, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { AuthContext } from "@/utils/authContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const authState = useContext(AuthContext);

  if (!authState.isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarLabelStyle: {
          fontWeight: "800",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard".toUpperCase(),
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <TabBarIcon name="home" color={color} />
            ) : (
              <TabBarIcon name="home-outline" color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="status"
        options={{
          title: "Status".toUpperCase(),
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <TabBarIcon name="analytics" color={color} />
            ) : (
              <TabBarIcon name="analytics-outline" color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notification".toUpperCase(),
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <TabBarIcon name="notifications" color={color} />
            ) : (
              <TabBarIcon name="notifications-outline" color={color} />
            ),
        }}
      />

      <Tabs.Screen
        name="test"
        options={{
          title: "Tab One".toUpperCase(),
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href="/(modals)/test-modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="information-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
