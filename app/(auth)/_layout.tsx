import { useContext } from "react";
import { Redirect, Stack } from "expo-router";
import { AuthContext } from "@/utils/authContext";

export default function AuthLayout() {
  const authContext = useContext(AuthContext);

  if (authContext.isLoggedIn) {
    return <Redirect href={"/(tabs)/DashboardScreen"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="LoginScreen" />
      <Stack.Screen name="SignupScreen" />
      <Stack.Screen name="ForgotPasswordScreen" />
    </Stack>
  );
}
