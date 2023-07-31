import React from "react";
import PropTypes from "prop-types";
import { SEARCH_SELECTOR_OPTIONS } from "../constants";
import { Loader } from "./Loader";
import { useTranslation } from "react-i18next";

const Banner = ({ currentPage, totalWines, isPdfLoading, sortBy, handleGeneratePdf }) => {
  const { t } = useTranslation();

  return (
    <div className="p-5 border rounded-lg text-stone-500 bg-stone-200">
      <p>
        {t("banner.page_info", { currentPage })}
        {totalWines !== 0 ? t("banner.available_list", { totalWines }) : t("banner.no_available_list")}
        {sortBy !== SEARCH_SELECTOR_OPTIONS.NO_SORT ? t("banner.sorted_list") : t("banner.no_sorted_list")}
      </p>

      <p onClick={handleGeneratePdf} className="cursor-pointer font-bold hover:text-red-900 duration-500 ease-in-out ">
        {t("banner.upload_pdf")}
      </p>

      {isPdfLoading && <Loader size={50} />}
    </div>
  );
};

Banner.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalWines: PropTypes.number.isRequired,
  isPdfLoading: PropTypes.bool.isRequired,
  sortBy: PropTypes.string.isRequired,
  handleGeneratePdf: PropTypes.func.isRequired,
};

export default Banner;
