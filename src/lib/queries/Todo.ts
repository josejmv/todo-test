import gql from 'graphql-tag'

export const GET_TODO_LIST = gql`
  query TodoList {
    todosList(orderBy: [id_ASC]) {
      items {
        id
        task
        completed
        limitDate
      }
    }
  }
`

export const CREATE_TASK = gql`
  mutation CreateTask($data: TodoCreateInput!) {
    todoCreate(data: $data) {
      id
      task
      completed
      limitDate
    }
  }
`

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $task: String!, $limitDate: String) {
    todoUpdate(
      filter: { id: $id }
      data: { task: $task, limitDate: $limitDate }
    ) {
      id
      task
      completed
      limitDate
    }
  }
`

export const COMPLETE_TASK = gql`
  mutation UpdateTask($id: ID!, $completed: Boolean) {
    todoUpdate(filter: { id: $id }, data: { completed: $completed }) {
      id
      task
      completed
      limitDate
    }
  }
`

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    todoDelete(filter: { id: $id }) {
      success
    }
  }
`
