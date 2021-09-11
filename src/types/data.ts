export type TodoType = {
  id?: string
  task: string
  completed: boolean
  limitDate?: Date | string
  Todos?: TodoType
  SubTasks?: TodoType[]
}

export type TodoListType = {
  todosList: { items: TodoType[] }
}
