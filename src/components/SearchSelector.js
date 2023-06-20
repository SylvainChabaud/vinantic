import React from "react";
import PropTypes from "prop-types";
import { SEARCH_SELECTOR_OPTIONS } from "../constants";

const SearchSelector = ({ sortBy, handleSortChange }) => (
  <select
    value={sortBy}
    onChange={handleSortChange}
    className="h-full bg-gray-50 border border-gray-300 text-stone-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option defaultValue>{SEARCH_SELECTOR_OPTIONS.NO_SORT}</option>
    <option value="year">{SEARCH_SELECTOR_OPTIONS.YEAR}</option>
    <option value="price">{SEARCH_SELECTOR_OPTIONS.PRICE}</option>
    <option value="name">{SEARCH_SELECTOR_OPTIONS.NAME}</option>
  </select>
);

export default SearchSelector;

SearchSelector.propTypes = {
  sortBy: PropTypes.string.isRequired,
  handleSortChange: PropTypes.func.isRequired,
};
