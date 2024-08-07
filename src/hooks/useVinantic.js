import { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { ITEMS_PER_PAGE, SEARCH_SELECTOR_OPTIONS } from "../constants";

import { scrollToTop } from "../components/helper";
import { GET_GLOBAL } from "../graphql/globalQueries";

const useVinantic = () => {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [sortBy, setSortBy] = useState(SEARCH_SELECTOR_OPTIONS.NO_SORT);
  const [currentWineList, setCurrentWineList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalWines, setTotalWines] = useState(0);
  const [totalWinesInSearch, setTotalWinesInSearch] = useState(0);

  const searchDebounce = useRef(null);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const { loading: globalLoading, error: globalError, data: globalData, refetch } = useQuery(GET_GLOBAL, {
    variables: { offset, limit: ITEMS_PER_PAGE, searchText: debouncedSearchText, sortBy },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (globalData && !globalLoading) {
      const { data, totalCount, totalCountInSearch } = globalData.getGlobal;

      if (data.length !== totalCount) {
        setTotalWines(totalCount);
        setTotalWinesInSearch(totalCountInSearch);
        setCurrentWineList(data);
        scrollToTop();
      }
    }
  }, [globalData, globalLoading])

  const handleSearchChange = ({ target: { value } }) => {
    setSearchText(value);

    if (searchDebounce.current) {
      clearTimeout(searchDebounce.current);
    }

    searchDebounce.current = setTimeout(() => {
      setDebouncedSearchText(value);
      setCurrentPage(1);
    }, 1000);
  };

  const handleSortChange = ({ target: { value } }) => {
    setSortBy(value);
  };

  const handlePageChange = (pageNumber) => {
    console.info('handlePageChange', pageNumber)
    setCurrentPage(pageNumber);
  };

  return {
    currentPage,
    searchText,
    sortBy,
    totalWines,
    totalWinesInSearch,
    winesList: currentWineList,
    isWinesLoading: globalLoading,
    isWinesError: globalError,
    handleSearchChange,
    handleSortChange,
    handlePageChange,
  };
};

export default useVinantic;