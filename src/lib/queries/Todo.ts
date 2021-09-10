import gql from 'graphql-tag'

export const GET_TODO_LIST = gql`
  query TodoList {
    todosList(orderBy: [id_ASC]) {
      items {
        id
      }
    }
  }
`
