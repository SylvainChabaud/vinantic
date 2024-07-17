import React from "react";
import ReactDOM from "react-dom/client";
import "./input.css";
import App from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import i18n from "./trad/i18n";

const client = new ApolloClient({
  uri: "https://tatiom-apis.fr/vinantic-api/graphql",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);