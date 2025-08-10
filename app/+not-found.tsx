import { Text, View } from "@/components/Themed";
import { Stack, useRouter } from "expo-router";
import { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { AuthContext } from "@/providers/AuthProvider";

export default function NotFoundScreen() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.replace(
          authContext.isLoggedIn ? "/(tabs)/DashboardScreen" : "/(auth)/LoginScreen"
        )}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
