import React from "react";
import PropTypes from "prop-types";
import { RatingStars } from "./ratingStars/RatingStars";
import { Link } from "react-router-dom";
import { MIN_SIZE_QUALITY_STARS } from "../constants";
import { getFormattedImage } from "../pages/helper";

const WineCard = ({ wineInfos }) => {
  const { imageData, name, year, bottleRef, id } = wineInfos;

  return (
    <div className="rounded-3xl shadow-md h-full">
      <div className="bg-stone-100 flex flex-col border rounded-3xl h-full justify-between">
        <div className="flex flex-col items-center m-10">
          {imageData && (
            <Link
              to={`/wine-bottle-informations/${id}`}
              target="_blank"
              onClick={() => localStorage.setItem(`wineBottleInfos-${id}`, JSON.stringify(wineInfos))}
            >
              <img
                src={getFormattedImage(imageData)}
                alt={`${name}-${year}-${bottleRef}`}
                className="cursor-pointer border-2 border-stone-300 rounded-3xl transition duration-1000 ease-in-out transform hover:scale-125"
              />
            </Link>
          )}

          <div className="flex flex-col items-center mt-7 text-center">
            <p className="font-serif font-bold text-xl mb-2 text-gray-500">{name}</p>
            <p className="font-serif text-stone-500 text-base-sm">{year}</p>
            <div className="mt-5">
              <RatingStars ratingString={wineInfos.quality} size={MIN_SIZE_QUALITY_STARS} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineCard;

WineCard.propTypes = {
  wineInfos: PropTypes.object.isRequired,
};
