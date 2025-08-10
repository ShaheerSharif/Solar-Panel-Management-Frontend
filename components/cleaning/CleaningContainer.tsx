import { useState } from "react";
import { SimpleAlert } from "../custom/SimpleAlert";
import { Button, ButtonSpinner, ButtonText } from "../ui/button";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";
import { CleanTimerModal } from "./CleanTimerModal";
import { CleanTimerFreq, CleanType } from "./types";

type CleaningContainerProps = {
  type: CleanType
  isCleaning: boolean
  triggerCleaning: () => Promise<void>
  setPrevCleanSchedule: (date: Date) => void
  setNextCleanSchedule: (date: Date) => void
  prevCleanSchedule?: Date
  nextCleanSchedule?: Date
  defaultFreq?: CleanTimerFreq
}

export function CleaningContainer({
  type,
  isCleaning,
  triggerCleaning,
  setPrevCleanSchedule,
  setNextCleanSchedule,
  prevCleanSchedule,
  nextCleanSchedule,
  defaultFreq = "monthly"
}: CleaningContainerProps) {

  const [isManualAlertOpen, setIsManualAlertOpen] = useState(false)

  const openManualAlert = () => setIsManualAlertOpen(true)
  const closeManualAlert = () => setIsManualAlertOpen(false)

  const [cleanFreq, setCleanFreq] = useState(defaultFreq)
  const [prevCleanDate, setPrevCleanDate] = useState(prevCleanSchedule ?? new Date())
  const [nextCleanDate, setNextCleanDate] = useState<Date>(new Date)
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false)

  const openTimerModal = () => setIsTimerModalOpen(true)
  const closeTimerModal = () => setIsTimerModalOpen(false)

  if (type === "manual") {
    return (
      <>
        <HStack className="justify-between items-center">
          <Heading>Manual</Heading>
          <Button
            className="rounded-lg"
            onPress={openManualAlert}
            disabled={isCleaning}
          >
            <ButtonText
              className={isCleaning ? "text-typography-400" : ""}
            >
              {isCleaning ? "Cleaning" : "Clean Now"}
            </ButtonText>
            {isCleaning && <ButtonSpinner />}
          </Button>
        </HStack >

        <SimpleAlert
          heading="Clean Solar Panel"
          body="Are you sure?"
          isOpen={isManualAlertOpen}
          onClose={closeManualAlert}
          onConfirm={triggerCleaning}
        />
      </>
    )
  }

  else if (type === "timer") {
    return (
      <>
        <HStack className="justify-between items-center">
          <VStack className="items-start gap-1">
            <Heading>Timer</Heading>
            <Text className="text-typography-400" size="sm">Next Date: { }</Text>
          </VStack>

          <Button className="rounded-lg" onPress={openTimerModal}>
            <ButtonText>Change Timer</ButtonText>
          </Button>
        </HStack>

        <CleanTimerModal
          isOpen={isTimerModalOpen}
          previousFreq={cleanFreq}
          onClose={closeTimerModal}
          onConfirm={setCleanFreq}
        />
      </>
    )
  }
}
