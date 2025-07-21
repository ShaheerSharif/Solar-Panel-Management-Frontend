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
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Center } from "@/components/ui/center";
import { Link, LinkText } from "@/components/ui/link";
import { Heading } from "@/components/ui/heading";

export default function LoginScreen() {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const [verifyStatus, setVerifyStatus] = useState<boolean>();

  const [email, setEmail] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean | undefined>();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<
    boolean | undefined
  >();

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

      if (verifyStatus) router.replace("/(tabs)/DashboardScreen");
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
      <Center className="h-full">
        <VStack className="w-full max-w-[300px] p-4">
          <Heading className="mb-5 self-center" size={"2xl"}>
            Login
          </Heading>
          {/* Email */}
          <FormControl size="lg" isRequired={true} isInvalid={isEmailInvalid}>
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1" variant="rounded" size="lg">
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
            <FormControlLabel className="mt-4">
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1" variant="rounded" size="lg">
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
                Must be atleast 6 characters
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{passwordErrMsg()}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          <Link
            onPress={() => router.push("/(auth)/ForgotPasswordScreen")}
            className="mt-4 self-end"
          >
            <LinkText>Forgot Password?</LinkText>
          </Link>

          <Button
            className="w-60 mt-10 rounded-full self-center"
            size="lg"
            onPress={handlelogin}
          >
            <ButtonText>Login</ButtonText>
          </Button>

          <Link
            onPress={() => router.replace("/(auth)/SignupScreen")}
            className="mt-4 self-center"
          >
            <LinkText>Don't have an account?</LinkText>
          </Link>
        </VStack>
      </Center>
    </SafeAreaView>
  );
}
