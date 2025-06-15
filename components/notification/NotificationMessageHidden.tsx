import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NotificationMessageProps } from "./NotificationMessage";
import { RowMap } from "react-native-swipe-list-view";

export type NotificationMessageHiddenProps = {
  id: NotificationMessageProps["id"];
  rowMap: RowMap<NotificationMessageProps>;
  onPress: (
    id: NotificationMessageHiddenProps["id"],
    rowMap: NotificationMessageHiddenProps["rowMap"]
  ) => void;
};

export function NotificationMessageHidden({
  id,
  rowMap,
  onPress,
}: NotificationMessageHiddenProps) {
  return (
    <View style={styles.rowBack}>
      <Text>Right</Text>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => onPress(id, rowMap)}
      >
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backTextWhite: {
    color: "#FFF",
  },
  backRightBtn: {
    alignItems: "flex-end",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  backRightBtnLeft: {
    backgroundColor: "#1f65ff",
    right: 75,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
});
