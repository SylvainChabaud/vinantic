import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const BottlePicPage = () => {
  const { id } = useParams();

  const wineInfos = JSON.parse(localStorage.getItem(`wineBottlePic-${id}`));
  const { name, year, contentType, data, bottleRef } = wineInfos;

  const onCloseTab = (event) => {
    event.preventDefault();
    localStorage.removeItem(`wineBottlePic-${id}`);
  };

  useEffect(() => {
    window.addEventListener("unload", onCloseTab);
    return () => window.removeEventListener("unload", onCloseTab);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <img src={`data:${contentType};base64,${data}`} alt={`${name}-${year}-${bottleRef}`} className="block m-auto" />
    </div>
  );
};

export default BottlePicPage;
