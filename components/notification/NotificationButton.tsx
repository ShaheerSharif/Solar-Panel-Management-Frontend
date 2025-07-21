import { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable, {
  SwipeableMethods
} from "react-native-gesture-handler/ReanimatedSwipeable";

import { Box } from "../ui/box";
import { Center } from "../ui/center";
import { Text } from "../ui/text";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { Pressable } from "../ui/pressable";

import { NotificationType, getNotificationBtnTime } from "@/utils/notification-helpers";

type NotificationButtonProps = {
  notification: NotificationType
  onPress: (id: NotificationType["id"]) => void;
  onDelete: (id: NotificationType["id"]) => void;
};

const TitleToColor: Record<NotificationType["title"], { class: string, hex: string }> = {
  "Cleaning": { class: "bg-red-600", hex: "#DC143C" },
  "Weekly Report": { class: "bg-blue-700", hex: "#3B5998" },
  "Monthly Report": { class: "bg-lime-600", hex: "#8A9A5B" },
  "Yearly Report": { class: "bg-purple-700", hex: "#8E4585" }
};

export function NotificationButton({
  notification,
  onPress,
  onDelete,
}: NotificationButtonProps) {
  const swipeableRef = useRef<SwipeableMethods>(null);
  const iconLetter = notification.title.charAt(0).toUpperCase();
  const relativeTime = getNotificationBtnTime(notification.timestamp);
  const color = TitleToColor[notification.title];

  const handleNotificationDelete = () => {
    swipeableRef.current?.close();
    onDelete(notification.id);
  };

  const handleNotificationOpen = () => {
    onPress(notification.id);
  }

  const renderSwipe = () => (
    <Box className={`flex-1 w-full ${color.class} opacity-20`} />
  );

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderLeftActions={renderSwipe}
        renderRightActions={renderSwipe}
        onSwipeableOpen={handleNotificationDelete}
        ref={swipeableRef}
        overshootLeft={false}
        overshootRight={false}
        friction={2}
        leftThreshold={80}
        rightThreshold={80}
      >
        <Pressable className="w-full bg-white" onPress={handleNotificationOpen}>
          <HStack className="justify-start items-start px-4 py-2" space="sm">
            <Box className="w-1/5">
              <Center
                className="w-16 h-16 rounded-full"
                style={{ backgroundColor: color.hex }}
              >
                <Text
                  size="4xl"
                  className="color-white font-extrabold text-center"
                >
                  {iconLetter}
                </Text>
              </Center>
            </Box>
            <VStack className="w-4/5 justify-start">
              <HStack className="justify-between">
                <Text size="xl" className="pr-4 font-bold truncate">
                  {notification.title}
                </Text>
                <Text
                  size="xs"
                  numberOfLines={3}
                  className="text-end color-slate-400 align-middle mr-4"
                >
                  {relativeTime}
                </Text>
              </HStack>
              <Text className="pr-10 truncate">{notification.message}</Text>
            </VStack>
          </HStack>
        </Pressable>
      </Swipeable>
    </GestureHandlerRootView>
  );
}
