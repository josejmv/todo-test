// main tools
import { useState } from 'react'
import { useMutation } from '@apollo/client'

// lib
import { DELETE_TASK } from 'lib/queries/Todo'

// bootstrap components
import { Modal, Button, Spinner } from 'react-bootstrap'

// styles
import styles from 'styles/components/taskmodal.module.scss'

// types
import { FC } from 'react'
import { ModalType } from 'types/molecules'

/**
 * Delete task handler
 */
export const DeleteTaskModal: FC<ModalType> = ({
  show,
  setShow,
  setTaskList,
  data,
}) => {
  const [loading, setLoading] = useState(false)

  /**
   * mutation for delete task
   */
  const [deleteTask, res] = useMutation(DELETE_TASK, {
    variables: { id: data.id },
  })

  const handleClose = () => setShow(false)

  /**
   * send confirm action to 8base for
   * delete task
   */
  const handleDelete = async () => {
    try {
      setLoading(true)
      const response = await deleteTask()
      setTaskList((prev) => [...prev.filter((task) => task.id !== data.id)])
      setLoading(false)
      setShow(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      centered
      className={styles.container}
      show={show}
      onHide={handleClose}
    >
      <Modal.Header className={styles.header}>
        <Modal.Title>Delete Task</Modal.Title>
      </Modal.Header>
      <Modal.Body className='text-center'>
        {loading ? (
          <Spinner animation='grow' variant='dark' />
        ) : (
          <>
            <h3>Are you sure?</h3>
            <h5>This action is irreversible</h5>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-dark' onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleDelete} type='submit' variant='dark'>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
