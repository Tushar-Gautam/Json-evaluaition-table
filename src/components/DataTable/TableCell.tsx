import { formatTaskStartDate, getInitials, TableData } from "@utils";
import { FC } from "react";

interface TableCellProps {
  row: TableData;
  column: keyof TableData;
}

export const TableCell: FC<TableCellProps> = ({ row, column }) => {
  switch (column) {
    case "name":
      return (
        <td>
          <div className="avatar">{getInitials(row[column])}</div>
          {row[column]}
        </td>
      );
    case "taskStartDate":
      return <td>{formatTaskStartDate(row.startDate, row.timeZone)}</td>;
    case "evaluationStatus":
      return (
        <td>
          <span
            className={`status-badge ${row[column]
              .toString()
              .toLowerCase()
              .replace(/_/g, "-")}`}
          >
            {row[column].toString().replace(/_/g, " ")}
          </span>
        </td>
      );
    default:
      return <td>{row[column] || "N/A"}</td>;
  }
};
