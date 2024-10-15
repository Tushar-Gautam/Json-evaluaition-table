import { getHeaderLabel, SortOrder, TableData } from "@utils";
import { FC } from "react";
import { SortIcon } from "./SortIcon";

interface TableHeaderProps {
  column: keyof TableData;
  sortColumn: keyof TableData;
  sortOrder: SortOrder;
  handleSort: (column: keyof TableData) => void;
}

export const TableHeader: FC<TableHeaderProps> = ({
  column,
  sortColumn,
  sortOrder,
  handleSort,
}) => (
  <th onClick={() => handleSort(column)}>
    {getHeaderLabel(column)}{" "}
    <SortIcon column={column} sortColumn={sortColumn} sortOrder={sortOrder} />
  </th>
);
