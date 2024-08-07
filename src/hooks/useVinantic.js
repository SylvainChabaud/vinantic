import { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { ITEMS_PER_PAGE, SEARCH_SELECTOR_OPTIONS } from "../constants";

import { exportVinanticPdf, scrollToTop } from "../components/helper";
import { GET_GLOBAL } from "../graphql/globalQueries";
import { useTranslation } from "react-i18next";

const useVinantic = () => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [sortBy, setSortBy] = useState(SEARCH_SELECTOR_OPTIONS.NO_SORT);
  const [currentWineList, setCurrentWineList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalWines, setTotalWines] = useState(0);
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  const searchDebounce = useRef(null);

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const limit = offset + ITEMS_PER_PAGE;

  const { loading: globalLoading, error: globalError, data: globalData, refetch } = useQuery(GET_GLOBAL, {
    variables: { offset, limit, searchText: debouncedSearchText, sortBy },
    notifyOnNetworkStatusChange: true,
  });

  const fetchWinesAndExportPdf = async ({ offset, limit, searchText, sortBy }) => {
    setIsPdfLoading(true);
    const { data } = await refetch({ offset, limit, searchText, sortBy });

    if (data) {
      const winesList = data.getGlobal?.data;
      winesList && exportVinanticPdf({ winesList, setIsPdfLoading, translate: t })
    }
  };

  useEffect(() => {
    if (globalData && !globalLoading) {
      const { data, totalCount } = globalData.getGlobal;

      if (data.length !== totalCount) {
        setTotalWines(totalCount);
        setCurrentWineList(data);
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
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  const handleGeneratePdf = () => {
    console.info('totalWines', totalWines);
    fetchWinesAndExportPdf({ offset: 0, limit: totalWines, searchText: '', sortBy: SEARCH_SELECTOR_OPTIONS.NO_SORT });
  };

  return {
    currentPage,
    searchText,
    sortBy,
    totalWines,
    winesList: currentWineList,
    isPdfLoading,
    isWinesLoading: globalLoading,
    isWinesError: globalError,
    handleSearchChange,
    handleSortChange,
    handlePageChange,
    handleGeneratePdf,
  };
};

export default useVinantic;