import { capitalize } from "@/utils/str-functions"
import { ChevronDown } from "lucide-react-native"
import { useState } from "react"
import { SimpleAlert } from "../custom/SimpleAlert"
import { Button, ButtonText } from "../ui/button"
import { Heading } from "../ui/heading"
import { HStack } from "../ui/hstack"
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "../ui/modal"
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger
} from "../ui/select"
import { CleanTimerFreq } from "./types"

type CleanTimerProps = {
  isOpen: boolean
  previousFreq: CleanTimerFreq
  onClose: () => void
  onConfirm: (timerFreq: CleanTimerFreq) => void
}

const options: CleanTimerFreq[] = ["daily", "weekly", "monthly"]

export function CleanTimerModal({ isOpen, previousFreq, onClose, onConfirm }: CleanTimerProps) {
  const [currentFreq, setCurrentFreq] = useState(previousFreq)
  const [isOptionSelected, setIsOptionSelected] = useState(false)
  const [isFreqMenuOpen, setIsFreqMenuOpen] = useState(false)
  const [isTimerAlertOpen, setIsTimerAlertOpen] = useState(false)

  const openFreqMenu = () => setIsFreqMenuOpen(true)
  const closeFreqMenu = () => setIsFreqMenuOpen(false)

  const openTimerAlert = () => setIsTimerAlertOpen(true)
  const closeTimerAlert = () => setIsTimerAlertOpen(false)

  const onFreqSelect = (value: CleanTimerFreq) => {
    setCurrentFreq(value)
    setIsFreqMenuOpen(false)
    setIsOptionSelected(true)
  }

  const confirmSelection = () => {
    onConfirm(currentFreq)
    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalBackdrop />

        <ModalContent>
          <ModalHeader>
            <Heading>
              Set Timer
            </Heading>
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody>

            <Select onClose={closeFreqMenu}>
              <SelectTrigger variant="outline" onPress={openFreqMenu}>
                <SelectInput placeholder={capitalize(currentFreq)} className="flex-1 py-2" />
                <SelectIcon as={ChevronDown} className="mr-3" />
                <SelectPortal snapPoints={[33]} isOpen={isFreqMenuOpen}>
                  <SelectBackdrop />
                  <SelectContent>
                    <HStack className="w-full mt-2 mb-4 justify-center items-center">
                      <Heading>Set Timer Frequency</Heading>
                    </HStack>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    {options.map((value, index) => {
                      const label = capitalize(value)
                      return (
                        <SelectItem key={index} label={label} value={value} onPress={() => onFreqSelect(value)} />
                      )
                    })}
                  </SelectContent>
                </SelectPortal>
              </SelectTrigger>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button onPress={closeFreqMenu} action="secondary" className="rounded-lg">
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              onPress={openTimerAlert}
              className={!isOptionSelected ? "rounded-lg text-typography-400" : "rounded-lg"}
              disabled={!isOptionSelected}
            >
              <ButtonText>Confirm</ButtonText>
            </Button>
          </ModalFooter>

        </ModalContent>
      </Modal>

      <SimpleAlert
        heading="Set Solar Panel Timer"
        body="Are you sure?"
        isOpen={isTimerAlertOpen}
        onClose={closeTimerAlert}
        onConfirm={confirmSelection}
      />
    </>
  )
}
