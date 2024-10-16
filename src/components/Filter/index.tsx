import "./style.css";
import { EVALUATION_STATUSES, type EvaluationStatus } from "@utils";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { FileCheck, FilterIcon } from "lucide-react";
import { Dropdown } from "../Dropdown";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";

interface FilterProps {
  selectedStatuses: string[];
  toggleStatus(status: string): void;
}
const baseOffset = {
  crossAxis: 40,
  alignmentAxis: 10,
};

export const Filter: FC<FilterProps> = ({ selectedStatuses, toggleStatus }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const currentFilterRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const offsetValue = useMemo(() => {
    if (windowWidth > 1400) return { ...baseOffset, mainAxis: 250 };
    if (windowWidth < 768)
      return {
        ...baseOffset,
        crossAxis: 10,
        mainAxis: -220,
      };
    return { ...baseOffset, mainAxis: 250 };
  }, [windowWidth]);

  const { x, y, strategy, refs, update } = useFloating({
    placement: "right-start",
    middleware: [
      offset(offsetValue),
      flip({
        fallbackPlacements: ["bottom-start", "top-start"],
      }),
      shift({ padding: 5 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef?.current &&
        !filterRef?.current?.contains(event.target as Node)
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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (currentFilterRef.current) {
      refs.setReference(currentFilterRef.current);
    }
  }, [refs, isFilterOpen]);

  useEffect(() => {
    if (isDropdownOpen) {
      update();
    }
  }, [isDropdownOpen, update]);

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
    <div className="filter-container" ref={filterRef}>
      <div onClick={() => setIsFilterOpen(!isFilterOpen)}>
        <FilterIcon color="#4E6187" />
      </div>
      {isFilterOpen && (
        <div className="filters">
          <span className="filter-heading">Evaluation Status</span>
          <div
            className="current-filter"
            onClick={() => setIsDropdownOpen(true)}
            ref={currentFilterRef}
          >
            <FileCheck height={15} width={15} />
            <span>Current Evaluation Status</span>
          </div>
        </div>
      )}
      {isDropdownOpen && (
        <div
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            width: "max-content",
          }}
        >
          <Dropdown
            handleToggleStatus={handleToggleStatus}
            handleToggleAll={handleToggleAll}
            selectedStatuses={selectedStatuses}
          />
        </div>
      )}
    </div>
  );
};
