import { format, isAfter, isBefore, parse, subDays, subYears } from "date-fns";

export const euDateFormatRegex =
  /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

export function dateTo_yyyy_MM_dd_HH_mm_ss(dateString: string) {
  const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
  return format(parsedDate, "yyyy-MM-dd HH:mm:ss");
}

export function dateTo_yyyy_MM_dd(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function subtract_Days(days: number) {
  const date = subDays(new Date(), days);
  return dateTo_yyyy_MM_dd(date);
}

export function euFormatedDateIsBetweenYears(
  euFormatedDate: string,
  minYears: number,
  maxYears: number
) {
  if (!euFormatedDate) return false;
  const parsedDate = parse(euFormatedDate, "dd/MM/yyyy", new Date());
  return (
    isBefore(parsedDate, subYears(new Date(), minYears)) &&
    isAfter(parsedDate, subYears(new Date(), maxYears))
  );
}

export const formatStringToEuDateString = (val: string) => {
  const digits = val.replace(/\D/g, "");
  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4, 8);
  const formattedDate =
    day + (month ? `/${month}` : "") + (month && year ? `/${year}` : "");
  return formattedDate;
};
