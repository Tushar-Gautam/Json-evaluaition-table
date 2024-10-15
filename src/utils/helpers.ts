import { format } from "date-fns";
import { TableData } from "./types";
import { startCase } from "lodash-es";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidTableData(data: any): data is TableData {
  return (
    typeof data.id === "number" &&
    typeof data.name === "string" &&
    typeof data.evaluationStatus === "string" &&
    typeof data.startDate === "number" &&
    typeof data.timeZone === "string"
  );
}

export const formatTaskStartDate = (
  startDate: number,
  timeZone: string
): string => {
  return `${format(new Date(startDate), "MMM dd yyyy")} @ ${format(
    new Date(startDate),
    "HH:mm"
  )} (${timeZone})`;
};

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

export const getHeaderLabel = (key: string) => startCase(key);
