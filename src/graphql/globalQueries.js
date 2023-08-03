import { gql } from '@apollo/client';

export const SET_GLOBAL = gql`
  mutation setGlobal {
    setGlobal {
      ok
      message
    }
  }
`;
