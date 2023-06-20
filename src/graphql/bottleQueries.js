import { gql } from '@apollo/client';

export const GET_BOTTLES = gql`
  query getBottles {
    getBottles {
      ok
      message
      data {
        id
        name
        price
        year
        quality
        bottleRef
        bottleType
        city
        quantity
        wineType
      }
    }
  }
`;

export const SET_BOTTLES = gql`
  mutation setBottles($bottles: [InputBottle!]!) {
    setBottles(bottles: $bottles) {
      ok
      message
    }
  }
`;

export const DELETE_BOTTLES = gql`
  mutation deleteBottles {
    deleteBottles {
      ok
      message
    }
  }
`;
