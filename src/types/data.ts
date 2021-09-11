export type TodoType = {
  id?: string
  task: string
  completed: boolean
  category?: string
  limitDate?: Date | string
}

export type TodoListType = {
  todosList: { items: TodoType[] }
}
