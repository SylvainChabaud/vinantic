import { jsPDF } from "jspdf";
import { sort, ascend, prop, pipe, groupBy, map, toPairs, fromPairs, reduce, reduceBy, head, last } from "ramda";

export const extractImageName = (filename) => {
  const nameWithExtension = filename.split("\\").pop(); // Récupère le nom de fichier avec l'extension
  const nameWithoutExtension = nameWithExtension.split(".").slice(0, -1).join("."); // Supprime l'extension du nom de fichier
  return nameWithoutExtension;
};

export const mergeWineInfosByRef = ({ winesData, imagesData }) =>
  winesData.map((wine) => {
    const matchingImage = imagesData.find((image) => image.ref.toLowerCase() === wine.bottleRef.toLowerCase());
    if (matchingImage) {
      return {
        ...wine,
        data: matchingImage.data,
        contentType: matchingImage.contentType,
      };
    }

    return {
      ...wine,
      data: "",
    };
  });

export const filterAndSortWineList = ({ wineList, setFilteredWinesList, searchText, sortBy }) => {
  // Filtrer les bouteilles de vin en fonction du texte de recherche
  let filteredList = wineList.filter((wine) => wine.name.toLowerCase().includes(searchText.toLowerCase()));

  // Trier les bouteilles de vin en fonction de l'option de tri sélectionnée
  if (sortBy === "year") {
    filteredList = filteredList.sort((a, b) => a.year - b.year);
  } else if (sortBy === "price") {
    filteredList = filteredList.sort((a, b) => a.price - b.price);
  } else if (sortBy === "name") {
    filteredList = filteredList.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Mettre à jour la liste des bouteilles de vin filtrées et triées
  setFilteredWinesList(filteredList);
};

export const exportVinanticPdf = (winesList) => {
  /* MILLESIMES SORTED and GROUPED BY YEAR */
  const sortedWinesByYear = groupWinesByYear(winesList);
  const firstMill = prop('year', head(sortedWinesByYear));
  const lastMill = prop('year', last(sortedWinesByYear));

  if (winesList.length !== 0) {
    /* GET NAVIGATOR WIDTH */
    const HTML_Width = 1000;

    /* SET PDF SIZE */
    const MARGIN = 40;
    var PDF_Width = HTML_Width;
    var PDF_Height = PDF_Width * 1.414;

    /* CREATE MAIN PDF DIV */
    const globalDivPdf = document.createElement("div");
    globalDivPdf.style.cssText = "display: flex; flex-direction: column";
    globalDivPdf.style.marginLeft = `${MARGIN}px`;
    globalDivPdf.style.width = `${HTML_Width - MARGIN * 2}px`;

    /* CREATE HEADER */
    const header = document.createElement("div");
    header.style.cssText = "display: flex; flex-direction: column; text-align: center; justify-content: center; letter-spacing: 5px";
    header.style.width = HTML_Width - MARGIN * 2 + "px";
    header.style.height = PDF_Height + "px";

    /* CREATE TITLE */
    const pdfTitre = document.createElement("div");
    pdfTitre.style.fontSize = "70px";
    pdfTitre.style.fontWeight = "bold";
    pdfTitre.textContent = "VINANTIC";
    header.appendChild(pdfTitre);

    /* CREATE SUB-TITLE */
    const pdfSousTitre = document.createElement("div");
    pdfTitre.style.fontSize = "50px";
    pdfSousTitre.textContent = `Millésimes de ${firstMill} à ${lastMill}`;
    header.appendChild(pdfSousTitre);

    /* ADD HEADER TO MAIN PDF DIV */
    globalDivPdf.appendChild(header);

    /* CREATE ALL CARDS */
    sortedWinesByYear.forEach((millesimeSorted) => {
      const { wines } = millesimeSorted;
      let compt = 1;

      /* CREATE YEAR PAGE */
      const yearPage = document.createElement("div");
      yearPage.style.height = `${PDF_Height}px`;
      yearPage.style.display = "flex";
      yearPage.style.justifyContent = "center";
      yearPage.style.alignItems = "center";
      yearPage.style.fontSize = "30px";
      yearPage.style.fontWeight = "bold";
      yearPage.style.letterSpacing = "10px";
      yearPage.style.color = "rgba(14, 116, 178, 0.8)";
      yearPage.textContent = `${"MILLESIMES DE " + millesimeSorted.year}`;
      globalDivPdf.appendChild(yearPage);

      wines.forEach((millesime, index) => {
        /* CREATE CARD */
        const cardMainDiv = document.createElement("div");
        cardMainDiv.style.height = "250px";
        cardMainDiv.style.display = "flex";
        cardMainDiv.style.flexDirection = "row";
        cardMainDiv.style.backgroundColor = "rgba(245,245,244,0.2)";
        cardMainDiv.style.borderRadius = "10px";
        cardMainDiv.style.padding = "25px";
        cardMainDiv.style.marginTop = "20px";
        cardMainDiv.style.borderBottom = "2px solid black";
        cardMainDiv.setAttribute("key", "liste-" + index);

        /* CREATE CARD CONTENT */
        const cardLeftContent = document.createElement("div");
        cardLeftContent.style.flexGrow = "1";
        cardLeftContent.style.display = "flex";
        cardLeftContent.style.flexDirection = "column";
        cardLeftContent.style.justifyContent = "center";
        cardLeftContent.style.alignItems = "center";
        cardMainDiv.appendChild(cardLeftContent);

        /* CREATE CARD : LEFT CONTENT */
        let cardContent = document.createElement("div");
        cardContent.style.margin = "0";
        cardContent.style.fontSize = "25px";
        cardContent.textContent = `${millesime.name + " - " + millesime.city}`;
        cardLeftContent.appendChild(cardContent);

        cardContent = document.createElement("div");
        cardContent.style.margin = "0";
        cardContent.style.fontWeight = "bold";
        cardContent.textContent = `${millesime.year}`;
        cardLeftContent.appendChild(cardContent);

        cardContent = document.createElement("div");
        cardContent.style.marginTop = "20px";
        cardContent.textContent = `${millesime.wineType + " - " + millesime.bottleType}`;
        cardLeftContent.appendChild(cardContent);

        cardContent = document.createElement("div");
        cardContent.style.margin = "0";
        cardContent.textContent = `${millesime.price + " €"}`;
        cardLeftContent.appendChild(cardContent);

        /* CREATE CARD : RIGHT IMAGE CONTENT */
        const cardImage = document.createElement("img");
        cardImage.style.display = "block";
        cardImage.style.height = "200px";
        cardImage.style.borderRadius = "10px";
        cardImage.src = `data:${millesime.contentType};base64,${millesime.data}`;
        cardMainDiv.appendChild(cardImage);

        /* ADD TO MAIN DIV */
        globalDivPdf.appendChild(cardMainDiv);

        /* GET CARD DIV HEIGHT */
        const pxToNb = (pxValue) => parseInt(pxValue.substring(0, pxValue.indexOf("px")));
        const DIV_HEIGHT = pxToNb(cardMainDiv.style.height) + pxToNb(cardMainDiv.style.marginTop);

        /* END PAGE MANAGER */
        if (wines.length === index + 1 || compt * DIV_HEIGHT >= PDF_Height - DIV_HEIGHT) {
          // SAUT DE PAGE
          const division = document.createElement("div");
          division.style.height = `${PDF_Height - compt * DIV_HEIGHT}px`;
          globalDivPdf.appendChild(division);
          compt = 1;
        } else ++compt;
      });
    });

    /* CREATE PDF HANDLE */
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: [PDF_Width, PDF_Height],
    });

    /* ADD AND SAVE MAIN DIV TO PDF SPLIT PAGE OPTION (PDF_Height) */
    pdf.html(globalDivPdf, { pagesplit: true }).then(() => {
      pdf.save("Catalogue de vins - Vinantic.pdf");
    });
  }
};

const groupWinesByYear = (wines) => {
  const groupedWines = wines.reduce((result, wine) => {
    const year = Math.floor(wine.year);
    if (!result[year]) {
      result[year] = [];
    }
    result[year].push(wine);
    return result;
  }, {});

  const sortedYears = Object.keys(groupedWines).sort();

  const sortedWines = sortedYears.reduce((result, year) => {
    const winesOfYear = groupedWines[year];
    result.push({ year: Number(year), wines: winesOfYear });
    return result;
  }, []);

  return sortedWines;
};
