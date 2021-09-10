// bootstrap components
import { Button } from 'react-bootstrap'
import { PlusLg } from 'react-bootstrap-icons'

// styles
import styles from 'styles/components/emptylist.module.scss'

// types
import { FC } from 'react'
import { EmptyListType } from 'types/atoms'

export const EmptyList: FC<EmptyListType> = ({ handleAdd }) => (
  <Button
    onClick={() => handleAdd(true)}
    variant='outline-primary'
    className={styles.container}
  >
    <h3 className={styles.text}>List is empty</h3>
    <PlusLg />
  </Button>
)
