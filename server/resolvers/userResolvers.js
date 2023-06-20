const { connectToDb } = require("../connectToDb");
const bcrypt = require("bcrypt");
const queryAsync = require("./utils");

const userResolvers = {
  Query: {
    getUser: async (_, args, { connection }) => {
      try {
        const { username, password } = args;

        const query = "SELECT * FROM users WHERE username = ?";
        const results = await queryAsync(connection)(query, [username]);

        if (results.length === 0) {
          return {
            ok: false,
            message: "Utilisateur non trouvé.",
          };
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return {
            ok: false,
            message: "Mot de passe incorrect.",
          };
        }

        return {
          ok: true,
          message: "Connexion réussie.",
        };
      } catch (err) {
        console.error("Error checking user:", err);
        throw new Error("Erreur lors de la vérification de l'utilisateur.");
      }
    },
  },
};

module.exports = userResolvers;
