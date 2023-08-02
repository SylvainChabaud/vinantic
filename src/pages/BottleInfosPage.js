import React, { useEffect } from "react";
import { RatingStars } from "../components/ratingStars/RatingStars";
import { MIN_SIZE_QUALITY_STARS } from "../constants";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

const BottleInfosPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const wineInfos = JSON.parse(localStorage.getItem(`wineBottleInfos-${id}`));
  const { city, name, year, price, quantity, contentType, data, bottleRef, bottleType, quality } = wineInfos;

  const onCloseTab = (event) => {
    event.preventDefault();
    localStorage.removeItem(`wineBottleInfos-${id}`);
  };

  useEffect(() => {
    window.addEventListener("unload", onCloseTab);
    return () => window.removeEventListener("unload", onCloseTab);
  }, []);

  return (
    <div className="flex items-center justify-evenly bg-stone-200 min-h-screen p-10 flex-col lg:flex-row">
      <Link to={`/wine-bottle-pic/${id}`} target="_blank" onClick={() => localStorage.setItem(`wineBottlePic-${id}`, JSON.stringify(wineInfos))}>
        <img
          src={`data:${contentType};base64,${data}`}
          alt={`${name}-${year}-${bottleRef}`}
          className="cursor-pointer rounded-3xl h-[500px] xl:h-[700px]"
        />
      </Link>

      <div className="flex flex-col justify-left lg:mt-0 lg:items-start sm:mt-10 sm:items-center">
        <p className="text-5xl font-semibold">
          {t("bottle.castle")} {name}
        </p>

        <div className="flex">
          <p className="text-3xl text-gray-600">{city}</p>
          <p className="text-3xl text-gray-600 ml-3">{year}</p>
        </div>

        <p className="text-xl text-gray-600">{bottleType}</p>

        <p className="text-2xl font-semibold mt-10">
          {t("bottle.price")} {price} {t("bottle.unit")}
        </p>

        <p className="text-xl text-gray-600">
          {t("bottle.stock")} {quantity}
        </p>

        <div className="flex items-center">
          <p className="text-xl text-gray-600 mr-3">{t("bottle.quality")}</p>
          <RatingStars ratingString={quality} size={MIN_SIZE_QUALITY_STARS} />
        </div>
      </div>
    </div>
  );
};

export default BottleInfosPage;
