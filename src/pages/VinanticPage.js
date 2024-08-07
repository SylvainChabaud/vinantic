import React from "react";
import useVinantic from "../hooks/useVinantic";
import Pagination from "../components/Pagination";
import { Loader } from "../components/Loader";
import { useTranslation } from "react-i18next";
import Banner from "../components/Banner";
import WinesList from "../components/WinesList";
import Header from "../components/Header";
import SearchInputs from "../components/SearchInputs";

const VinanticPage = () => {
  const {
    currentPage,
    searchText,
    sortBy,
    totalWines,
    totalWinesInSearch,
    winesList,
    isWinesLoading,
    handleSearchChange,
    handleSortChange,
    handlePageChange,
  } = useVinantic();

  const { t } = useTranslation();

  return (
    <>
      <Header />

      <div className="flex flex-col bg-gray-100 p-[3vw] pt-10">
        <SearchInputs searchText={searchText} sortBy={sortBy} handleSearchChange={handleSearchChange} handleSortChange={handleSortChange} />

        <div className="mt-10">
          <Banner
            currentPage={currentPage}
            totalWines={totalWines}
            sortBy={sortBy}
          />
        </div>

        {isWinesLoading ? (
          <div className="flex justify-center">
            <Loader size={100} />
          </div>
        ) : totalWines === 0 ? (
          <p className="mt-10 flex justify-center text-red-400">{t("warnings.no_wines_available")}</p>
        ) : (
          <>
            <div className=" mt-10">
              <WinesList list={winesList} />
            </div>

            <div className="mt-10">
              <Pagination currentPage={currentPage} totalWines={totalWinesInSearch} onPageChange={handlePageChange} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default VinanticPage;
