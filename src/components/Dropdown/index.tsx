import { EVALUATION_STATUSES, EvaluationStatus } from "@utils";
import { InputField } from "../InputField";
import { FC } from "react";

interface DropdownProps {
  selectedStatuses: string[];
  handleToggleAll(): void;
  handleToggleStatus(status: EvaluationStatus): void;
}

export const Dropdown: FC<DropdownProps> = ({
  selectedStatuses,
  handleToggleAll,
  handleToggleStatus,
}) => {
  return (
    <div className="filter-dropdown">
      <label className="filter-option">
        <InputField
          type="checkbox"
          checked={selectedStatuses.length === EVALUATION_STATUSES.length}
          onChange={handleToggleAll}
        />
        All
      </label>
      {EVALUATION_STATUSES.map((status) => (
        <label key={status} className="filter-option">
          <InputField
            type="checkbox"
            checked={selectedStatuses.includes(status)}
            onChange={() => handleToggleStatus(status)}
          />
          {status.replace(/_/g, " ")}
        </label>
      ))}
    </div>
  );
};
