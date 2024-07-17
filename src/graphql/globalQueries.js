import { gql } from '@apollo/client';

export const GET_GLOBAL = gql`
  query getGlobal($offset: Int, $limit: Int, $searchText: String, $sortBy: String) {
    getGlobal(offset: $offset, limit: $limit, searchText: $searchText, sortBy: $sortBy) {
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
      totalCount
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

export const GET_WINE_BOTTLE = gql`
  query getWineBottle($id: ID!) {
    getWineBottle(id: $id) {
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
