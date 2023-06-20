import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { DELETE_BOTTLES, GET_BOTTLES, SET_BOTTLES } from "../graphql/bottleQueries";
import XLSX from "xlsx/dist/xlsx.full.min";
import { applySpec, compose, map, prop, propOr } from "ramda";
import { mapIndexed } from "ramda-adjunct";
import { getImageSource, transformBottles } from "./helper";
import { DELETE_IMAGES, GET_IMAGES, SET_IMAGES } from "../graphql/imageQueries";

const AdminPage = () => {
  const [backMessage, setBackMessage] = useState();
  const [bottlesList, setBottlesList] = useState([]);
  const [imagesList, setImagesList] = useState([]);

  const [deleteBottles, { loading: deleteBottlesLoading }] = useMutation(DELETE_BOTTLES, {
    onError: (error) => setBackMessage(error.message),
    onCompleted: (data) => {
      const { ok, message } = data.deleteBottles;
      if (ok) {
        setBackMessage(message);
        setBottlesList([]);
      } else setBackMessage("Une erreur est survenue");
    },
  });

  const [deleteImages, { loading: deleteImagesLoading, error: deleteImagesError, data: deleteImagesData }] = useMutation(DELETE_IMAGES, {
    onError: (error) => setBackMessage(error.message),
    onCompleted: (data) => {
      const { ok, message } = data.deleteImages;
      if (ok) {
        setBackMessage(message);
        setImagesList([]);
      } else setBackMessage("Une erreur est survenue");
    },
  });

  const [setBottles, { loading: setBottlesLoading }] = useMutation(SET_BOTTLES, {
    onError: (error) => setBackMessage(error.message),
    onCompleted: (data) => {
      const { ok, message } = data.setBottles;
      if (ok) setBackMessage(message);
      else setBackMessage("Une erreur est survenue");
    },
  });

  const [setImages, { loading: setImagesLoading, error: setImagesError, data: setImagesData }] = useMutation(SET_IMAGES, {
    onError: (error) => setBackMessage(error.message),
    onCompleted: (data) => {
      const { ok, message } = data.setImages;
      if (ok) setBackMessage(message);
      else setBackMessage("Une erreur est survenue");
    },
  });

  const [getImages, { loading: getImagesLoading }] = useLazyQuery(GET_IMAGES, {
    onError: (error) => setBackMessage(error.message),
    onCompleted: (data) => {
      const { ok, message, data: images } = data.getImages;
      if (ok) {
        setImagesList(images);
        setBackMessage(message);
      } else setBackMessage("Une erreur est survenue");
    },
  });

  const [getBottles, { loading: getBottlesLoading }] = useLazyQuery(GET_BOTTLES, {
    onError: (error) => setBackMessage(error.message),
    onCompleted: (data) => {
      const { ok, message, data: bottles } = data.getBottles;
      if (ok) {
        setBottlesList(bottles);
        setBackMessage(message);
      } else setBackMessage("Une erreur est survenue");
    },
  });

  useEffect(() => {
    if (backMessage)
      setTimeout(() => {
        setBackMessage(null);
      }, 3000);
  }, [backMessage]);

  const handleXlsFileUpload = (event) => {
    if (event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const bstr = event.target.result;
        const workbook = XLSX.read(bstr, { type: "binary" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const filteredWines = compose(
          map(
            applySpec({
              year: propOr(0, "Année"),
              name: propOr("", "Château"),
              bottleType: propOr("", "Contenant"),
              price: propOr(0, "Prix sur le marché"),
              quality: propOr("", "Qualité"),
              bottleRef: (wine) => propOr("", "Référence", wine).toLowerCase(),
              wineType: propOr("", "Type"),
              city: propOr("", "Ville"),
              quantity: propOr(0, "Quantity"),
            })
          ),
          transformBottles
        )(jsonData);

        setBottles({ variables: { bottles: filteredWines } }); // Set to Base
      };

      reader.onerror = (error) => {
        setBackMessage(error);
      };

      reader.readAsBinaryString(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {setImagesLoading || setBottlesLoading || deleteImagesLoading || deleteBottlesLoading || getImagesLoading || getBottlesLoading ? (
        <p>En cours de chargement...</p>
      ) : (
        backMessage && <p className="my-20 text-xl text-green-900">{backMessage}</p>
      )}

      <button
        className="transition ease-in-out delay-50 font-mono bg-gray-50 p-10 border hover:bg-gray-300 hover:text-white duration-300 mt-10"
        onClick={deleteBottles}
      >
        DELETE INFOS WINES FROM BASE
      </button>

      <button
        className="transition ease-in-out delay-50 font-mono bg-gray-50 p-10 border hover:bg-gray-300 hover:text-white duration-300 mt-10"
        onClick={deleteImages}
      >
        DELETE PICS WINES FROM BASE
      </button>

      <label
        className="transition ease-in-out delay-50 font-mono bg-gray-50 p-10 border hover:bg-gray-300 hover:text-white duration-300 cursor-pointer mt-10"
        onChange={handleXlsFileUpload}
        htmlFor="uploadXlsFileInput"
      >
        <input id="uploadXlsFileInput" className="hidden" type="file" />
        GET INFOS WINES FROM XLS FILE AND SET TO BASE
      </label>

      <button
        className="transition ease-in-out delay-50 font-mono bg-gray-50 p-10 border hover:bg-gray-300 hover:text-white duration-300 mt-10"
        onClick={setImages}
      >
        GET PICS WINES FROM FOLDER AND SET TO BASE
      </button>

      <button
        className="transition ease-in-out delay-50 font-mono bg-gray-50 p-10 border hover:bg-gray-300 hover:text-white duration-300 mt-10"
        onClick={getImages}
      >
        GET PICS WINES FROM BASE
      </button>

      <button
        className="transition ease-in-out delay-50 font-mono bg-gray-50 p-10 border hover:bg-gray-300 hover:text-white duration-300 mt-10"
        onClick={getBottles}
      >
        GET INFOS WINES FROM BASE
      </button>

      <table className="table-auto w-full text-left mt-10">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Ville</th>
            <th className="px-4 py-2">Prix</th>
            <th className="px-4 py-2">Année</th>
            <th className="px-4 py-2">Qualité</th>
            <th className="px-4 py-2">Type de bouteille</th>
            <th className="px-4 py-2">Type de vin</th>
            <th className="px-4 py-2">Ref image</th>
            <th className="px-4 py-2">Quantité</th>
            <th className="px-4 py-2">Image</th>
          </tr>
        </thead>
        <tbody>
          {mapIndexed((bottle, idx) => {
            const imageSrc = getImageSource({ bottle, imagesList });

            return (
              <tr key={`bottle-${idx}`} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{prop("name", bottle)}</td>
                <td className="border px-4 py-2">{prop("city", bottle)}</td>
                <td className="border px-4 py-2">{prop("price", bottle)}</td>
                <td className="border px-4 py-2">{prop("year", bottle)}</td>
                <td className="border px-4 py-2">{prop("quality", bottle)}</td>
                <td className="border px-4 py-2">{prop("bottleType", bottle)}</td>
                <td className="border px-4 py-2">{prop("wineType", bottle)}</td>
                <td className="border px-4 py-2">{prop("bottleRef", bottle)}</td>
                <td className="border px-4 py-2">{prop("quantity", bottle)}</td>
                <td className="border px-4 py-2">
                  <img
                    className="w-24"
                    src={imageSrc}
                    alt={prop("name", bottle)}
                  />
                </td>
              </tr>
            );
          })(bottlesList)}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
