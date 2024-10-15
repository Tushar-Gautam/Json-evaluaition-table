import { useState, useRef, useEffect, FC } from "react";
import { Search, FileCheck, FilterIcon } from "lucide-react";
import "./style.css";

const EVALUATION_STATUSES = [
  "YET_TO_START",
  "IN_PROGRESS",
  "COMPLETED",
  "EXPIRED",
] as const;

type EvaluationStatus = (typeof EVALUATION_STATUSES)[number];

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm(searchTerm: string): void;
  selectedStatuses: string[];
  toggleStatus(status: string): void;
}

export const SearchBar: FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedStatuses,
  toggleStatus,
}) => {
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
    <div className="search-filter-container">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search by Name and Status"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <Search className="search-icon" size={20} />
      </div>
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
              <input
                type="checkbox"
                checked={selectedStatuses.length === EVALUATION_STATUSES.length}
                onChange={handleToggleAll}
              />
              All
            </label>
            {EVALUATION_STATUSES.map((status) => (
              <label key={status} className="filter-option">
                <input
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
    </div>
  );
};
