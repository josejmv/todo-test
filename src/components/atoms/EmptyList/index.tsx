// bootstrap components
import { Button } from 'react-bootstrap'
import { PlusLg } from 'react-bootstrap-icons'

// styles
import styles from 'styles/components/emptylist.module.scss'

// types
import { FC } from 'react'
import { EmptyListType } from 'types/atoms'

/**
 * @param handleAdd set true to create task modal
 */
export const EmptyList: FC<EmptyListType> = ({ handleAdd }) => (
  <Button
    onClick={() => handleAdd(true)}
    variant='outline-light'
    className={styles.container}
  >
    <h3 className={styles.text}>List is empty</h3>
    <PlusLg />
  </Button>
)
