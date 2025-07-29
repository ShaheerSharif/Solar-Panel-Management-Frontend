import { useAuth } from "@/utils/authContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
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
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { signup } from "@/utils/userActions";
import { AlertCircleIcon, ArrowLeftIcon, EyeIcon, EyeOffIcon } from "lucide-react-native";
import { ScrollView } from "react-native";

export default function SignupScreen() {
  const PASS_LENGTH = 6;

  const router = useRouter();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [emailErr, setEmailErr] = useState<string>();

  const [name, setName] = useState("");
  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [nameErr, setNameErr] = useState<string>();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [passwordErr, setPasswordErr] = useState<string>();

  const isEmpty = (str: string) => {
    return str === undefined || str === "";
  }

  const checkEmailFormat = () => {
    return !isEmpty(email);
  }

  const checkPasswordFormat = () => {
    return !isEmpty(password) && password.length >= PASS_LENGTH;
  }

  const checkNameFormat = () => {
    return !isEmpty(name)
  }

  const handleSignup = async () => {
    const emailStatus = checkEmailFormat()
    const passwordStatus = checkPasswordFormat()
    const nameStatus = checkNameFormat()

    if (!emailStatus) {
      setEmailErr("Email is required")
      setIsEmailInvalid(true)
    }

    if (!nameStatus) {
      setNameErr("Name is required")
      setIsNameInvalid(true)
    }

    if (!passwordStatus) {
      if (isEmpty(password)) {
        setPasswordErr("Password is required")
      }
      else {
        setPasswordErr(`Must be atleast ${PASS_LENGTH} characters`);
      }
      setIsPasswordInvalid(true)
    }

    if (emailStatus && passwordStatus && nameStatus) {

      const signupStatus = await signup(email, password, name);

      if (!signupStatus.success) {
        setEmailErr("Incorrect email or password")
        setPasswordErr("Incorrect email or password")
        setIsEmailInvalid(true)
        setIsPasswordInvalid(true)
      }
      else {
        router.replace("/(auth)/login")
      }
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]}>
      <ScrollView
        style={{ width: "100%", height: "100%" }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center", // ⬅️ center vertically
        }}
        keyboardShouldPersistTaps="handled"
      >
        <VStack className="px-8 gap-4">
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

          {/* Name */}
          <FormControl size="lg" isRequired={true} isInvalid={isNameInvalid}>
            <FormControlLabel>
              <FormControlLabelText>Name</FormControlLabelText>
            </FormControlLabel>
            <Input className="w-full rounded-lg" variant="outline" size="lg">
              <InputField
                type="text"
                placeholder="Enter your name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{nameErr}</FormControlErrorText>
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
      </ScrollView>
    </SafeAreaView>
  );
}
