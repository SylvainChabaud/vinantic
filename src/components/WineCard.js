import React from "react";
import PropTypes from "prop-types";
import { RatingStars } from "./RatingStars";

const WineCard = ({ wine }) => {
  const openImageInNewTab = () => {
    const imageSrc = `data:${wine.contentType};base64,${wine.data}`;
    const newTab = window.open();
    newTab.document.open();
    newTab.document.write(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${wine.name}-${wine.year}-${wine.bottleRef}</title>
          <style>
            body, html {
              height: 100%;
              margin: 0;
              padding: 0;
            }
            body {
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #000;
            }
            img {
              display: block;
              margin: 0 auto;
            }
          </style>
        </head>
        <body>
          <div style="height: 100%; display: flex; align-items: center; justify-content: center;">
            <img src="${imageSrc}" alt="${wine.name}-${wine.year}-${wine.bottleRef}" style="display: block; margin: auto;">
          </div>
        </body>
      </html>
      `
    );
    newTab.document.close();
  };

  return (
    <div className="rounded-3xl shadow-md h-full">
      <div className="bg-stone-100 flex flex-col border rounded-3xl h-full justify-between">
        <div className="flex flex-col items-center m-10">
          {wine.data && (
            <img
              src={`data:${wine.contentType};base64,${wine.data}`}
              alt={`${wine.name}-${wine.year}-${wine.bottleRef}`}
              className="cursor-pointer border-2 border-stone-300 rounded-3xl transition duration-1000 ease-in-out transform hover:scale-125"
              onClick={openImageInNewTab}
            />
          )}

          <div className="flex flex-col items-center mt-7 text-center">
            <p className="font-serif font-bold text-xl mb-2 text-gray-500">{wine.name}</p>
            <p className="font-serif text-stone-500 text-base-sm">{wine.year}</p>
            <p className="font-serif text-stone-500 text-base-sm mt-2">{wine.price} €</p>
            <p className="font-serif text-stone-500 text-base-sm mt-2">{wine.quantity} en stock</p>
            <div className="mt-5">
              <RatingStars ratingString={wine.quality} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineCard;

WineCard.propTypes = {
  wine: PropTypes.object.isRequired,
};
