import { VStack } from "../ui/vstack"
import { Progress, ProgressFilledTrack } from "../ui/progress"
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import { AlertCircleIcon, AlertTriangleIcon, CheckCircle2Icon } from "lucide-react-native"

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

function CleaningProgress({ value }: { value: number }) {
  const ICON_SIZE = 45;

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

  const getIcon = () => {
    if (value > 80)
      return <AlertTriangleIcon color={color.icon} size={ICON_SIZE} />

    else if (value > 40)
      return <AlertCircleIcon color={color.icon} size={ICON_SIZE} />

    return <CheckCircle2Icon color={color.icon} size={ICON_SIZE} />
  }

  return (
    <HStack className="w-full gap-2">
      {getIcon()}
      <VStack className="gap-0.5 flex-1">
        <HStack className="gap-1 items-end">
          <Text className="font-bold" size="xl">{`${value.toFixed(0).toString()}% `}</Text>
          <Text className="text-slate-400" size="sm">Dust Accumulation</Text>
        </HStack>
        <Progress value={value} className={color.progressBg}>
          <ProgressFilledTrack className={color.progressFill} />
        </Progress>
      </VStack>
    </HStack>
  )
}

export { CleaningProgress }
