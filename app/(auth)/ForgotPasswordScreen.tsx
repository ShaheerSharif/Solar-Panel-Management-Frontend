import { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "@/utils/authContext";

import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Center } from "@/components/ui/center";
import { Link, LinkText } from "@/components/ui/link";
import { Heading } from "@/components/ui/heading";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const [verifyStatus, setVerifyStatus] = useState<boolean>();

  const [email, setEmail] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean | undefined>();

  const checkEmailValid = () => {
    setIsEmailInvalid(email === undefined || email === "");
  };

  const handleReset = () => {
    checkEmailValid();

    if (!isEmailInvalid) {

      setVerifyStatus(authContext.passwordReset(email));

      if (verifyStatus) router.replace("/(auth)/LoginScreen");
    }
  };

  const emailErrMsg = (): string => {
    if (!email) return "Email is required";
    if (!verifyStatus) return "Email does not exist";
    return "";
  };

  return (
    <SafeAreaView edges={["top", "bottom"]}>
      <Center className="h-full">
        <VStack className="w-full max-w-[300px] p-4">
          <Heading className="mb-5 self-center" size={"2xl"}>
            Forgot Password
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

          <Button
            className="w-60 mt-10 rounded-full self-center"
            size="lg"
            onPress={handleReset}
          >
            <ButtonText>Send Reset Link</ButtonText>
          </Button>

          <Link
            onPress={() => router.replace("/(auth)/LoginScreen")}
            className="mt-4 self-center"
          >
            <LinkText>Back to login</LinkText>
          </Link>
        </VStack>
      </Center>
    </SafeAreaView>
  );
}
