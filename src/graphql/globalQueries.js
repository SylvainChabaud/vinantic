import { gql } from '@apollo/client';

export const GET_GLOBAL = gql`
  query getGlobal {
    getGlobal {
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
        imageData
      }
    }
  }
`;

export const SET_GLOBAL = gql`
  mutation setGlobal {
    setGlobal {
      ok
      message
    }
  }
`;

export const DELETE_GLOBAL = gql`
  mutation deleteGlobal {
    deleteGlobal {
      ok
      message
    }
  }
`;
