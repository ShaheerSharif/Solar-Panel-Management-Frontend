import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DashboardScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView>
        <Text>Dashboard</Text>
      </ScrollView>
    </View>
  );
}
