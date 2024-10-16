import { FC } from "react";
import { Search, X } from "lucide-react";
import "./style.css";
import { InputField } from "../InputField";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm(searchTerm: string): void;
}

export const SearchBar: FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  const handleCancelSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="search-input-container">
      <InputField
        type="text"
        placeholder="Search by Name and Status"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {searchTerm.length === 0 ? (
        <Search className="icon" size={20} />
      ) : (
        <X
          className="icon cancel-icon"
          size={20}
          onClick={handleCancelSearch}
        />
      )}
    </div>
  );
};
