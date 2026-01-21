import { fromZonedTime } from "date-fns-tz";

export function convertToUTC(
  date: string | Date,
  timeZone = "America/Sao_Paulo",
) {
  return fromZonedTime(date, timeZone);
}
