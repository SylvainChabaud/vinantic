import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOTTLES } from "../graphql/bottleQueries";
import { GET_IMAGES } from "../graphql/imageQueries";
import { ITEMS_PER_PAGE, SEARCH_SELECTOR_OPTIONS } from "../constants";

import { exportVinanticPdf, extractImageName, filterAndSortWineList, mergeWineInfosByRef, scrollToTop } from "../components/helper";
import { isNilOrEmpty } from "ramda-adjunct";

const useVinantic = () => {
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState(SEARCH_SELECTOR_OPTIONS.NO_SORT);
  const [winesList, setWinesList] = useState([]);
  const [filteredWinesList, setFilteredWinesList] = useState([]);
  const [mergedWinesInfos, setMergedWinesInfos] = useState([]);
  const [currentWineList, setCurrentWineList] = useState([]);
  const [imagesList, setImagesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  const { loading: bottlesLoading, error: bottlesError, data: bottlesData } = useQuery(GET_BOTTLES);
  const {
    loading: imagesLoading,
    error: imagesError,
    data: imagesData,
  } = useQuery(GET_IMAGES, {
    skip: isNilOrEmpty(bottlesData), // Skip the query if bottlesData is not available
  });

  useEffect(() => {
    if (!bottlesLoading && bottlesData) {
      const wineList = bottlesData.getBottles.data;
      setWinesList(wineList);
    }

    if (!imagesLoading && imagesData) {
      const images = imagesData.getImages.data;
      setImagesList(images);
    }
  }, [bottlesData, imagesData, imagesLoading, imagesData]);

  useEffect(() => {
    if (imagesList.length !== 0 && winesList.length !== 0) {
      const formattedImagesList = imagesList.map((image) => {
        const imageRef = extractImageName(image.filename);
        return { ...image, ref: imageRef };
      });

      const mergedWinesInfos = mergeWineInfosByRef({
        winesData: winesList,
        imagesData: formattedImagesList,
      });

      setMergedWinesInfos(mergedWinesInfos);
      setFilteredWinesList(mergedWinesInfos);
    }
  }, [imagesList, winesList]);

  useEffect(() => {
    if (mergedWinesInfos) {
      filterAndSortWineList({
        wineList: mergedWinesInfos,
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
    isWinesLoading: imagesLoading || bottlesLoading,
    handleSearchChange,
    handleSortChange,
    handlePageChange,
    handleGeneratePdf: () => exportVinanticPdf({ winesList: mergedWinesInfos, setIsPdfLoading }),
  };
};

export default useVinantic;
