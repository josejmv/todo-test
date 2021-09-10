import { Dispatch, SetStateAction } from 'react'

export type NavbarType = { setShow: Dispatch<SetStateAction<boolean>> }

export type SidebarType = {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}
