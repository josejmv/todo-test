import gql from 'graphql-tag'

export const GET_USER_BY_EMAIL = gql`
  query getUserByEmail($email: String) {
    user(email: $email) {
      firstName
      lastName
    }
  }
`
