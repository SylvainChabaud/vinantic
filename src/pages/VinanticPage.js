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
    winesList,
    isPdfLoading,
    isWinesLoading,
    handleSearchChange,
    handleSortChange,
    handlePageChange,
    handleGeneratePdf,
  } = useVinantic();

  const { t } = useTranslation();

  return (
    <>
      <Header />

      {isWinesLoading ? (
        <div className="flex justify-center">
          <Loader size={100} />
        </div>
      ) : totalWines === 0 ? (
        <p className="mt-10 flex justify-center text-red-400">{t("warnings.no_wines_available")}</p>
      ) : (
        <div className="flex flex-col bg-gray-100 p-3vw pt-10">
          <SearchInputs searchText={searchText} sortBy={sortBy} handleSearchChange={handleSearchChange} handleSortChange={handleSortChange} />

          <div className="mt-10">
            <Banner
              currentPage={currentPage}
              totalWines={totalWines}
              isPdfLoading={isPdfLoading}
              sortBy={sortBy}
              handleGeneratePdf={handleGeneratePdf}
            />
          </div>

          <div className=" mt-10">
            <WinesList list={winesList} />
          </div>

          <div className="mt-10">
            <Pagination currentPage={currentPage} totalWines={totalWines} onPageChange={handlePageChange} />
          </div>
        </div>
      )}
    </>
  );
};

export default VinanticPage;
