import { useContext } from "react";
import { Redirect, Stack } from "expo-router";
import { AuthContext } from "@/utils/authContext";

export default function AuthLayout() {
  const authContext = useContext(AuthContext);

  if (authContext.isLoggedIn) {
    return <Redirect href={"/(tabs)/dashboard"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
