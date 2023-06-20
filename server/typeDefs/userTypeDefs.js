const { gql } = require("apollo-server");

const userTypeDefs = gql`
  type AuthResult {
    ok: Boolean!
    message: String!
  }

  type Query {
    getUser(username: String!, password: String!): AuthResult!
  }
`;

module.exports = userTypeDefs;
