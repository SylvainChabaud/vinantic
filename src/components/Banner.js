import React from "react";
import PropTypes from "prop-types";
import { SEARCH_SELECTOR_OPTIONS } from "../constants";
import { useTranslation } from "react-i18next";

const Banner = ({ currentPage, totalWines, sortBy }) => {
  const { t } = useTranslation();

  return (
    <div className="p-5 border rounded-lg text-stone-500 bg-stone-200">
      <p>
        {t("banner.page_info", { currentPage })}
        {totalWines !== 0 ? t("banner.available_list", { totalWines }) : t("banner.no_available_list")}
        {sortBy !== SEARCH_SELECTOR_OPTIONS.NO_SORT ? t("banner.sorted_list") : t("banner.no_sorted_list")}
      </p>

      <a href="https://vinantic.fr/Catalogue_de_vins_Vinantic.pdf" target="blank">
        <p className="cursor-pointer font-bold hover:text-red-900 duration-500 ease-in-out ">
          {t("banner.upload_pdf")}
        </p>
      </a>
    </div>
  );
};

Banner.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalWines: PropTypes.number.isRequired,
  sortBy: PropTypes.string.isRequired,
};

export default Banner;
