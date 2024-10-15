import React from "react";
import "./styles.css";
import { SortOrder, TableData } from "@utils";

import { TableCell } from "./TableCell";
import { TableHeader } from "./TableHeader";

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
  const headers: (keyof TableData)[] = [
    "name",
    "taskStartDate",
    "evaluationStatus",
  ];

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {headers.map((column) => (
              <TableHeader
                key={column}
                column={column}
                sortColumn={sortColumn}
                sortOrder={sortOrder}
                handleSort={handleSort}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={index}>
              {headers.map((column) => (
                <TableCell key={column} row={row} column={column} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
