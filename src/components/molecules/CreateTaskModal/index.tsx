// main tools
import { useState } from 'react'
import { useMutation } from '@apollo/client'

// lib
import { CREATE_TASK } from 'lib/queries/Todo'

// utils
import { categoriesList } from 'globalData/categoriesList'

// bootstrap components
import { Modal, Button, Form, Dropdown } from 'react-bootstrap'

// prime components
import { Calendar, CalendarChangeParams } from 'primereact/calendar'

// styles
import styles from 'styles/components/taskmodal.module.scss'

// types
import { FC } from 'react'
import { ModalType } from 'types/molecules'
import { TodoType } from 'types/data'
import { ChangeType, SubmitType } from 'types/utils'

const INITIAL_DATA = {
  task: '',
  category: '',
  author: '',
  completed: false,
  limitDate: null,
}

/**
 * handle create task
 */
export const CreateTaskModal: FC<ModalType> = ({
  show,
  setShow,
  setTaskList,
  session,
}) => {
  const [validated, setValidated] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('General')
  const [task, setTask] = useState<TodoType>(INITIAL_DATA)

  /**
   * Mutation for create task
   */
  const [createTask, res] = useMutation(CREATE_TASK, {
    variables: {
      data: { ...task, category: selectedCategory, author: session.user.email },
    },
  })

  const handleClose = () => setShow(false)

  /**
   * handle change and disable the
   * validation in the form
   */
  const handleChange = (ev: ChangeType & CalendarChangeParams) => {
    validated && setValidated(false)
    setTask((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }))
  }

  /**
   * verify if all the data is setted and
   * send action to create task in 8base
   * then restore data and close the modal
   */
  const handleSubmit = async (ev: SubmitType) => {
    ev.preventDefault()
    const form = ev.currentTarget
    if (!form.checkValidity()) !validated && setValidated(true)
    else {
      try {
        const response = await createTask()

        setTaskList((prev) => {
          const update = [...prev]
          if (response.data.todoCreate.category === selectedCategory)
            update.push({ ...response.data.todoCreate })

          return update
        })
        setTask(INITIAL_DATA)
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
          <Modal.Title>Create Task</Modal.Title>
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
                required={selectedCategory === 'Important' ? true : false}
                className={styles.calendar}
                panelClassName={styles.calendar_panel}
                baseZIndex={99999}
                minDate={new Date()}
                name='limitDate'
                value={task.limitDate as Date}
                onChange={handleChange}
              />
            </div>
            <Form.Control.Feedback type='invalid'>
              Please select a date
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3 d-flex align-items-center justify-content-between'>
            <Form.Label className='mb-0'>Category</Form.Label>
            <Dropdown onSelect={setSelectedCategory} defaultValue='General'>
              <Dropdown.Toggle variant='outline-dark'>
                {selectedCategory}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {categoriesList.map((category) => (
                  <Dropdown.Item key={category} eventKey={category}>
                    {category}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
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
