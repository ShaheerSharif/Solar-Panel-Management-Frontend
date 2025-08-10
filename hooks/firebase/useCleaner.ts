import { db } from "@/firebaseConfig";
import { AuthContextType } from "@/providers/AuthProvider";
import { equalTo, get, off, onValue, orderByChild, query, ref, set } from "firebase/database";

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

function useCleaner(authState: AuthContextType) {
  // const [deviceID, setDeviceID] = useState<string | null>(null)

  // useEffect(() => {
  //   let isMounted = true

  //   const fetchDeviceID = async () => {
  //     try {
  //       if (!authState.user) return
  //       const id = await getDeviceID(authState.user)
  //       if (isMounted) setDeviceID(id)
  //     } catch (err) {
  //       console.error("Error in `useCleaner (useEffect)`: ", err)
  //     }
  //   }

  //   fetchDeviceID()

  //   return () => { isMounted = false }
  // }, [authState.user])

  // const cleaningRef = () => {
  //   if (!deviceID) throw new Error("Device ID not loaded")
  //   return ref(db, getCleaningPath(deviceID))
  // }

  const triggerCleaning = async () => {
    try {
      const cleanRef = ref(db, "/devices/solar_001/esp_cleaner_001/cleaning")

      await (set(cleanRef, true))
    } catch (err) {
      console.error("Error in `triggerCleaning`: ", err)
    }
  }

  const listenCleaning = (setIsCleaning: (value: boolean) => void) => {
    try {
      const cleanRef = ref(db, "/devices/solar_001/esp_cleaner_001/cleaning")

      onValue(cleanRef, (snapshot) => {
        if (!snapshot.exists()) {
          // console.warn(`${getCleaningPath(deviceID)} does not exist`)
          setIsCleaning(false)
          return
        }

        const value = snapshot.val()

        if (value === null) {
          setIsCleaning(false)
        } else {
          setIsCleaning(value)
        }
      })
    } catch (err) {
      console.error("Error in `listenCleaningValue`: ", err)
    }
  }

  const stopListeningCleaning = () => {
    try {
      off(ref(db, "/devices/solar_001/esp_cleaner_001/cleaning"))
    } catch (err) {
      console.error("Error in `stopListeningCleaning`: ", err)
    }
  }

  return { triggerCleaning, listenCleaning, stopListeningCleaning }
}

export default useCleaner
