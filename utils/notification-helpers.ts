import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type NotificationType = {
  id: string;
  title: "Cleaning" | "Weekly Report" | "Monthly Report" | "Yearly Report";
  message: string;
  timestamp: string;
};

const notificationTemplates: { title: NotificationType["title"], message: NotificationType["message"] }[] = [
  { title: "Cleaning", message: "Clean panel" },
  { title: "Weekly Report", message: "Weekly report" },
  { title: "Monthly Report", message: "Monthly report" },
  { title: "Yearly Report", message: "Yearly report" },
];

function generateRandomTimeStamps(count: number, maxDaysAgo: number) {
  const now = dayjs(); // get current timestamp
  const timestamps = [];

  for (let i = 0; i < count; i++) {
    const randomMinutes = Math.floor(Math.random() * maxDaysAgo * 24 * 60); // total minutes in N days
    const time = now.subtract(randomMinutes, "minutes");
    timestamps.push(time.toISOString());
  }

  return timestamps.sort((a, b) => Date.parse(b) - Date.parse(a));
}

function generateNotificationData(
  count: number,
  maxDaysAgo: number
): NotificationType[] {
  const timestamps = generateRandomTimeStamps(count, maxDaysAgo);

  const notificationsArray: NotificationType[] = timestamps.map((timestamp, index) => {
    const randomIndex = Math.floor(Math.random() * notificationTemplates.length);
    const notification = notificationTemplates[randomIndex];
    const { title, message } = notification;
    const id = index.toString();

    return {
      id: id,
      title: title,
      message: message,
      timestamp: timestamp,
    };
  })

  return notificationsArray;
}

function getNotificationBtnTime(timestamp: NotificationType["timestamp"]) {
  return dayjs(timestamp).fromNow();
}

function getNotificationMsgTime(timestamp: NotificationType["timestamp"]) {
  return dayjs(timestamp).fromNow();
}

export { NotificationType, generateNotificationData, getNotificationBtnTime, getNotificationMsgTime };
