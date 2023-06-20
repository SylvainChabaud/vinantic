import React, { useEffect, useState } from "react";
import useVinantic from "../hooks/useVinantic";
import TextSearchInput from "../components/TextSearchInput";
import SearchSelector from "../components/SearchSelector";
import WineCard from "../components/WineCard";
import Title from "../components/Title";
import Pagination from "../components/Pagination";
import { SEARCH_SELECTOR_OPTIONS } from "../constants";

const VinanticPage = () => {
  const {
    currentPage,
    searchText,
    sortBy,
    totalWines,
    winesList,
    handleSearchChange,
    handleSortChange,
    handlePageChange,
    handleGeneratePdf
  } = useVinantic();

  return (
    <div className="flex flex-col bg-gray-100 px-5">
      <div className="my-10 text-stone-700">
        <Title />
      </div>

      <div className="flex flex-row">
        <div className="w-64">
          <TextSearchInput
            searchText={searchText}
            handleSearchChange={handleSearchChange}
          />
        </div>

        <div className="ml-10 w-64">
          <SearchSelector sortBy={sortBy} handleSortChange={handleSortChange} />
        </div>
      </div>

      <div className="mt-10 p-5 border rounded-lg text-stone-500 bg-stone-200">
        <p>
          {`Vous êtes sur la page ${currentPage} du catalogue. `}
          {totalWines !== 0
            ? `${totalWines} bouteilles sont disponibles. `
            : "Aucune bouteille n'est disponible. "}
          {sortBy !== SEARCH_SELECTOR_OPTIONS.NO_SORT
            ? `La liste ci-dessous a été triées.`
            : "La liste ci-dessous n'a pas été triées."}
        </p>

        <p onClick={handleGeneratePdf} className="cursor-pointer font-bold hover:text-red-900 duration-500 ease-in-out ">Télécharger le catalogue au format PDF.</p>
      </div>

      <div className="grid gap-5 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 mt-10">
        {totalWines !== 0 &&
          winesList.map((wine) => (
            <div key={`wine-${wine.id}`}>
              <WineCard wine={wine} />
            </div>
          ))}
      </div>

      <div className="mt-20 mb-10">
        <Pagination
          currentPage={currentPage}
          totalWines={totalWines}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default VinanticPage;
