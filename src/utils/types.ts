import { EVALUATION_STATUSES } from "./constants";

export type TableData = {
  id: number;
  name: string;
  startDate: number;
  timeZone: string;
  evaluationStatus: EvaluationStatus;
  taskStartDate: string;
};
export type SortOrder = "asc" | "desc";

export type EvaluationStatus = (typeof EVALUATION_STATUSES)[number];
