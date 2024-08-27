import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
// import XLSX from "xlsx/dist/xlsx.full.min";
import { prop } from "ramda";
import { isNotEmpty, mapIndexed } from "ramda-adjunct";
import { getFormattedImage } from "./helper";
// import { DELETE_IMAGES, GET_IMAGES, SET_IMAGES } from "../graphql/imageQueries";
import { DELETE_GLOBAL, GET_GLOBAL, GET_WINE_BOTTLE, SET_GLOBAL } from "../graphql/globalQueries";
// import { DELETE_BOTTLES, GET_BOTTLES, SET_BOTTLES } from "../graphql/bottleQueries";
import { useTranslation } from "react-i18next";
import { exportVinanticPdf } from "../components/helper";

const AdminPage = () => {
  const { t } = useTranslation();
  const [backMessage, setBackMessage] = useState();
  // const [bottlesList, setBottlesList] = useState([]);
  // const [imagesList, setImagesList] = useState([]);
  const [globalList, setGlobalList] = useState([]);

  // const [deleteBottles, { loading: deleteBottlesLoading }] = useMutation(DELETE_BOTTLES, {
  //   onError: (error) => setBackMessage(error.message),
  //   onCompleted: (data) => {
  //     const { ok, message } = data.deleteBottles;
  //     if (ok) {
  //       setBackMessage(message);
  //       setBottlesList([]);
  //     } else setBackMessage("Une erreur est survenue");
  //   },
  // });

  // const [deleteImages, { loading: deleteImagesLoading }] = useMutation(DELETE_IMAGES, {
  //   onError: (error) => setBackMessage(error.message),
  //   onCompleted: (data) => {
  //     const { ok, message } = data.deleteImages;
  //     if (ok) {
  //       setBackMessage(message);
  //       setImagesList([]);
  //     } else setBackMessage("Une erreur est survenue");
  //   },
  // });

  const [deleteGlobal, { loading: deleteGlobalLoading }] = useMutation(DELETE_GLOBAL, {
    onError: (error) => setBackMessage(error.message),
    onCompleted: (data) => {
      const { ok, message } = data.deleteGlobal;
      if (ok) {
        setBackMessage(message);
        setGlobalList([]);
      } else setBackMessage("Une erreur est survenue");
    },
  });

  // const [setBottles, { loading: setBottlesLoading }] = useMutation(SET_BOTTLES, {
  //   onError: (error) => setBackMessage(error.message),
  //   onCompleted: (data) => {
  //     const { ok, message } = data.setBottles;
  //     if (ok) setBackMessage(message);
  //     else setBackMessage("Une erreur est survenue");
  //   },
  // });

  // const [setImages, { loading: setImagesLoading }] = useMutation(SET_IMAGES, {
  //   onError: (error) => setBackMessage(error.message),
  //   onCompleted: (data) => {
  //     const { ok, message } = data.setImages;
  //     if (ok) setBackMessage(message);
  //     else setBackMessage("Une erreur est survenue");
  //   },
  // });

  const [setGlobal, { loading: setGlobalLoading }] = useMutation(SET_GLOBAL, {
    onError: (error) => setBackMessage(error.message),
    onCompleted: (data) => {
      const { ok, message } = data.setGlobal;
      if (ok) setBackMessage(message);
      else setBackMessage("Une erreur est survenue");
    },
  });

  // const [getBottles, { loading: getBottlesLoading }] = useLazyQuery(GET_BOTTLES, {
  //   onError: (error) => setBackMessage(error.message),
  //   onCompleted: (data) => {
  //     const { ok, message, data: bottles } = data.getBottles;
  //     if (ok) {
  //       setBottlesList(bottles);
  //       setBackMessage(message);
  //     } else setBackMessage("Une erreur est survenue");
  //   },
  // });

  // const [getImages, { loading: getImagesLoading }] = useLazyQuery(GET_IMAGES, {
  //   onError: (error) => setBackMessage(error.message),
  //   onCompleted: (data) => {
  //     const { ok, message, data: images } = data.getImages;
  //     if (ok) {
  //       setImagesList(images);
  //       setBackMessage(message);
  //     } else setBackMessage("Une erreur est survenue");
  //   },
  // });

  const [getGlobal, { loading: getGlobalLoading }] = useLazyQuery(GET_GLOBAL, {
    onError: (error) => setBackMessage(error.message),
    onCompleted: (data) => {
      const { ok, message, data: global } = data.getGlobal;
      console.info('data', data)
      if (ok) {
        setGlobalList(global);
        setBackMessage(message);
      } else setBackMessage("Une erreur est survenue");
    },
  });

  // const [getWineBottle, { loading: getWineBottleLoading }] = useLazyQuery(GET_WINE_BOTTLE, {
  //   onError: (error) => setBackMessage(error.message),
  //   onCompleted: (data) => {
  //     const { ok, message, data: wineBottle } = data.getWineBottle;
  //     if (ok) {
  //       // setGlobalList(global);
  //       setBackMessage(message);
  //     } else setBackMessage("Une erreur est survenue");
  //   },
  // });

  const onExportPDF = () => {
    if (globalList) {
      // const winesList = globalList.slice(0, 5);
      exportVinanticPdf({ winesList: globalList, translate: t });
      setBackMessage('Le document PDF est en cours de construction...');
    }
  };

  useEffect(() => {
    if (backMessage)
      setTimeout(() => {
        setBackMessage(null);
      }, 3000);
  }, [backMessage]);

  return (
    <div className="flex flex-col items-center">
      {getGlobalLoading ||
      // getImagesLoading ||
      // getBottlesLoading ||
      setGlobalLoading ||
      // getWineBottleLoading ||
      // setImagesLoading ||
      // setBottlesLoading ||
      // deleteImagesLoading ||
      // deleteBottlesLoading ||
      deleteGlobalLoading ? (
          <p className="my-20 text-xl text-green-900">{t("general.loadingMessage")}</p>
        ) : backMessage ? (
          <p className="my-20 text-xl text-green-900">{backMessage}</p>
        ) : (
          <div className="flex flex-col">
            {/* <button
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
              </button> */}

            <button
              className="transition ease-in-out delay-50 font-mono bg-gray-50 p-10 border hover:bg-gray-300 hover:text-white duration-300 mt-10"
              onClick={deleteGlobal}
            >
              DELETE GLOBAL FROM BASE
            </button>

            {/* <label
                className="transition ease-in-out delay-50 font-mono bg-gray-50 p-10 border hover:bg-gray-300 hover:text-white duration-300 cursor-pointer mt-10 text-center"
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
              </button> */}

            <button
              className="transition ease-in-out delay-50 font-mono bg-gray-50 p-10 border hover:bg-gray-300 hover:text-white duration-300 mt-10"
              onClick={setGlobal}
            >
              SET GLOBAL TO BASE
            </button>

            <button
              className="transition ease-in-out delay-50 font-mono bg-gray-50 p-10 border hover:bg-gray-300 hover:text-white duration-300 mt-10"
              onClick={getGlobal}
            >
              GET GLOBAL FROM BASE
            </button>

            {isNotEmpty(globalList) && <button
              className="transition ease-in-out delay-50 font-mono bg-gray-50 p-10 border hover:bg-gray-300 hover:text-white duration-300 mt-10"
              onClick={onExportPDF}
            >
              SET PDF DOCUMENT
            </button>}

            {/* <button
              className="transition ease-in-out delay-50 font-mono bg-gray-50 p-10 border hover:bg-gray-300 hover:text-white duration-300 mt-10"
              onClick={() => getWineBottle({ variables: { id: 5814 } })}
            >
              GET WINE BOTTLE FROM BASE
            </button> */}

            {isNotEmpty(globalList) && (
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
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Image</th>
                  </tr>
                </thead>
                <tbody>
                  {mapIndexed((bottle, idx) => (
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
                      <td className="border px-4 py-2">{prop("description", bottle)}</td>
                      <td className="border px-4 py-2">
                        <img className="w-24" src={getFormattedImage(bottle.imageData)} alt={prop("name", bottle)} />
                      </td>
                    </tr>
                  ))(globalList)}
                </tbody>
              </table>
            )}
          </div>
        )}
    </div>
  );
};

export default AdminPage;
