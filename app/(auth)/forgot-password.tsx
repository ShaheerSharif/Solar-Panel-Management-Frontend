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
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon, ArrowLeftIcon } from "lucide-react-native";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Link, LinkText } from "@/components/ui/link";
import { Heading } from "@/components/ui/heading";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean | undefined>();
  const [emailErr, setEmailErr] = useState<string>();

  const [code, setCode] = useState("");
  const [showOTP, setShowOTP] = useState(false);

  const checkEmailFormat = () => {
    return email !== undefined && email !== "";
  };

  const handleReset = () => {
    const emailStatus = checkEmailFormat();

    if (!emailStatus) {
      setEmailErr("Email is required");
      setIsEmailInvalid(true);
      return;
    }

    const emailExists = authContext.passwordReset(email);

    if (!emailExists) {
      setEmailErr("Incorrect email");
      return;
    }

    setShowOTP(true);
  };

  return (
    <SafeAreaView edges={["top", "bottom", "left", "right"]}>
      <VStack className="w-full h-full px-8 justify-center items-start gap-4">
        <Heading className="w-full text-center" size="2xl">
          Forgot Password
        </Heading>
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

        <Button
          className="w-full rounded-lg"
          size="lg"
          onPress={handleReset}
        >
          <ButtonText>Verify</ButtonText>
        </Button>

        <Button
          variant="link"
          onPress={() => router.back()}
          className="gap-1"
        >
          <ButtonIcon as={ArrowLeftIcon} />
          <ButtonText>Back To Login</ButtonText>
        </Button>
      </VStack>

      <Modal
        className="rounded-lg"
        isOpen={showOTP}
        onClose={() => {
          setIsEmailInvalid(false);
          setShowOTP(false);
        }}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader className="flex-col items-start gap-0.5">
            <Heading>Reset password</Heading>
            <Text size="sm">
              A verification code has been sent to you. Enter code below.
            </Text>
          </ModalHeader>
          <ModalBody className="mb-4">
            <Input className="rounded-lg">
              <InputField value={code} onChangeText={(text) => setCode(text)} placeholder="Enter verification code" />
            </Input>
          </ModalBody>
          <ModalFooter className="flex-col items-start">
            <Button className="w-full rounded-lg" onPress={() => { }}>
              <ButtonText>Continue</ButtonText>
            </Button>
            <VStack className="gap-1">
              <Text size="sm">
                Didn't receive the email?
              </Text>
              <Link onPress={(e) => {
                e?.preventDefault();
              }}>
                <LinkText
                  className="text-typography-700 font-semibold"
                >
                  Click to resend
                </LinkText>
              </Link>
            </VStack>
            <HStack space="xs" className="items-center">
              <Button
                variant="link"
                size="sm"
                onPress={() => setShowOTP(false)}
                className="gap-1"
              >
                <ButtonIcon as={ArrowLeftIcon} />
                <ButtonText>Go Back</ButtonText>
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SafeAreaView>
  );
}
