import {
  StyleSheet,
  TouchableOpacity,
  Button,
  Text,
  View,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
// import { Text, View, TextInput } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { AuthContext } from "@/utils/authContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const authContext = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "top"]}>
      <View style={{ alignItems: "center" }}>
        <Text
          style={styles.title}
          // lightColor={Colors.light.text}
          // darkColor={Colors.dark.text}
        >
          Login
        </Text>
      </View>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      {/* Pass email and password in login function */}
      <Button
        title="Login"
        onPress={() => authContext.logIn(email, password)}
        disabled={!email || !password}
      />
      <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
        <Text style={styles.link}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/forgot-password")}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 },
  link: { marginTop: 10, color: "blue", textAlign: "center" },
});
