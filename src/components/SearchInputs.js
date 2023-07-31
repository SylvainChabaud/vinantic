import React from "react";
import PropTypes from "prop-types";
import TextSearchInput from "./TextSearchInput";
import SearchSelector from "./SearchSelector";

const SearchInputs = ({ searchText, sortBy, handleSearchChange, handleSortChange }) => (
  <div className="flex flex-row">
    <div className="w-64">
      <TextSearchInput searchText={searchText} handleSearchChange={handleSearchChange} />
    </div>

    <div className="ml-10 w-64">
      <SearchSelector sortBy={sortBy} handleSortChange={handleSortChange} />
    </div>
  </div>
);

SearchInputs.propTypes = {
  searchText: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleSortChange: PropTypes.func.isRequired,
};

export default SearchInputs;
