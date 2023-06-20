import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($username: String!, $password: String!) {
    getUser(username: $username, password: $password) {
      ok
      message
    }
  }
`;
