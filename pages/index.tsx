// main tools
import { useState } from 'react'
import { getSession } from 'next-auth/client'

// components
import { Layout } from 'components/molecules/Layout'
import { EmptyList } from 'components/atoms/EmptyList'

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
import { TodoListType } from 'types/data'

const HomePage: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  data,
}) => {
  const [createTask, setCreateTask] = useState(false)

  return (
    <Layout>
      <Container className={styles.container}>
        <h1>Todo list</h1>
        <div className={styles.list}>
          {data.todosList.items.length === 0 ? (
            <div className={styles.list_empty}>
              <EmptyList handleAdd={setCreateTask} />
            </div>
          ) : (
            data.todosList.items.map((todo, idx) => <p key={idx}>hola</p>)
          )}
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
    const res = await apolloClient.query<TodoListType>({ query: GET_TODO_LIST })
    return { props: { ...res } }
  } catch (error) {
    return { redirect: { destination: '/error', permanent: false } }
  }
}

export default HomePage
