import { Dispatch, SetStateAction } from 'react'

export type EmptyListType = {
  empty: boolean
  handleAdd: Dispatch<SetStateAction<boolean>>
}
