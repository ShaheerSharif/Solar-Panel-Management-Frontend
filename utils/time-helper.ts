import dayjs from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"

dayjs.extend(advancedFormat)

export function formatUnixToReadableDate(unixSeconds: number) {
  return dayjs.unix(unixSeconds).format("Do MMM YYYY")
}
