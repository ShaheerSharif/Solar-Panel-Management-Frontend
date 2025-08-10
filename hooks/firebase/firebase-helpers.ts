import { db } from "@/firebaseConfig";
import { AuthContextType } from "@/providers/AuthProvider";
import { equalTo, get, orderByChild, query, ref } from "firebase/database";

async function getDeviceID(user: AuthContextType["user"]) {
  try {
    if (!user) throw new Error("User not authenticated");

    const userID = user.uid;
    const devicesRef = ref(db, "devices")
    const q = query(devicesRef, orderByChild("owner_uid"), equalTo(userID));
    const snapshot = await get(q);

    if (!snapshot.exists()) {
      throw new Error("No device found for this user");
    }

    const devices = snapshot.val() as Record<string, { owner_uid: string }>;
    const [deviceID] = Object.keys(devices);

    return deviceID;
  } catch (err) {
    console.error("Error in `getDeviceID`: ", err);
    throw new Error("device id not found");
  }
}

function getCleaningPath(deviceID: string | null) {
  if (!deviceID) throw new Error("Device ID is null (`getCleaningPath`)")
  return `devices/${deviceID}/esp_cleaner_001/cleaning`
}

function getReadingsPath(deviceID: string | null) {
  if (!deviceID) throw new Error("Device ID is null (`getReadingsPath`)")
  return `devices/${deviceID}/esp_inverter/readings`
}

export { getCleaningPath, getDeviceID, getReadingsPath };
