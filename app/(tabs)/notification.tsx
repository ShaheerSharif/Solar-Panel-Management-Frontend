import { useRef, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Divider } from "@/components/ui/divider";
import { Fab, FabIcon } from "@/components/ui/fab";
import { ArrowUpIcon } from "lucide-react-native";

import { NotificationButton, NotificationModal } from "@/components/notification";

import { NotificationType, generateNotificationData } from "@/utils/notification-helpers";

export default function NotificationScreen() {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<NotificationType | null>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>(generateNotificationData(20, 10));
  const flatListRef = useRef<FlatList>(null);

  // Delete on notification swipe
  const onNotificationSwipe = (id: NotificationType["id"]) => {
    setNotifications(notifications.filter(item => item.id !== id));
  };

  // Show modal and set modal data on notification open/press
  const onNotificationOpen = (id: NotificationType["id"]) => {
    const data = notifications.find(item => item.id === id) ?? null;
    setModalData(data);
    setShowModal(true);
  };

  // Close modal if pressed outside modal
  const onNotificationExit = () => {
    setShowModal(false);
    setModalData(null);
  };

  // Scroll to top on fab click
  const scrollToTop = () => {
    flatListRef.current?.scrollToIndex({ index: 0, animated: true });
  };

  const CustomFab = () => {
    return (
      <Fab placement="bottom right" size="lg" onPress={scrollToTop}>
        <FabIcon as={ArrowUpIcon} size="xl" />
      </Fab>
    )
  }

  return (
    <SafeAreaView edges={["left", "right"]} style={{ flex: 1 }}>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ref={flatListRef}
        renderItem={({ item }) => (
          <NotificationButton
            notification={item}
            onPress={onNotificationOpen}
            onDelete={onNotificationSwipe}
          />
        )}
        scrollEventThrottle={16}
        ItemSeparatorComponent={() => (
          <Divider
            orientation="horizontal"
            className="border-hairline border-slate-400"
          />
        )}
      />

      <NotificationModal notification={modalData} onClose={onNotificationExit} showModal={showModal} />

      <CustomFab />

    </SafeAreaView>
  );
}
