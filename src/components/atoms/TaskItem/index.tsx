// main tools
import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

// lib
import { COMPLETE_TASK } from 'lib/queries/Todo'

// bootstrap components
import { Button, Form } from 'react-bootstrap'
import { Pencil, Trash } from 'react-bootstrap-icons'

// components
import { EditTaskModal } from 'components/molecules/EditTaskModal'
import { DeleteTaskModal } from 'components/molecules/DeleteTaskModal'

// styles
import styles from 'styles/components/taskitem.module.scss'

// types
import { FC } from 'react'
import { TaskItemType } from 'types/molecules'
import { ChangeType } from 'types/utils'

/**
 * Single task item where are called the edit and
 * delete actions
 *
 * @param props
 * @returns
 */
export const TaskItem: FC<TaskItemType> = (props) => {
  const [editTask, setEditTask] = useState(false)
  const [deleteTask, setDeleteTask] = useState(false)
  const [completed, setCompleted] = useState(props.completed)
  console.log(props.completed, completed)

  /**
   * complete task mutation
   */
  const [completeTask, res] = useMutation(COMPLETE_TASK)

  /**
   * Format date value for show as dd/mm/yy format
   */
  const showDate = (date: string): string => {
    const formatedDate = new Date(date)
    return `${formatedDate.getDate()}/${formatedDate.getMonth()}/${formatedDate.getFullYear()}`
  }
  const handleEdit = () => setEditTask(true)
  const handleDelete = () => setDeleteTask(true)
  const handleComplete = async (ev: ChangeType) => {
    try {
      setCompleted(ev.target.checked)
      const res = await completeTask({
        variables: { id: props.id, completed: ev.target.checked },
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => setCompleted(props.completed), [props.completed])

  return (
    <div className={styles.container}>
      <Form.Check
        inline
        label={props.task}
        className={[
          styles.checkbox,
          completed ? styles.checkbox_completed : '',
        ].join(' ')}
        checked={completed}
        onChange={handleComplete}
      />
      <div className={styles.actions}>
        {props.limitDate && <span>{showDate(props.limitDate as string)}</span>}
        <Button onClick={handleEdit} variant='outline'>
          <Pencil />
        </Button>
        <Button onClick={handleDelete} variant='outline'>
          <Trash />
        </Button>
      </div>
      <EditTaskModal
        show={editTask}
        setShow={setEditTask}
        setTaskList={props.handleEdit}
        data={{ ...props }}
      />
      <DeleteTaskModal
        show={deleteTask}
        setShow={setDeleteTask}
        setTaskList={props.handleEdit}
        data={{ ...props }}
      />
    </div>
  )
}
