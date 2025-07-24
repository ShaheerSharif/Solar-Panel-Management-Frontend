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
import { AlertCircleIcon, EyeIcon, EyeOffIcon, ArrowLeftIcon } from "lucide-react-native";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Center } from "@/components/ui/center";
import { Link, LinkText } from "@/components/ui/link";
import { Heading } from "@/components/ui/heading";

export default function SignupScreen() {
  const PASS_LENGTH = 6;

  const router = useRouter();
  const authContext = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [emailErr, setEmailErr] = useState<string>();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [passwordErr, setPasswordErr] = useState<string>();

  const isEmpty = (str: string) => {
    return str === undefined || str === "";
  }

  const checkEmailFormat = () => {
    return !isEmpty(email);
  };

  const checkPasswordFormat = () => {
    return !isEmpty(password) && password.length >= PASS_LENGTH;
  };

  const handleSignup = () => {
    const emailStatus = checkEmailFormat();
    const passwordStatus = checkPasswordFormat();

    if (!emailStatus) {
      setEmailErr("Email is required");
      setIsEmailInvalid(true);
    }

    if (!passwordStatus) {
      if (isEmpty(password)) {
        setPasswordErr("Password is required");
      }
      else {
        setPasswordErr(`Must be atleast ${PASS_LENGTH} characters`);
      }
      setIsPasswordInvalid(true);
    }

    if (emailStatus && passwordStatus) {

      const signupStatus = authContext.signup(email, password);

      if (!signupStatus) {
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
      <VStack className="w-full h-full justify-center items-start px-8 gap-4">
        <Heading className="w-full text-center" size="2xl">
          Sign Up
        </Heading>

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
          <FormControlLabel className="">
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input className="w-full justify-between rounded-lg" variant="outline" size="lg">
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
            <FormControlErrorText>{passwordErr}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <Button
          className="w-full rounded-lg self-center"
          size="lg"
          onPress={handleSignup}
        >
          <ButtonText>Create Account</ButtonText>
        </Button>

        <Button
          variant="link"
          onPress={() => router.back()}
          className="gap-1"
        >
          <ButtonIcon as={ArrowLeftIcon} />
          <ButtonText>Already have an account?</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
