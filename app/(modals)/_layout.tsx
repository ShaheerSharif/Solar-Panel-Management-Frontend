import { Stack } from "expo-router";

export default function ModalLayout() {
  <Stack
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="tabone-modal" options={{ presentation: "modal" }} />
  </Stack>;
}
