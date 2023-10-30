import React, { useEffect, useState } from "react";
import { RatingStars } from "../components/ratingStars/RatingStars";
import { MIN_SIZE_QUALITY_STARS } from "../constants";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_WINE_BOTTLE } from "../graphql/globalQueries";
import { Buffer } from "buffer";
import { Loader } from "../components/Loader";
import { isEmpty, isNotNil } from "ramda";

const BottleInfosPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [wineBottle, setWineBottle] = useState({});

  const {
    loading: wineBottleLoading,
    error: wineBottleError,
    data: wineBottleData,
  } = useQuery(GET_WINE_BOTTLE, {
    variables: { id },
  });

  useEffect(() => {
    if (!wineBottleLoading && wineBottleData) {
      setWineBottle(wineBottleData.getWineBottle.data);
    }
  }, [wineBottleData, wineBottleLoading]);

  return (
    <>
      {isNotNil(wineBottleError) ? (
        <p className="my-20 text-xl text-green-900 text-center">{t("general.errorMessage")}</p>
      ) : isEmpty(wineBottle) ? (
        <div className="flex justify-center">
          <Loader size={100} />
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center px-5 bg-stone-200 lg:flex-row lg:justify-evenly">
          <img
            src={`data:image/jpg;base64,${Buffer.from(wineBottle.imageData, "base64").toString("base64")}`}
            alt={`${wineBottle.name}-${wineBottle.year}-${wineBottle.bottleRef}`}
            className="cursor-pointer rounded-3xl h-[400px] sm:h-[500px] sm:mt-10 xl:h-[700px]"
          />

          <div className="flex flex-col mt-5 ml-0 items-center sm:mt-10 lg:mt-0 lg:ml-5 lg:items-start">
            <p className="text-3xl text-center lg:text-left sm:text-5xl font-semibold">
              {t("bottle.castle")} {wineBottle.name}
            </p>

            <div className="flex mt-2 sm:mt-5">
              <p className="text-2xl sm:text-3xl text-gray-600">{wineBottle.city}</p>
              <p className="text-2xl sm:text-3xl text-gray-600 ml-3">{wineBottle.year}</p>
            </div>

            <p className="text-lg sm:text-xl text-gray-600">{wineBottle.bottleType}</p>

            <p className="text-xl sm:text-2xl font-semibold mt-5 sm:mt-10">
              {t("bottle.price")} {wineBottle.price} {t("bottle.unit")}
            </p>

            <p className="text-lg sm:text-xl text-gray-600">
              {t("bottle.stock")} {wineBottle.quantity}
            </p>

            <div className="flex items-center">
              <p className="text-lg sm:text-xl text-gray-600 mr-3">{t("bottle.quality")}</p>
              <RatingStars ratingString={wineBottle.quality} size={MIN_SIZE_QUALITY_STARS} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BottleInfosPage;
