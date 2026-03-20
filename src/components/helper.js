import { jsPDF } from "jspdf";
import { prop, head, last } from "ramda";
import { getFormattedImage } from "../pages/helper";
import logoSrc from '../assets/logo-vinantic.webp';
import coverSrc from '../assets/coverPage.png';

export const scrollToTop = () => {
  const element = document.getElementById("wines-list");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  } else {
    console.error("Element with id 'wineList' not found.");
  }
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

export const exportVinanticPdf = ({ winesList, translate: t }) => {
  /* MILLESIMES SORTED and GROUPED BY YEAR */
  const sortedWinesByYear = groupWinesByYear(winesList);
  const firstMill = prop("year", head(sortedWinesByYear));
  const lastMill = prop("year", last(sortedWinesByYear));

  if (winesList.length !== 0) {
    /* GET NAVIGATOR WIDTH */
    const HTML_Width = 1000;

    /* SET PDF SIZE */
    const MARGIN = 0;
    var PDF_Width = HTML_Width;
    var PDF_Height = PDF_Width * 1.414;

    /* CREATE PAGE COUNTER */
    let pageCounter = 1;
    let pageInfos = [];

    /* CREATE MAIN PDF DIV */
    const globalDivPdf = document.createElement("div");
    // globalDivPdf.className = 'vinantic-font';
    globalDivPdf.style.cssText = "display: flex; flex-direction: column; background-color: #F1F1F1;";
    globalDivPdf.style.marginLeft = `${MARGIN}px`;
    globalDivPdf.style.width = `${PDF_Width - MARGIN * 2}px`;

    /* INSERT COVER PAGE (placeholder - sera ajoutee via addImage) */
    const coverPage = document.createElement("div");
    coverPage.style.cssText = "display: flex; flex-direction: column; text-align: center; justify-content: center";
    coverPage.style.height = PDF_Height + "px";
    globalDivPdf.appendChild(coverPage);

    /* INSERT BLANCK PAGE */
    const blankPage = document.createElement("div");
    blankPage.style.cssText = "display: flex; flex-direction: column; text-align: center; justify-content: center";
    blankPage.style.height = PDF_Height + "px";
    globalDivPdf.appendChild(blankPage);

    /* CREATE HEADER */
    const firstPage = document.createElement("div");
    firstPage.style.cssText = "display: flex; flex-direction: column; text-align: center; justify-content: center";
    firstPage.style.height = PDF_Height + "px";

    const pdfTitre = document.createElement("div");
    pdfTitre.style.margin = '0 auto';
    pdfTitre.style.fontSize = "50px";
    pdfTitre.style.fontWeight = "bold";
    pdfTitre.style.color = "#800020";
    pdfTitre.className = 'vinantic-font';
    pdfTitre.style.letterSpacing = "5px";
    pdfTitre.textContent = "VINANTIC";
    firstPage.appendChild(pdfTitre);

    /* CREATE SUB-TITLE */
    const pdfSousTitre = document.createElement("div");
    pdfSousTitre.style.padding = '15px 0';
    pdfSousTitre.style.margin = '0 auto';
    pdfSousTitre.style.borderBottom = '1px solid #333';
    pdfSousTitre.style.letterSpacing = "3px";
    pdfSousTitre.style.fontSize = "17px";
    pdfSousTitre.style.color = "#333";
    pdfSousTitre.className = 'vinantic-font';
    pdfSousTitre.innerHTML = `<p>Millésimes de <strong>${firstMill}</strong> à <strong>${lastMill}</strong></p>`;
    firstPage.appendChild(pdfSousTitre);

    /* CREATE LOGO */
    const logoDiv = document.createElement("div");
    logoDiv.style.display = 'flex';
    logoDiv.style.justifyContent = "center";
    logoDiv.style.alignItems = "center";
    logoDiv.style.marginTop = "70px";
    const logoImg = document.createElement("img");
    logoImg.src = logoSrc;
    logoImg.style.borderRadius = '50%';
    logoImg.style.height = '200px';
    logoDiv.appendChild(logoImg);
    firstPage.appendChild(logoDiv);

    /* CREATE SITE LINK */
    const siteLinkDiv = document.createElement("div");
    siteLinkDiv.style.padding = '15px 0';
    siteLinkDiv.style.margin = '0 auto';
    siteLinkDiv.style.marginBottom = "70px";
    siteLinkDiv.style.letterSpacing = "5px";
    siteLinkDiv.style.fontSize = "17px";
    siteLinkDiv.style.color = "#333";
    siteLinkDiv.style.fontWeight = "bold";
    siteLinkDiv.className = 'vinantic-font';
    siteLinkDiv.innerHTML = `<p>www.vinantic.fr</p>`;
    firstPage.appendChild(siteLinkDiv);

    /* CREATE DESCRIPTION VINANTIC */
    const descriptionDiv = document.createElement("div");
    descriptionDiv.style.display = 'flex';
    descriptionDiv.style.textAlign = "justify";
    descriptionDiv.style.fontSize = "20px";
    descriptionDiv.style.color = "#333";
    descriptionDiv.style.width = "50vw";
    descriptionDiv.style.margin = "0 auto";
    descriptionDiv.innerHTML = `<div>
        <p>${t("description.head")}</p>
        <p style="margin-top: 20px;">${t("description.content_1")}</p>
        <p style="margin-top: 20px;">${t("description.content_2")}</p>
      </div>`;
    firstPage.appendChild(descriptionDiv);

    /* ADD HEADER TO MAIN PDF DIV */
    globalDivPdf.appendChild(firstPage);

    /* INSERT BLANCK PAGE */
    const _blankPage = document.createElement("div");
    _blankPage.style.cssText = "display: flex; flex-direction: column; text-align: center; justify-content: center";
    _blankPage.style.height = PDF_Height + "px";
    globalDivPdf.appendChild(_blankPage);

    /* CREATE ALL CARDS */
    sortedWinesByYear.forEach((millesimeSorted) => {
      const { wines } = millesimeSorted;
      let compt = 1;
      pageInfos.push({ page: pageCounter, year: millesimeSorted.year })

      /* CREATE YEAR DIV */
      const yearDiv = document.createElement("div");
      yearDiv.className = 'vinantic-font';
      yearDiv.style.fontSize = "33px";
      yearDiv.style.fontWeight = "bold";
      yearDiv.style.letterSpacing = "3px";
      yearDiv.style.textAlign = 'center';
      yearDiv.style.paddingBottom = '25px';
      yearDiv.style.borderBottom = '1px solid #333';
      yearDiv.innerHTML = `<div>
        <p style="color: #333;">Millésimes de</p>
        <p style="color: #800020;">${millesimeSorted.year}</p>
      </div>`;

      /* CREATE PAGINATION PAGE CONTAINER */
      const paginationDiv = document.createElement("div");
      paginationDiv.style.display = 'flex';
      paginationDiv.style.justifyContent = "center";
      paginationDiv.style.alignItems = "center";
      paginationDiv.style.position = 'absolute';
      paginationDiv.style.margin = "0";
      paginationDiv.style.fontSize = "20px";
      paginationDiv.style.textAlign = "center";
      paginationDiv.style.color = "#333";
      paginationDiv.style.bottom = '50px';
      paginationDiv.style.right = '50px';
      paginationDiv.textContent = pageCounter;

      /* CREATE YEAR PAGE CONTAINER */
      const yearPage = document.createElement("div");
      yearPage.style.position = 'relative';
      yearPage.style.height = `${PDF_Height}px`;
      yearPage.style.display = "flex";
      yearPage.style.justifyContent = "center";
      yearPage.style.alignItems = "center";

      /* ADD CONTENT AND PAGINATION IN YEAR PAGE */
      yearPage.appendChild(yearDiv);
      yearPage.appendChild(paginationDiv);

      /* ADD YEAR PAGE IN GLOBAL DIV */
      globalDivPdf.appendChild(yearPage);

      wines.forEach((millesime, index) => {
        pageCounter++;

        /* *************** */
        /* CREATE CARD TOP */
        /* *************** */
        const cardTopMainDiv = document.createElement("div");
        cardTopMainDiv.style.display = "flex";
        cardTopMainDiv.style.flexDirection = "row";
        cardTopMainDiv.style.justifyContent = "center";
        cardTopMainDiv.style.gap = "50px";
        cardTopMainDiv.style.alignItems = "center";

        /* CREATE CARD CONTENT */
        const cardLeftContent = document.createElement("div");
        cardLeftContent.style.width = "350px";
        cardLeftContent.style.display = "flex";
        cardLeftContent.style.flexDirection = "column";
        cardLeftContent.style.justifyContent = "center";
        cardLeftContent.style.alignItems = "center";
        cardLeftContent.style.color = "#333";

        /* CREATE CARD : LEFT CONTENT */
        let cardContent = document.createElement("div");
        cardContent.style.margin = "0";
        cardContent.style.fontSize = "25px";
        cardContent.style.textAlign = "center";
        const innerHtml = millesime.name && millesime.city
          ? '<strong>' + millesime.name + '</strong><br>' +
          '<span style="font-size: smaller;">' + millesime.city + '</span>'
          : millesime.name ?? millesime.city ?? ''
        cardContent.innerHTML = innerHtml;
        cardLeftContent.appendChild(cardContent);

        cardContent = document.createElement("div");
        cardContent.style.marginTop = "15px";
        cardContent.style.fontWeight = "bold";
        cardContent.textContent = millesime.year;
        cardLeftContent.appendChild(cardContent);

        cardContent = document.createElement("div");
        cardContent.style.marginTop = "20px";
        cardContent.textContent = `${millesime.wineType + " - " + millesime.bottleType}`;
        cardLeftContent.appendChild(cardContent);

        cardContent = document.createElement("div");
        cardContent.style.margin = "0";
        cardContent.style.fontSize = "15px";
        cardContent.style.fontWeight = "bold";
        cardContent.textContent = 'ref ' + millesime.id;
        cardLeftContent.appendChild(cardContent);

        /* ADD cardLeftContent */
        cardTopMainDiv.appendChild(cardLeftContent);

        /* CREATE CARD : RIGHT IMAGE CONTENT */
        const cardImage = document.createElement("img");
        cardImage.style.display = "block";
        cardImage.style.height = "550px";
        cardImage.style.borderRadius = "10px";
        cardImage.src = getFormattedImage(millesime.imageData);
        cardTopMainDiv.appendChild(cardImage);

        /* ****************** */
        /* CREATE CARD BOTTOM */
        /* ****************** */
        const cardBottomMainDiv = document.createElement("div");
        cardBottomMainDiv.style.display = "flex";
        cardBottomMainDiv.style.textAlign = 'justify';
        cardBottomMainDiv.style.alignItems = "center";
        cardBottomMainDiv.style.color = "#333";
        cardBottomMainDiv.style.fontSize = "20px";
        cardBottomMainDiv.style.paddingBottom = "20px";
        cardBottomMainDiv.style.paddingLeft = "35px";
        cardBottomMainDiv.style.borderLeft = "1px solid #333";
        cardBottomMainDiv.textContent = millesime.description;

        /* **************** */
        /* CREATE MAIN CARD */
        /* **************** */
        const cardMainDiv = document.createElement("div");
        cardMainDiv.style.position = 'relative';
        cardMainDiv.style.height = `${PDF_Height}px`;
        cardMainDiv.style.display = "flex";
        cardMainDiv.style.flexDirection = "column";
        cardMainDiv.style.justifyContent = "center";
        cardMainDiv.style.padding = "0 100px";
        cardMainDiv.style.gap = "120px";
        cardMainDiv.style.color = "#333";
        cardMainDiv.setAttribute("key", "liste-" + index);
        cardMainDiv.appendChild(cardTopMainDiv);
        cardMainDiv.appendChild(cardBottomMainDiv);

        /* ADD LOGO */
        const logoDiv = document.createElement("div");
        logoDiv.style.display = 'flex';
        logoDiv.style.justifyContent = "center";
        logoDiv.style.alignItems = "center";
        logoDiv.style.gap = "15px";
        logoDiv.style.position = 'absolute';
        logoDiv.style.top = '70px';
        logoDiv.style.left = '70px';

        const logoImg = document.createElement("img");
        logoImg.src = logoSrc;
        logoImg.style.borderRadius = '50%';
        logoImg.style.height = '80px';
        logoDiv.appendChild(logoImg);

        const vinanticDiv = document.createElement("div");
        vinanticDiv.style.display = 'flex';
        vinanticDiv.style.justifyContent = "center";
        vinanticDiv.style.alignItems = "center";
        vinanticDiv.style.fontSize = "21px";
        vinanticDiv.style.fontWeight = "100";
        vinanticDiv.style.color = "#800020";
        vinanticDiv.style.paddingBottom = "25px";
        vinanticDiv.className = 'vinantic-font';
        vinanticDiv.textContent = 'Vinantic';

        logoDiv.appendChild(vinanticDiv);

        cardMainDiv.appendChild(logoDiv);

        /* ADD PAGINATION */
        const paginationDiv = document.createElement("div");
        paginationDiv.style.display = 'flex';
        paginationDiv.style.justifyContent = "center";
        paginationDiv.style.alignItems = "center";
        paginationDiv.style.position = 'absolute';
        paginationDiv.style.margin = "0";
        paginationDiv.style.fontSize = "20px";
        paginationDiv.style.textAlign = "center";
        paginationDiv.style.color = "#333";
        paginationDiv.style.bottom = '50px';
        paginationDiv.style.right = '50px';
        paginationDiv.textContent = pageCounter;
        cardMainDiv.appendChild(paginationDiv);

        /* *************** */
        /* ADD TO MAIN DIV */
        /* *************** */
        globalDivPdf.appendChild(cardMainDiv);

        /* GET CARD DIV HEIGHT */
        const pxToNb = (pxValue) => parseInt(pxValue.substring(0, pxValue.indexOf("px")));
        const DIV_HEIGHT = pxToNb(cardMainDiv.style.height);

        /* END PAGE MANAGER */
        if (wines.length === index + 1 || compt * DIV_HEIGHT >= PDF_Height - DIV_HEIGHT) {
          // SAUT DE PAGE
          const division = document.createElement("div");
          division.style.height = `${PDF_Height - compt * DIV_HEIGHT}px`;
          globalDivPdf.appendChild(division);
          compt = 1;
          pageCounter++;
        } else ++compt;
      });
    });

    /* ************** */
    /* CREATE SUMMARY */
    /* ************** */
    const summaryDiv = document.createElement("div");
    summaryDiv.style.height = `${PDF_Height}px`;
    summaryDiv.style.display = 'flex';
    summaryDiv.style.flexDirection = 'column';
    summaryDiv.style.alignItems = "center";
    summaryDiv.style.padding = "20px";
    summaryDiv.style.overflow = "hidden";

    // Ajouter un titre au sommaire
    const title = document.createElement("h2");

    title.style.margin = "50px 0 80px 0";
    title.style.fontSize = "35px";
    title.style.fontWeight = "bold";
    title.style.textAlign = "center";
    title.style.color = "#800020";
    title.className = 'vinantic-font';
    title.textContent = "Sommaire";
    summaryDiv.appendChild(title);

    // Créez un conteneur pour les entrées
    const entriesContainer = document.createElement("div");
    entriesContainer.style.display = 'flex';
    entriesContainer.style.flexWrap = 'wrap';
    entriesContainer.style.justifyContent = 'space-around';
    entriesContainer.style.overflowY = 'auto';

    // Ajouter les éléments du sommaire
    pageInfos.forEach(item => {
      const entry = document.createElement("div");
      entry.className = 'summary-entry';
      entry.style.display = 'flex';
      entry.style.justifyContent = 'space-between';
      entry.style.width = '35%';
      entry.style.borderBottom = '1px solid #ccc';
      entry.style.paddingBottom = '12px';
      entry.style.marginBottom = '7px';
      entry.style.fontSize = '15px';
      entry.style.color = "#333";

      const pageSpan = document.createElement("span");
      pageSpan.className = 'page';
      pageSpan.innerHTML = `Page &nbsp; <strong>${item.page}</strong>`;

      const yearSpan = document.createElement("span");
      yearSpan.className = 'year';
      yearSpan.innerHTML = `Année &nbsp; <strong>${item.year}</strong>`;
      yearSpan.style.textAlign = 'right';

      entry.appendChild(pageSpan);
      entry.appendChild(yearSpan);

      entriesContainer.appendChild(entry);
    });

    summaryDiv.appendChild(entriesContainer);

    /* GET ALL DIVS AND ADD SUMMARY */
    let childDivs = globalDivPdf.children;
    globalDivPdf.insertBefore(summaryDiv, childDivs[4]);

    /* CREATE PDF HANDLE */
    // if (globalDivPdf) {
    //   html2pdf().from(globalDivPdf).set({
    //     margin: MARGIN,
    //     filename: 'Catalogue_de_vins_Vinantic.pdf',
    //     html2canvas: {
    //       scale: 3,
    //       useCORS: true,
    //       // width: PDF_Width,
    //     },
    //     jsPDF: {
    //       orientation: 'portrait',
    //       unit: 'pt',
    //       format: [PDF_Width, PDF_Height],
    //     }
    //   }).save();
    // } else {
    //   console.error("Element not found");
    // }

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: [PDF_Width, PDF_Height],
    });

    console.info('pageInfos', { pageInfos, globalDivPdf, childDivs })

    /* ADD AND SAVE MAIN DIV TO PDF SPLIT PAGE OPTION (PDF_Height) */
    pdf.html(globalDivPdf, { pagesplit: true }).then(() => {
      // Ajouter la cover sur la premiere page via addImage
      const coverImg = new Image();
      coverImg.src = coverSrc;
      pdf.setPage(1);
      pdf.addImage(coverImg, 'PNG', 0, 0, PDF_Width, PDF_Height);
      pdf.save("Catalogue_de_vins_Vinantic.pdf");
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
