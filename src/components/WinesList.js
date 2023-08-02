import React from "react";
import PropTypes from "prop-types";
import WineCard from "./WineCard";

const WinesList = ({ list }) => (
  <div className="grid gap-5 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
    {list.map((wine) => (
      <div key={`wine-${wine.id}`}>
        <WineCard wineInfos={wine} />
      </div>
    ))}
  </div>
);

WinesList.propTypes = {
  list: PropTypes.array.isRequired,
};

export default WinesList;
