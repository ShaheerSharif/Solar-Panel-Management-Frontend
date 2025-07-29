import { Redirect, Stack } from "expo-router";

import { isLoggedIn } from "@/utils/userActions";
import { useAuth } from "@/utils/authContext";

export default function AuthLayout() {
  const auth = useAuth();

  if (isLoggedIn(auth.user)) {
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
