import { ScrollView } from "react-native";

import { Center } from "../ui/center"
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "../ui/modal"
import { Heading } from "../ui/heading"
import { Text } from "../ui/text";

import { NotificationType, getNotificationMsgTime } from "@/utils/notification-helpers";

type NotificationModalProps = {
  notification: NotificationType | null;
  showModal: boolean;
  onClose: () => void;
}

export function NotificationModal({
  notification, showModal, onClose
}: NotificationModalProps) {

  if (notification !== null) {
    return (
      <Center>
        <Modal isOpen={showModal} onClose={onClose}>
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader className="flex-col items-start gap-0.5">
              <Heading>{notification.title}</Heading>
              <Text size="sm" className="color-slate-400">{getNotificationMsgTime(notification.timestamp)}</Text>
            </ModalHeader>
            <ScrollView>
              <ModalBody>
                <Text>{notification.message}</Text>
              </ModalBody>
            </ScrollView>
          </ModalContent>
        </Modal>
      </Center>
    )
  }
}
