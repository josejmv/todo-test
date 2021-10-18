// main tools
import { useState } from 'react'
import { getSession } from 'next-auth/client'

// components
import { Layout } from 'components/molecules/Layout'
import { CreateTaskModal } from 'components/molecules/CreateTaskModal'
import { EmptyList } from 'components/atoms/EmptyList'
import { TaskItem } from 'components/atoms/TaskItem'

// bootstrap components
import { Container } from 'react-bootstrap'

// lib
import { initializeApolloClient } from 'lib/apollo'

// queries
import { GET_TODO_LIST } from 'lib/queries/Todo'

// styles
import styles from 'styles/Home.module.scss'

// types
import { NextPage, GetServerSidePropsContext } from 'next'
import { GetSSPropsType } from 'types/utils'
import { TodoListType, TodoType } from 'types/data'

/**
 * data returned from getServerSideProps
 *
 * @param data
 * @returns
 */
const HomePage: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  data,
  session,
}) => {
  const [taskList, setTaskList] = useState<TodoType[]>(data.todosList.items)
  const [createTask, setCreateTask] = useState(false)

  return (
    <Layout session={session} setTaskList={setTaskList}>
      <Container className={styles.container}>
        <h1>Todo list</h1>
        <div className={styles.list}>
          <div className={styles.list_empty}>
            <EmptyList
              empty={taskList.length === 0}
              handleAdd={setCreateTask}
            />
            <CreateTaskModal
              session={session}
              show={createTask}
              setShow={setCreateTask}
              setTaskList={setTaskList}
            />
          </div>
          {taskList.map((todo, idx) => (
            <TaskItem
              key={idx}
              {...todo}
              session={session}
              handleEdit={setTaskList}
            />
          ))}
        </div>
      </Container>
    </Layout>
  )
}

/**
 * get list of todos from server side
 * and validate if there isn't session for redirect
 * to login page
 *
 * @param ctx
 */
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session) return { redirect: { destination: '/login', permanent: false } }

  try {
    const apolloClient = initializeApolloClient()
    const res = await apolloClient.query<TodoListType>({
      query: GET_TODO_LIST,
      variables: { category: { equals: 'General' } },
    })
    return { props: { ...res, session } }
  } catch (error) {
    console.log('ERROR', error)
    return { redirect: { destination: '/login', permanent: false } }
  }
}

export default HomePage
