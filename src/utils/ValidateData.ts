import { TableData } from "./types";

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
