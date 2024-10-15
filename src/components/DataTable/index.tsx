import React from "react";
import { format } from "date-fns";
import { startCase } from "lodash-es";
import "./styles.css";
import { SortOrder, TableData } from "@utils";

interface DataTableProps {
  sortedData: TableData[];
  sortColumn: keyof TableData;
  sortOrder: SortOrder;
  handleSort: (column: keyof TableData) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  sortedData,
  sortColumn,
  sortOrder,
  handleSort,
}) => {
  const getHeaderLabel = (key: string) => startCase(key);

  const renderSortIcon = (key: string) => {
    if (sortColumn !== key) return null;
    return sortOrder === "asc" ? "↑" : "↓";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  const formatTaskStartDate = (startDate: number, timeZone: string): string => {
    return `${format(new Date(startDate), "MMM dd yyyy")} @ ${format(
      new Date(startDate),
      "HH:mm"
    )} (${timeZone})`;
  };

  // Define headers, including the new "Task Start Date"
  const headers: (keyof TableData)[] = [
    "name",
    "taskStartDate",
    "evaluationStatus",
  ];

  return (
    <div className="table-container">
      <table border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          <tr>
            {headers.map((key) => (
              <th key={key} onClick={() => handleSort(key)}>
                {getHeaderLabel(key)} {renderSortIcon(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={row.id}>
              {headers.map((key) => (
                <td key={key}>
                  {key === "name" ? (
                    <>
                      <span
                        className={`name-initials ${
                          index % 2 === 0 ? "even" : "odd"
                        }`}
                      >
                        {getInitials(row[key])}
                      </span>
                      <span>{row[key]}</span>
                    </>
                  ) : key === "taskStartDate" ? (
                    formatTaskStartDate(row.startDate, row.timeZone)
                  ) : key === "evaluationStatus" ? (
                    <span
                      className={`status-badge ${row[key]
                        .toString()
                        .toLowerCase()
                        .replace(/_/g, "-")}`}
                    >
                      {row[key].toString().replace(/_/g, " ")}
                    </span>
                  ) : (
                    row[key] || "N/A"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
