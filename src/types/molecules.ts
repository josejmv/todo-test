import { Dispatch, SetStateAction } from 'react'
import { TodoType } from 'types/data'

export type NavbarType = { setShow: Dispatch<SetStateAction<boolean>> }

export type SidebarType = {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}

export interface ModalType extends SidebarType {
  setTaskList?: Dispatch<SetStateAction<TodoType[]>>
  data?: TodoType
}

export interface TaskItemType extends TodoType {
  handleEdit?: Dispatch<SetStateAction<TodoType[]>>
}
