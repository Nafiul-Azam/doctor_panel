import { Search } from "lucide-react";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search patients, ID, complaint...",
}) => {
  return (
    <label className="search-input-wrap">
      <Search size={16} />
      <input value={value} onChange={onChange} placeholder={placeholder} />
    </label>
  );
};

export default SearchInput;
