import { Box } from "../ui/box";
import { Text } from "../ui/text";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { Button, ButtonText } from "../ui/button";
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "../ui/slider";
import { VStack } from "../ui/vstack";

type CleanType = "sensor" | "timer" | "manual";

type CleaningContainerProps = {
  type: CleanType,
  sliderValue: number,
  setSliderValue: (value: number) => void;
}

function CleaningContainer({ type, sliderValue: sliderValue, setSliderValue }: CleaningContainerProps) {
  if (type === "manual") {
    return (
      <HStack className="justify-between items-center">
        <Heading>Manual</Heading>
        <Button action="negative" className="rounded-lg" onPress={() => { }}>
          <ButtonText>Clean Now</ButtonText>
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

export { CleanType, CleaningContainer }
