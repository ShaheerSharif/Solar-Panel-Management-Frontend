
import { db } from "@/firebaseConfig";
import { get, ref, set } from "firebase/database";

import { AuthContextType } from "./authContext";

function getPath(deviceID: string | null) {
  if (deviceID)
    return `devices/${deviceID}/esp_cleaner/cleaning`
}

async function getDeviceID(auth: AuthContextType) {
  try {
    if (!auth?.user) throw new Error("User not authenticated");

    const snapshot = await get(ref(db, "devices"));

    if (!snapshot.exists()) {
      console.warn("No devices found");
      return null;
    }

    const devices = snapshot.val() as Record<string, { owner_uid: string }>;

    for (const [deviceID, deviceData] of Object.entries(devices)) {
      if (deviceData.owner_uid === auth.user.uid) {
        return deviceID
      }
    }

    throw new Error("device id not found");
  } catch (err) {
    console.error("Error fetching device id: ", err);
    return null;
  }
}

export async function getCleaningRef(auth: AuthContextType) {
  const deviceID = await getDeviceID(auth)
  const path = getPath(deviceID)
  return ref(db, path)
}

export async function triggerCleaning(auth: AuthContextType) {
  try {
    if (!auth) throw new Error("User not authenticated")

    const deviceID = await getDeviceID(auth)

    await set(ref(db, getPath(deviceID)), true)

    return true
  } catch (err) {
    console.error("Error fetching user id: ", err)
    return false
  }
}

export async function listenCleaningValue(auth: AuthContextType) {
  try {
    if (!auth) throw new Error("User not authenticated")

    const deviceID = await getDeviceID(auth)
    const path = getPath(deviceID)
    const cleaningRef = ref(db, path)
    const snapshot = await get(cleaningRef)

    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      throw new Error(`${path} does not exist`)
    }
  } catch (err) {
    console.error("Error fetching user id: ", err)
  }
}
