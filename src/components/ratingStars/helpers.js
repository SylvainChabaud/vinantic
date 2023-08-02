import { React } from "react";
import PropTypes from "prop-types";

import { BOTTLE_QUALITIES, NB_QUALITY_STARS } from "../../constants";
import { T, always, cond, equals } from "ramda";

const StarFilled = ({ filled, size }) => (
  <svg
    aria-hidden="true"
    className={`w-${size} h-${size} ${filled ? "text-orange-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>First star</title>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  </svg>
);

const renderStarsWithFilledStars = ({ count, size }) => (
  <div className="flex flex-row">
    {Array.from({ length: NB_QUALITY_STARS }, (_, index) => (
      <StarFilled key={index} filled={index < count} size={size} />
    ))}
  </div>
);

export const renderStars = (size) =>
  cond([
    [equals(BOTTLE_QUALITIES.VERY_GOOD), always(renderStarsWithFilledStars({ count: 4, size }))],
    [equals(BOTTLE_QUALITIES.GOOD), always(renderStarsWithFilledStars({ count: 3, size }))],
    [equals(BOTTLE_QUALITIES.BAD), always(renderStarsWithFilledStars({ count: 2, size }))],
    [equals(BOTTLE_QUALITIES.VERY_BAD), always(renderStarsWithFilledStars({ count: 1, size }))],
    [T, always(renderStarsWithFilledStars({ count: 0, size }))],
  ]);

StarFilled.propTypes = {
  filled: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
};
