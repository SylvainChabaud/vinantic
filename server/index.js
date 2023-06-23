const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const mergedSchema = require("./schema");
const { connectToDb } = require("./connectToDb");

const startServer = async () => {
  try {
    const connection = await connectToDb();

    const server = new ApolloServer({ schema: mergedSchema });

    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      context: () => ({ connection }),
    });
    console.log(`🚀 ApolloServer ready at ${url}`);
  } catch (err) {
    console.error("Error starting server:", err);
  }
};

startServer();
