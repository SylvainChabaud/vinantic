import React from "react";
import PropTypes from "prop-types";
import { renderStars } from "./helpers";

export const RatingStars = ({ ratingString, size }) => <div>{renderStars(size)(ratingString.toLowerCase())}</div>;

RatingStars.propTypes = {
  ratingString: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};
