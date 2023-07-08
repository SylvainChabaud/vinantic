const { connectToDb } = require("../connectToDb");
const queryAsync = require("./utils");

const bottleResolvers = {
  Query: {
    getBottles: async () => {
      let connection;
      try {
        connection = await connectToDb();
        const query = "SELECT * FROM bottles";
        const results = await queryAsync(connection)(query);

        return {
          ok: true,
          message: "Toutes les infos ont été récupérées à partir de la base de données.",
          data: results,
        };
      } catch (err) {
        console.error("Error fetching bottles:", err);
        return {
          ok: false,
          message: "Erreur lors de la récupération des bouteilles.",
        };
      } finally {
        if (connection) {
          connection.end();
          console.log("🚀 MySQL disconnected");
        }
      }
    },
  },
  Mutation: {
    setBottles: async (_, args) => {
      let connection;
      try {
        connection = await connectToDb();
        const { bottles } = args;
        for (let i = 0; i < bottles.length; i++) {
          const bottle = bottles[i];
          const query =
            "INSERT INTO bottles (name, price, year, quality, bottleRef, bottleType, city, quantity, wineType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
          const values = [
            bottle.name,
            bottle.price,
            bottle.year,
            bottle.quality,
            bottle.bottleRef,
            bottle.bottleType,
            bottle.city,
            bottle.quantity,
            bottle.wineType,
          ];
          await queryAsync(connection)(query, values);
        }

        return {
          ok: true,
          message: "Toutes les bouteilles ont été ajoutées avec succès.",
        };
      } catch (err) {
        console.error("Error adding bottle:", err);
        return {
          ok: false,
          message: "Erreur lors de l'ajout des bouteilles.",
        };
      } finally {
        if (connection) {
          connection.end();
          console.log("🚀 MySQL disconnected");
        }
      }
    },
    deleteBottles: async () => {
      let connection;
      try {
        connection = await connectToDb();
        const query = "DELETE FROM bottles";
        await queryAsync(connection)(query);

        return {
          ok: true,
          message: "Toutes les bouteilles ont été supprimées avec succès.",
        };
      } catch (err) {
        console.error("Error deleting bottles:", err);
        return {
          ok: false,
          message: "Erreur lors de la suppression des bouteilles.",
        };
      } finally {
        if (connection) {
          connection.end();
          console.log("🚀 MySQL disconnected");
        }
      }
    },
  },
};

module.exports = bottleResolvers;
