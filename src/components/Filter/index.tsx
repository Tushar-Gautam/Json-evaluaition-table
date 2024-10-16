import "./style.css";
import { EVALUATION_STATUSES, type EvaluationStatus } from "@utils";
import { FC, useEffect, useRef, useState } from "react";
import { FileCheck, FilterIcon } from "lucide-react";
import { InputField } from "../InputField";

interface FilterProps {
  selectedStatuses: string[];
  toggleStatus(status: string): void;
}

export const Filter: FC<FilterProps> = ({ selectedStatuses, toggleStatus }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef?.current &&
        !dropdownRef?.current?.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleAll = () => {
    if (selectedStatuses.length === EVALUATION_STATUSES.length) {
      EVALUATION_STATUSES.forEach((status) => toggleStatus(status));
    } else {
      EVALUATION_STATUSES.forEach((status) => {
        if (!selectedStatuses.includes(status)) {
          toggleStatus(status);
        }
      });
    }
  };

  const handleToggleStatus = (status: EvaluationStatus) => {
    toggleStatus(status);
  };
  return (
    <div className="filter-container" ref={dropdownRef}>
      <div onClick={() => setIsFilterOpen(!isFilterOpen)}>
        <FilterIcon color="#4E6187" />
      </div>
      {isFilterOpen && (
        <div className="filters">
          <span className="filter-heading">Evaluation Status</span>
          <div
            className="current-filter"
            onClick={() => setIsDropdownOpen(true)}
          >
            <FileCheck height={15} width={15} />
            <span>Current Evaluation Status</span>
          </div>
        </div>
      )}
      {isDropdownOpen && (
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
      )}
    </div>
  );
};
