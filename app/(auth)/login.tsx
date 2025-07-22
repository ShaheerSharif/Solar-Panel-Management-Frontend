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
  const PASS_LENGTH = 6;

  const router = useRouter();
  const authContext = useContext(AuthContext);
  const [verifyStatus, setVerifyStatus] = useState<boolean>();

  const [email, setEmail] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean | undefined>();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean | undefined>();

  const checkEmailValid = () => {
    setIsEmailInvalid(email === undefined || email === "");
  };

  const checkPasswordValid = () => {
    setIsPasswordInvalid(password === undefined || password.length < 6);
  };

  const handlelogin = () => {
    checkEmailValid();
    checkPasswordValid();

    if (!isEmailInvalid && !isPasswordInvalid) {

      setVerifyStatus(authContext.login(email, password));

      if (verifyStatus) router.replace("/(tabs)/dashboard");
    }
  };

  const emailErrMsg = (): string => {
    if (!email) return "Email is required";
    if (!verifyStatus) return "Incorrect email or password";
    return "";
  };

  const passwordErrMsg = (): string => {
    if (!password) return "Password is required";
    if (!verifyStatus) return "Incorrect email or password";
    return "";
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
            <FormControlErrorText>{emailErrMsg()}</FormControlErrorText>
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
          <FormControlHelper>
            <FormControlHelperText>
              {`Must be atleast ${PASS_LENGTH} characters`}
            </FormControlHelperText>
          </FormControlHelper>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{passwordErrMsg()}</FormControlErrorText>
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
