import { firestore } from "@/firebaseConfig"
import { TimeFormat } from "@/types/custom-types"
import dayjs from "dayjs"
import { collection, getDocs } from "firebase/firestore"
import { useCallback } from "react"

export const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
export const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
export const hourLabels = [...Array(24)].map((_, i) => dayjs().startOf("day").add(i, "hour").format("h a"))
export const dailyLabels = [...Array(31)].map((_, i) => dayjs().date(i + 1).format("D"))

function useInverter() {
  const getReadings = useCallback(
    async (
      format: TimeFormat
    ): Promise<
      { label: string; value: { grid: number; house: number; solar: number; battery: number } }[]
    > => {

      const readings: any[] = []
      const dataRef = collection(firestore, "devices", "solar_001", "readings", format, "data")
      const snap = await getDocs(dataRef) // Wait for the Promise to resolve
      snap.docs.forEach((doc) => readings.push(doc.data()))

      console.log(`readings: ${readings.length}`) // readings is 0 why?

      readings.sort((a, b) => a.time - b.time)

      const labels =
        format === "hour"
          ? hourLabels
          : format === "day"
            ? dailyLabels
            : format === "week"
              ? weekLabels
              : monthLabels

      return readings.map((r, i) => ({
        label: labels[i] ?? dayjs.unix(r.time).format("DD MMM"),
        value: {
          grid: r.grid ?? 0,
          house: r.house ?? 0,
          solar: r.solar ?? 0,
          battery: r.battery ?? 0,
        },
      }))
    }, [])

  return { getReadings }
}

export default useInverter
