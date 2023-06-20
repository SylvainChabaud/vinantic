import { gql } from '@apollo/client';

export const GET_IMAGES = gql`
  query getImages {
    getImages {
      ok
      message
      data {
        id
        filename
        contentType
        data
      }
    }
  }
`;

export const SET_IMAGES = gql`
  mutation setImages {
    setImages {
      ok
      message
    }
  }
`;

export const DELETE_IMAGES = gql`
  mutation deleteImages {
    deleteImages {
      ok
      message
    }
  }
`;