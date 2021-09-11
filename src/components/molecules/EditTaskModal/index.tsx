// main tools
import { useState } from 'react'
import { useMutation } from '@apollo/client'

// lib
import { UPDATE_TASK } from 'lib/queries/Todo'

// bootstrap components
import { Modal, Button, Form } from 'react-bootstrap'

// prime components
import { Calendar, CalendarChangeParams } from 'primereact/calendar'

// styles
import styles from 'styles/components/taskmodal.module.scss'

// types
import { FC } from 'react'
import { ModalType } from 'types/molecules'
import { TodoType } from 'types/data'
import { ChangeType, SubmitType } from 'types/utils'

/**
 * Edit task handler
 */
export const EditTaskModal: FC<ModalType> = ({
  show,
  data,
  setShow,
  setTaskList,
}) => {
  const [validated, setValidated] = useState(false)
  const [task, setTask] = useState<TodoType>({ ...data })

  /**
   * format date value to Date type because the 8bage
   * fetch returns this value in as a string type
   */
  const getDate = (date: string): Date => {
    const formatedDate = typeof date === 'string' ? new Date(date) : date
    return formatedDate
  }

  /**
   * update task mutation
   */
  const [updateTask, res] = useMutation(UPDATE_TASK, {
    variables: { id: data.id, task: task.task, limitDate: task.limitDate },
  })

  const handleClose = () => setShow(false)

  /**
   * disabled validated and change the task data
   */
  const handleChange = (ev: ChangeType & CalendarChangeParams) => {
    validated && setValidated(false)
    setTask((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }))
  }

  /**
   * verify if the fields are completed and send action
   * to update the data
   */
  const handleSubmit = async (ev: SubmitType) => {
    ev.preventDefault()
    const form = ev.currentTarget
    if (!form.checkValidity()) !validated && setValidated(true)
    else {
      try {
        const response = await updateTask()

        setTaskList((prev) => [
          ...prev.filter((item) => item.id !== data.id),
          { ...response.data.todoUpdate },
        ])
        setShow(false)
      } catch (error) {
        console.log('ERROR', error)
      }
    }
  }

  return (
    <Modal
      centered
      className={styles.container}
      show={show}
      onHide={handleClose}
    >
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header className={styles.header}>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mt-3'>
            <Form.Label>Task</Form.Label>
            <Form.Control
              required
              rows={4}
              as='textarea'
              name='task'
              value={task.task}
              onChange={handleChange}
              placeholder='Task'
              className='bg-white text-black'
            />
            <Form.Control.Feedback type='invalid'>
              Please write your task
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3'>
            <Form.Label>Limit date</Form.Label>
            <div>
              <Calendar
                className={styles.calendar}
                panelClassName={styles.calendar_panel}
                baseZIndex={99999}
                minDate={new Date()}
                name='limitDate'
                value={getDate(task.limitDate as string)}
                onChange={handleChange}
              />
            </div>
            <Form.Control.Feedback type='invalid'>
              Please write your task
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-dark' onClick={handleClose}>
            Cancel
          </Button>
          <Button type='submit' variant='dark'>
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
