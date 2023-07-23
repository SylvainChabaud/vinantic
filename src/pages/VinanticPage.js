import React, { useEffect, useState } from "react";
import useVinantic from "../hooks/useVinantic";
import TextSearchInput from "../components/TextSearchInput";
import SearchSelector from "../components/SearchSelector";
import WineCard from "../components/WineCard";
import Title from "../components/Title";
import Pagination from "../components/Pagination";
import { SEARCH_SELECTOR_OPTIONS } from "../constants";
import { Loader } from "../components/Loader";
import Description from "../components/Description";
import { useTranslation } from "react-i18next";

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
      <div className="bg-stone-100">
        <div className="py-10">
          <Title />
        </div>

        <div className="pb-14 px-15vw border-b-2">
          <Description />
        </div>
      </div>

      {isWinesLoading ? (
        <div className="flex justify-center">
          <Loader size={100} />
        </div>
      ) : totalWines === 0 ? (
        <p className="mt-10 flex justify-center text-red-400">{t("warnings.no_wines_available")}</p>
      ) : (
        <div className="flex flex-col bg-gray-100 p-3vw pt-10">
          <div className="flex flex-row">
            <div className="w-64">
              <TextSearchInput searchText={searchText} handleSearchChange={handleSearchChange} />
            </div>

            <div className="ml-10 w-64">
              <SearchSelector sortBy={sortBy} handleSortChange={handleSortChange} />
            </div>
          </div>

          <div className="mt-10 p-5 border rounded-lg text-stone-500 bg-stone-200">
            <p>
              {`Vous êtes sur la page ${currentPage} du catalogue. `}
              {totalWines !== 0 ? `${totalWines} bouteilles sont disponibles. ` : "Aucune bouteille n'est disponible. "}
              {sortBy !== SEARCH_SELECTOR_OPTIONS.NO_SORT ? `La liste ci-dessous a été triées.` : "La liste ci-dessous n'a pas été triées."}
            </p>

            <p onClick={handleGeneratePdf} className="cursor-pointer font-bold hover:text-red-900 duration-500 ease-in-out ">
              Télécharger le catalogue au format PDF.
            </p>

            {isPdfLoading && <Loader size={50} />}
          </div>

          <div className="grid gap-5 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 mt-10">
            {winesList.map((wine) => (
              <div key={`wine-${wine.id}`}>
                <WineCard wine={wine} />
              </div>
            ))}
          </div>

          <div className="mt-20 mb-10">
            <Pagination currentPage={currentPage} totalWines={totalWines} onPageChange={handlePageChange} />
          </div>
        </div>
      )}
    </>
  );
};

export default VinanticPage;
