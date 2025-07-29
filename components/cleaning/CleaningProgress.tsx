import { useState } from "react";

import { VStack } from "../ui/vstack"
import { Progress, ProgressFilledTrack } from "../ui/progress"
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import { AlertCircleIcon, AlertTriangleIcon, Box, CheckCircle2Icon, InfoIcon } from "lucide-react-native"
import { Toast, ToastDescription, ToastTitle, useToast } from "../ui/toast";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader
} from "../ui/alert-dialog"

import { CleanType } from "./CleaningContainer";
import { capitalize } from "@/utils/str-functions";

const ColorMap: Record<string, { progressFill: string, progressBg: string, icon: string }> = {
  red: {
    progressFill: "bg-red-400",
    progressBg: "bg-red-100",
    icon: "#f87171",
  },
  orange: {
    progressFill: "bg-orange-400",
    progressBg: "bg-orange-100",
    icon: "#fb923c",
  },
  yellow: {
    progressFill: "bg-yellow-400",
    progressBg: "bg-yellow-100",
    icon: "#facc15",
  },
  green: {
    progressFill: "bg-green-400",
    progressBg: "bg-green-100",
    icon: "#4ade80",
  },
}

function CleaningProgress({ value, mode }: { value: number, mode: CleanType }) {
  const ICON_SIZE = 45;

  const toast = useToast();
  const [toastID, setToastID] = useState(0);

  let color;

  if (value <= 25) {
    color = ColorMap["green"];
  } else if (value <= 50) {
    color = ColorMap["yellow"];
  } else if (value <= 75) {
    color = ColorMap["orange"];
  } else {
    color = ColorMap["red"];
  }

  const getInfoMessage = () => {
    switch (mode) {
      case "manual":
        return "Click the 'Clean Now' button to clean the solar panel.";
      case "sensor":
        return "Set sensor threshold at which cleaning would start.";
      case "timer":
        return "Set time when solar panel automatically cleans";
    }
  }

  const handleToast = () => {
    if (!toast.isActive(toastID.toString())) {
      showNewToast();
    }
  }

  const showNewToast = () => {
    const newId = Math.random();
    setToastID(newId);

    toast.show({
      id: newId.toString(),
      placement: "top",
      duration: 5000,
      render: ({ id }) => {
        const uniqueToastID = `toast-${id}`;

        return (
          <Toast nativeID={uniqueToastID} action="info" variant="solid" className="mt-20 w-8/12">
            <ToastTitle>{`${capitalize(mode)} Mode`}</ToastTitle>
            <ToastDescription>{getInfoMessage()}</ToastDescription>
          </Toast>
        )
      }
    })
  }

  const getIcon = () => {
    if (value > 80)
      return <AlertTriangleIcon color={color.icon} size={ICON_SIZE} />

    else if (value > 40)
      return <AlertCircleIcon color={color.icon} size={ICON_SIZE} />

    return <CheckCircle2Icon color={color.icon} size={ICON_SIZE} />
  }

  return (
    <>
      <HStack className="w-full gap-2">
        {getIcon()}
        <VStack className="gap-0.5 flex-1">
          <HStack className="gap-1 items-end">
            <Text className="font-bold" size="xl">{`${value.toFixed(0)}% `}</Text>
            <Text className="text-typography-400" size="sm">Dust Accumulation</Text>
          </HStack>
          <Progress value={value} className={color.progressBg}>
            <ProgressFilledTrack className={color.progressFill} />
          </Progress>
          <HStack className="gap-1 items-center">
            <Text className="text-typography-400">Cleaning Mode: </Text>
            <Text className="font-semibold underline">{capitalize(mode)}</Text>
            <Button variant="link" onPress={handleToast}>
              <InfoIcon size={15} />
            </Button>
          </HStack>
        </VStack>
      </HStack>


    </>
  )
}

export { CleaningProgress }
