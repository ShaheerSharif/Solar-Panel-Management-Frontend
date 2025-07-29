import { useEffect, useState } from "react";

import { Box } from "../ui/box";
import { Button, ButtonSpinner, ButtonText } from "../ui/button";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "../ui/slider";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

import { useAuth } from "@/utils/authContext";
import { getCleaningRef, triggerCleaning } from "@/utils/espControl";
import { off, onValue } from "firebase/database";

type CleanType = "sensor" | "timer" | "manual"

type CleaningContainerProps = {
  type: CleanType,
  sliderValue: number,
  setSliderValue: (value: number) => void;
}

function CleaningContainer({ type, sliderValue: sliderValue, setSliderValue }: CleaningContainerProps) {
  const auth = useAuth();

  // Once `isCleaing` is set to `true` using `triggerCleaning`,
  // The value changes in firebase after 5 seconds to `false`,
  // Once it is set to false then set `isCleaning` to `false`
  const [isCleaning, setIsCleaning] = useState(false);

  const handleCleaning = async () => {
    const success = await triggerCleaning(auth);
    setIsCleaning(success);

    if (success) {
      console.log("Cleaning command sent.");
    } else {
      console.log("Failed to send cleaning command.");
    }
  }

  useEffect(() => {
    const listenCleaning = async () => {
      if (!auth) return

      const cleaningRef = await getCleaningRef(auth);

      // is this correct? `unsubscribe` is unused

      const unsubscribe = onValue(cleaningRef, snapshot => {
        const value = snapshot.val()
        if (value === false) {
          setIsCleaning(false)
        }
      })

      return () => off(cleaningRef);
    }

    listenCleaning();
  }, [auth])

  if (type === "manual") {
    return (
      <HStack className="justify-between items-center">
        <Heading>Manual</Heading>
        <Button
          action={isCleaning ? "primary" : "negative"}
          className="rounded-lg"
          onPress={handleCleaning}
          disabled={!isCleaning}
        >
          <ButtonText>{isCleaning ? "Cleaning" : "Clean Now"}</ButtonText>
          {isCleaning && <ButtonSpinner />}
        </Button>
      </HStack>
    )
  }

  else if (type === "sensor") {
    return (
      <VStack className="gap-4 items-center">
        <Slider value={sliderValue} minValue={25} maxValue={75} step={5} onChange={setSliderValue}>
          <SliderTrack className="bg-blue-100">
            <SliderFilledTrack className="bg-blue-400" />
          </SliderTrack>
          <SliderThumb className="bg-blue-500" />
        </Slider>
        <HStack>
          <Text className="text-typography-400">Clean panels at: </Text>
          <Text className="font-bold">{`${sliderValue.toString()}% `}</Text>
          <Text className="text-typography-400">Dust accumlation</Text>
        </HStack>
      </VStack>
    )
  }

  else if (type === "timer") {
    return (
      <Box>
        <Heading>Timer</Heading>
      </Box>
    )
  }
}

export { CleaningContainer, CleanType };
