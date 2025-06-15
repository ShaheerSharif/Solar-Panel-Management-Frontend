import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ListRenderItemInfo,
} from "react-native";
import { MyIcons } from "@/components/MyIcons";
import UIColors from "@/constants/UIColors";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";
import {
  NotificationMessage,
  NotificationMessageProps,
} from "@/components/notification/NotificationMessage";

import notificationData from "@/models/notification-data";
import { useState } from "react";
import {
  NotificationMessageHidden,
  NotificationMessageHiddenProps,
} from "@/components/notification/NotificationMessageHidden";

export default function NotificationScreen() {
  const [listData, setListData] = useState<NotificationMessageProps[]>(
    notificationData.map((item) => ({
      id: `${item.id}`,
      title: item.title,
      details: item.details,
    }))
  );

  const deleteRow = (
    id: NotificationMessageHiddenProps["id"],
    rowMap: RowMap<NotificationMessageProps>
  ) => {
    if (rowMap[id]) {
      rowMap[id].closeRow();
    }

    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.id === id);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const renderItem = ({
    item,
  }: ListRenderItemInfo<NotificationMessageProps>) => {
    return (
      <NotificationMessage
        id={item.id}
        title={item.title}
        details={item.details}
      />
    );
  };

  const renderHiddenItem = (
    { item }: ListRenderItemInfo<NotificationMessageProps>,
    rowMap: RowMap<NotificationMessageProps>
  ) => {
    return (
      <NotificationMessageHidden
        id={item.id}
        rowMap={rowMap}
        onPress={() => deleteRow(item.id, rowMap)}
      />
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TouchableOpacity onPress={() => setListData([])}>
        <View
          style={{
            width: "100%",
            height: 70,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: UIColors.red,
            borderRadius: 7,
          }}
        >
          <MyIcons name="trash" color={UIColors.white} size={48} />
        </View>
      </TouchableOpacity>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
      />
    </View>
  );
}
