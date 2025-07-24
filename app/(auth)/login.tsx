import { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { AuthContext } from "@/utils/authContext";

import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon, EyeIcon, EyeOffIcon, ArrowRightIcon } from "lucide-react-native";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function LoginScreen() {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>();
  const [emailErr, setEmailErr] = useState<string>();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>();
  const [passwordErr, setPasswordErr] = useState<string>();

  const checkEmailFormat = () => {
    return email !== undefined && email !== "";
  };

  const checkPasswordFormat = () => {
    return password !== undefined && password !== "";
  };

  const handlelogin = () => {
    const emailStatus = checkEmailFormat();
    const passwordStatus = checkPasswordFormat();

    if (!emailStatus) {
      setEmailErr("Email is required");
      setIsEmailInvalid(true);
    }

    if (!passwordStatus) {
      setPasswordErr("Password is required");
      setIsPasswordInvalid(true);
    }

    if (emailStatus && passwordStatus) {

      const loginStatus = authContext.login(email, password);

      if (!loginStatus) {
        setEmailErr("Incorrect email or password");
        setPasswordErr("Incorrect email or password");
        setIsEmailInvalid(true);
        setIsPasswordInvalid(true);
      }
      else {
        router.replace("/(tabs)/dashboard");
      }
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]}>
      <VStack className="w-full h-full px-8 justify-center items-start gap-4">
        <Heading className="w-full text-center" size="2xl">Login</Heading>
        {/* Email */}
        <FormControl size="lg" isRequired={true} isInvalid={isEmailInvalid}>
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input className="w-full rounded-lg" variant="outline" size="lg">
            <InputField
              type="text"
              placeholder="Enter email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{emailErr}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        {/* Password */}
        <FormControl isRequired={true} isInvalid={isPasswordInvalid}>
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input className="w-full rounded-lg justify-between" variant="outline" size="lg">
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <InputSlot
              className="pr-3"
              onPress={() => setShowPassword(!showPassword)}
            >
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{passwordErr}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <Button
          onPress={() => router.push("/(auth)/forgot-password")}
          variant="link"
        >
          <Text className="underline">Forgot Password?</Text>
        </Button>

        <Button
          className="w-full rounded-lg"
          size="lg"
          onPress={handlelogin}
        >
          <ButtonText>Login</ButtonText>
        </Button>

        <Button
          variant="link"
          className="gap-1"
          onPress={() => router.push("/(auth)/signup")}
        >
          <ButtonIcon as={ArrowRightIcon} />
          <ButtonText>Don't have an account?</ButtonText>
        </Button>

      </VStack>
    </SafeAreaView>
  );
}
