import { useRef, useCallback, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable, { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";

import { Box } from "../ui/box";
import { Center } from "../ui/center";
import { Text } from "../ui/text";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { Pressable } from "../ui/pressable";

import { NotificationType, getNotificationBtnTime } from "@/utils/notification-helpers";

type NotificationButtonProps = {
  notification: NotificationType;
  onPress: (id: NotificationType["id"]) => void;
  onDelete: (id: NotificationType["id"]) => void;
};

const TitleToColor: Record<NotificationType["title"], { class: string; hex: string }> = {
  "Cleaning": { class: "bg-red-600", hex: "#DC143C" },
  "Weekly Report": { class: "bg-blue-700", hex: "#3B5998" },
  "Monthly Report": { class: "bg-lime-600", hex: "#8A9A5B" },
  "Yearly Report": { class: "bg-purple-700", hex: "#8E4585" }
};

export function NotificationButton({
  notification,
  onPress,
  onDelete
}: NotificationButtonProps) {
  const swipeableRef = useRef<SwipeableMethods>(null);
  const measuredHeight = useRef(0); // capture real height
  const [isMeasured, setIsMeasured] = useState(false); // ensure first measure is done

  const height = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }));

  const handleNotificationDelete = () => {
    swipeableRef.current?.close();

    height.value = withTiming(0, { duration: 300 });
    opacity.value = withTiming(0, { duration: 300 });
    scale.value = withTiming(0.95, { duration: 300 }, (isFinished) => {
      if (isFinished) {
        runOnJS(onDelete)(notification.id);
      }
    });
  };

  const handleNotificationOpen = () => {
    onPress(notification.id);
  };

  const onMeasured = useCallback((e: LayoutChangeEvent) => {
    if (isMeasured) return;

    const h = e.nativeEvent.layout.height;
    measuredHeight.current = h;
    height.value = h;
    setIsMeasured(true); // render Animated.View now with proper height
  }, [isMeasured]);

  const content = (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={() => <Box className={`flex-1 w-full ${TitleToColor[notification.title].class} opacity-20`} />}
      renderRightActions={() => <Box className={`flex-1 w-full ${TitleToColor[notification.title].class} opacity-20`} />}
      onSwipeableOpen={handleNotificationDelete}
      overshootLeft={false}
      overshootRight={false}
      friction={1.5}
      leftThreshold={60}
      rightThreshold={60}
    >
      <Pressable className="w-full bg-white" onPress={handleNotificationOpen}>
        <HStack className="justify-start items-start px-4 py-2" space="sm">
          <Box className="w-1/5">
            <Center
              className="w-16 h-16 rounded-full"
              style={{ backgroundColor: TitleToColor[notification.title].hex }}
            >
              <Text size="4xl" className="color-white font-extrabold text-center">
                {notification.title.charAt(0)}
              </Text>
            </Center>
          </Box>
          <VStack className="w-4/5 justify-start">
            <HStack className="justify-between">
              <Text size="xl" className="pr-4 font-bold truncate">
                {notification.title}
              </Text>
              <Text size="xs" numberOfLines={3} className="text-end color-slate-400 align-middle mr-4">
                {getNotificationBtnTime(notification.timestamp)}
              </Text>
            </HStack>
            <Text className="pr-10 truncate">{notification.message}</Text>
          </VStack>
        </HStack>
      </Pressable>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView>
      {isMeasured ? (
        // after 1st render
        <Animated.View style={animatedStyle}>
          {content}
        </Animated.View>
      ) : (
        // on 1st render
        <Box onLayout={onMeasured}>
          {content}
        </Box>
      )}
    </GestureHandlerRootView>
  );
}
