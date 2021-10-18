// main tools
import { useState, useEffect } from 'react'
import { signOut } from 'next-auth/client'
import { useLazyQuery } from '@apollo/client'

// lib
import { GET_TODO_LIST } from 'lib/queries/Todo'

// utils
import { categoriesList } from 'globalData/categoriesList'

// bootstrap components
import { Button } from 'react-bootstrap'

// prime components
import { Sidebar as PrSidebar } from 'primereact/sidebar'
import { Avatar } from 'primereact/avatar'
import { Divider } from 'primereact/divider'

// styles
import styles from 'styles/components/sidebar.module.scss'

// types
import { FC } from 'react'
import { SidebarType } from 'types/molecules'
import { TodoListType } from 'types/data'

export const Sidebar: FC<SidebarType> = ({
  show,
  setShow,
  session,
  setTaskList,
}) => {
  const [avatarState, setAvatarState] = useState({})

  /**
   * Query for list task by category
   */
  const [getTaskList, { data }] = useLazyQuery<TodoListType>(GET_TODO_LIST, {
    fetchPolicy: 'network-only',
  })

  const handleClick = (category: string) =>
    getTaskList({ variables: { category: { equals: category } } })

  useEffect(() => {
    data?.todosList && setTaskList(data.todosList.items)
  }, [data, setTaskList])

  /**
   * verify the session and set the
   * avatar picture or initial letter to show
   */
  useEffect(() => {
    if (session.user.image) setAvatarState({ image: session.user.image })
    else setAvatarState({ label: session.user.name[0].toUpperCase() })
  }, [setAvatarState, session.user])

  return (
    <PrSidebar
      blockScroll
      className={styles.container}
      visible={show}
      onHide={() => setShow(false)}
    >
      <div>
        <Avatar
          shape='circle'
          size='xlarge'
          className={styles.avatar}
          {...avatarState}
        />
        <p>{session.user.name}</p>
        <Divider />
        <h3>Todo Tasks</h3>
        {categoriesList.map((button) => (
          <Button
            key={button}
            onClick={() => handleClick(button)}
            className={styles.category}
            variant='outline-light'
          >
            {button}
          </Button>
        ))}
      </div>
      <Button
        variant='outline-light'
        type='button'
        onClick={() => signOut({ callbackUrl: '/login' })}
      >
        Sign out
      </Button>
    </PrSidebar>
  )
}
