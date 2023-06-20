import { equals, find, head, last, prop, propOr, split, toLower } from "ramda";
import { Buffer } from "buffer";

export const transformBottles = (winesList) => {
  const filteredWinesList = [];

  winesList.forEach((obj) => {
    if (obj["Photo"] === "OK_main") {
      const bottleRef = obj["Référence"];
      const refNumber = bottleRef.replace("Ref_", "");
      const newImageRef = `OK_${refNumber}`;

      let count = 1;
      winesList.forEach((obj1) => {
        if (obj1["Photo"] === newImageRef) {
          count = count + 1;
        }
      });

      filteredWinesList.push({ ...obj, Quantity: count });
    }
  });

  return filteredWinesList;
};

export const getImageSource = ({ bottle, imagesList }) => {
  const imageRef = toLower(prop("bottleRef", bottle));
  const foundedImage = find((image) => {
    const imagePath = propOr("", "filename", image);
    const splittedName = head(split(".", last(split("\\", imagePath))));
    if (equals(splittedName, imageRef)) return image;
  })(imagesList);

  return foundedImage && `data:${foundedImage.contentType};base64,${Buffer.from(foundedImage.data, "base64").toString("base64")}`;
};
