import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ITEMS_PER_PAGE, SEARCH_SELECTOR_OPTIONS } from "../constants";

import { exportVinanticPdf, filterAndSortWineList, scrollToTop } from "../components/helper";
import { isNotEmpty } from "ramda-adjunct";
import { GET_GLOBAL } from "../graphql/globalQueries";

const useVinantic = () => {
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState(SEARCH_SELECTOR_OPTIONS.NO_SORT);
  const [globalList, setGlobalList] = useState([]);
  const [filteredWinesList, setFilteredWinesList] = useState([]);
  const [currentWineList, setCurrentWineList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  const { loading: globalLoading, error: globalError, data: globalData } = useQuery(GET_GLOBAL);

  useEffect(() => {
    if (globalData && !globalLoading) {
      const globalWithPic = (globalData.getGlobal.data);
      setGlobalList(globalWithPic);
      setFilteredWinesList(globalWithPic);
    }
  }, [globalData, globalLoading])

  useEffect(() => {
    if (isNotEmpty(globalList)) {
      setCurrentPage(1);
      filterAndSortWineList({
        wineList: globalList,
        setFilteredWinesList,
        searchText,
        sortBy,
      });
    }
  }, [searchText, sortBy]);

  useEffect(() => {
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentWineList = filteredWinesList.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentWineList(currentWineList);
  }, [currentPage, filteredWinesList]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  return {
    currentPage,
    searchText,
    sortBy,
    totalWines: filteredWinesList.length,
    winesList: currentWineList,
    isPdfLoading,
    isWinesLoading: globalLoading,
    isWinesError: globalError,
    handleSearchChange,
    handleSortChange,
    handlePageChange,
    handleGeneratePdf: () => exportVinanticPdf({ winesList: globalList, setIsPdfLoading }),
  };
};

export default useVinantic;