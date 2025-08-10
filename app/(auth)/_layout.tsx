import { useAuth } from "@/hooks";
import { isLoggedIn } from "@/utils/user-actions";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const authState = useAuth()

  if (isLoggedIn(authState)) {
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
