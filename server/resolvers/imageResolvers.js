const { concat } = require("ramda");
const fs = require("fs");
const path = require("path");
const queryAsync = require("./utils");

const IMAGES_ROOT_PATH = "../../src/assets/images/";
const FOLDER_PATH = path.resolve(__dirname, "../../src/assets/images");

const imageResolvers = {
  Query: {
    getImages: async (_, __, { connection }) => {
      try {
        const query = "SELECT * FROM images";
        const images = await queryAsync(connection)(query);

        const newImages = images.map((image) => ({
          id: image.id.toString(),
          filename: image.filename,
          contentType: image.contentType,
          data: image.data.toString("base64"),
        }));

        return {
          ok: true,
          message: "Toutes les images ont été récupérées à partir de la base de donnée",
          data: newImages,
        };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    setImages: async (_, __, { connection }) => {
      try {
        const files = fs.readdirSync(FOLDER_PATH);
        const imageFiles = files.filter((file) => path.extname(file).toLowerCase() === ".jpg");

        await saveImages(imageFiles, connection);

        return {
          ok: true,
          message: "Toutes les images ont été ajoutées avec succès.",
        };
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteImages: async (_, __, { connection }) => {
      try {
        const query = "DELETE FROM images";
        await queryAsync(connection)(query);

        return {
          ok: true,
          message: "Toutes les images ont été supprimées avec succès.",
        };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

const saveImages = async (imageFiles, connection) => {
  try {
    const savePromises = imageFiles.map(async (image) => {
      const concatPath = concat(IMAGES_ROOT_PATH, image);
      const imagePath = path.resolve(__dirname, concatPath);

      const file = fs.readFileSync(imagePath);
      const [, extension] = imagePath.split(".");
      const contentType = `image/${extension}`;

      const query = "INSERT INTO images (filename, contentType, data) VALUES (?, ?, ?)";
      await queryAsync(connection)(query, [imagePath, contentType, file]);
    });

    await Promise.all(savePromises);
  } catch (err) {
    throw new Error("An error occurred while saving the images.");
  }
};

module.exports = imageResolvers;
