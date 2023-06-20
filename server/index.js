const { ApolloServer } = require("apollo-server");
const mergedSchema = require("./schema");
const { connectToDb } = require("./connectToDb");

const startServer = async () => {
  try {
    const connection = await connectToDb();

    const server = new ApolloServer({
      schema: mergedSchema,
      context: { connection },
    });

    const { url } = await server.listen();
    console.log(`🚀 ApolloServer ready at ${url}`);
  } catch (err) {
    console.error("Error starting server:", err);
  }
};

startServer();
