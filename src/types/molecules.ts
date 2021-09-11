import { Dispatch, SetStateAction } from 'react'
import { TodoType } from 'types/data'

export type LayoutType = {
  setTaskList?: Dispatch<SetStateAction<TodoType[]>>
}

export type NavbarType = { setShow: Dispatch<SetStateAction<boolean>> }

export interface SidebarType extends LayoutType {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}

export interface ModalType extends SidebarType {
  data?: TodoType
}

export interface TaskItemType extends TodoType {
  handleEdit?: Dispatch<SetStateAction<TodoType[]>>
}
