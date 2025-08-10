import TabBarIcon from "@/components/TabBarIcon";
import { Avatar, AvatarBadge, AvatarFallbackText } from "@/components/ui/avatar";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Drawer, DrawerBackdrop, DrawerBody, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon/index.web";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { useAuth } from "@/hooks";
import { logout } from "@/utils/auth-actions";
import { isLoggedIn } from "@/utils/user-actions";
import { Redirect, Tabs } from "expo-router";
import { LogOutIcon, SunIcon } from "lucide-react-native";
import { useState } from "react";

export default function TabLayout() {
  const auth = useAuth();

  const title = "Solar Monitor";
  const colorScheme = useColorScheme();

  if (!isLoggedIn(auth)) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerStyle: { backgroundColor: "#3b82f6" },
        headerTitle() {
          const user = auth.user
          const email = user?.email
          const name = user?.displayName

          const [showDrawer, setShowDrawer] = useState(false)

          return (
            <>
              <HStack
                className="justify-start items-center w-full bg-transparent"
                space="md"
              >
                <Icon as={SunIcon} size="xl" color="white" />
                <Text className="font-extrabold color-white" size="2xl">
                  {title.toUpperCase()}
                </Text>

                <Button variant="link" className="ml-auto" onPress={() => setShowDrawer(true)}>
                  <Avatar className="bg-white">
                    <AvatarFallbackText size="lg" className="text-[#3b82f6]">{email}</AvatarFallbackText>
                    <AvatarBadge />
                  </Avatar>
                </Button>
              </HStack>

              <Drawer
                isOpen={showDrawer}
                onClose={() => {
                  setShowDrawer(false)
                }}
                size="lg"
                anchor="left"
              >
                <DrawerBackdrop />
                <DrawerContent>
                  <DrawerHeader className="justify-center flex-col gap-5 mt-10">
                    <Avatar size="xl" className="bg-[#3b82f6]">
                      <AvatarFallbackText>{email}</AvatarFallbackText>
                      <AvatarBadge />
                    </Avatar>
                    <VStack className="justify-center">
                      <Text size="xl" className="text-typography-600">
                        {name}
                      </Text>
                      <Text size="lg" className="text-typography-600">
                        {email}
                      </Text>
                    </VStack>
                    <Divider orientation="horizontal" />
                  </DrawerHeader>
                  <DrawerBody className="mt-5">
                    <Button variant="outline" action="primary" onPress={logout}>
                      <ButtonText>Logout</ButtonText>
                      <ButtonIcon as={LogOutIcon} />
                    </Button>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </>
          );
        },
        tabBarLabelStyle: {
          fontWeight: "800",
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) =>
            <TabBarIcon name="home" unFocusedName="home-outline" color={color} focused={focused} />
        }}
      />
      <Tabs.Screen
        name="status"
        options={{
          title: "Status",
          tabBarIcon: ({ color, focused }) =>
            <TabBarIcon name="analytics" unFocusedName="analytics-outline" color={color} focused={focused} />
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notification",
          tabBarIcon: ({ color, focused }) =>
            <TabBarIcon name="notifications" unFocusedName="notifications-outline" color={color} focused={focused} />
        }}
      />
    </Tabs>
  );
}
