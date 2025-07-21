import { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
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

export default function SignupScreen() {
  const PASS_LENGTH = 6;

  const router = useRouter();
  const authContext = useContext(AuthContext);
  const [signupStatus, setSignupStatus] = useState<boolean>();

  const [email, setEmail] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean | undefined>();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean | undefined>();

  const checkEmail = () => {
    setIsEmailInvalid(email === undefined || email === "");
  };

  const checkPassword = () => {
    setIsPasswordInvalid(password === undefined || password.length < PASS_LENGTH);
  };

  const handleSignup = () => {
    checkEmail();
    checkPassword();

    if (!isEmailInvalid && !isPasswordInvalid) {

      setSignupStatus(authContext.signup(email, password));

      if (signupStatus) router.replace("/(auth)/login");
    }
  };

  const emailErrMsg = (): string => {
    if (!email) return "Email is required";
    if (!signupStatus) return "Incorrect email or password";
    return "";
  };

  const passwordErrMsg = (): string => {
    if (!password) return "Password is required";
    if (password.length < PASS_LENGTH) return `Password must have atleast ${PASS_LENGTH} characters`;
    if (!signupStatus) return "Incorrect email or password";
    return "";
  };

  return (
    <SafeAreaView edges={["top", "bottom"]}>
      <Center className="h-full rounded">
        <VStack className="w-full max-w-[300px] p-4">
          <Heading className="mb-5 self-center" size={"2xl"}>
            SignUp
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

          <Button
            className="w-60 mt-10 rounded-full self-center"
            size="lg"
            onPress={handleSignup}
          >
            <ButtonText>Create Account</ButtonText>
          </Button>

          <Link
            onPress={(e) => {
              e?.preventDefault();
              router.replace("/(auth)/login")
            }}
            className="mt-4 self-center"
          >
            <LinkText>Already have an account?</LinkText>
          </Link>
        </VStack>
      </Center>
    </SafeAreaView>
  );
}
