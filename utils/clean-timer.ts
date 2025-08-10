import { CleanTimerFreq } from "@/components/cleaning"

/**
 * Returns the next scheduled time as a UNIX timestamp in seconds
 * @param previousDate Date
 * @param frequency "daily" | "weekly" | "monthly"
 * @returns number — Epoch time in seconds
 */
export function getNextScheduledTimestamp(previousDate: Date, frequency: CleanTimerFreq) {
  let targetDate: Date

  switch (frequency) {
    case "daily": {
      targetDate = new Date(previousDate)
      targetDate.setDate(targetDate.getDate() + 1)
      break
    }

    case "weekly": {
      const dayOfWeek = previousDate.getDay() // Sunday = 0
      const daysUntilTuesday = (2 - dayOfWeek + 7) % 7 || 7 // Always > 0
      targetDate = new Date(previousDate)
      targetDate.setDate(targetDate.getDate() + daysUntilTuesday)
      targetDate.setHours(0, 0, 0, 0)
      break
    }

    case "monthly": {
      targetDate = new Date(previousDate.getFullYear(), previousDate.getMonth() + 1, 1)
      targetDate.setHours(0, 0, 0, 0)
      break
    }

    default:
      throw new Error(`Invalid frequency: ${frequency}`)
  }

  return Math.floor(targetDate.getTime() / 1000)
}
