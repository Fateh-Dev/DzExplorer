import React from "react";
import { Search } from "lucide-react";

interface Props {
  searchQueryInput: string;
  setSearchQueryInput: React.Dispatch<React.SetStateAction<string>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<Props> = ({
  searchQueryInput,
  setSearchQueryInput,
  setSearchQuery,
  startDate,
  setStartDate,
  endDate,
  setEndDate
}) => (
  <>
    <div className="relative w-full sm:w-4/6">
      <input
        type="text"
        placeholder="Search by title or description..."
        className="w-full p-3 pr-10 border border-gray-300 rounded-md shadow-md bg-white"
        value={searchQueryInput}
        onChange={e => setSearchQueryInput(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            setSearchQuery(searchQueryInput);
          }
        }}
      />
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        onClick={() => setSearchQuery(searchQueryInput)}
        aria-label="Search trips"
      >
        <Search size={18} />
      </button>
    </div>
    <input
      type="date"
      className="w-full sm:w-1/6 p-3 border border-gray-300 rounded-md shadow-md bg-white"
      value={startDate}
      onChange={e => setStartDate(e.target.value)}
      aria-label="Start date"
    />
    <input
      type="date"
      className="w-full sm:w-1/6 p-3 border border-gray-300 rounded-md shadow-md bg-white"
      value={endDate}
      onChange={e => setEndDate(e.target.value)}
      aria-label="End date"
    />
  </>
);

export default SearchBar;
