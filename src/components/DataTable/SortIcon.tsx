import { SortOrder } from "@utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FC } from "react";

interface SortIconProps {
  column: string;
  sortColumn: string;
  sortOrder: SortOrder;
}

export const SortIcon: FC<SortIconProps> = ({
  column,
  sortColumn,
  sortOrder,
}) => {
  if (sortColumn !== column) return null;
  return sortOrder === "asc" ? (
    <ChevronUp size={16} />
  ) : (
    <ChevronDown size={16} />
  );
};
