// main tools
import { useState, useEffect } from 'react'
import { getProviders, signIn, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'

// bootstrap components
import { Container, Card, Spinner, Form, Button } from 'react-bootstrap'

import styles from 'styles/pages/login.module.scss'

// types
import { ChangeType, SubmitType } from 'types/utils'
import { NextPage, GetServerSideProps } from 'next'
import { ClientSafeProvider } from 'next-auth/client'

const LoginPage: NextPage = () => {
  const [data, setData] = useState({ email: '', password: '' })
  const [validated, setValidated] = useState(false)
  const [providers, setProviders] = useState<ClientSafeProvider[]>([])
  const router = useRouter()

  /**
   * handle change and disable the
   * validation in the form
   */
  const handleChange = (ev: ChangeType) => {
    validated && setValidated(false)
    setData((prev) => ({ ...prev, [ev.target.name]: ev.target.value }))
  }

  /**
   * verify if all the data is setted and
   * send credentials to nextauth
   */
  const handleSubmit = (ev: SubmitType) => {
    ev.preventDefault()
    const form = ev.currentTarget
    if (!form.checkValidity()) {
      !validated && setValidated(true)
    } else signIn('credentials', { ...data, callbackUrl: '/' })
  }

  /**
   * get nextauth providers setted
   * it's only Google
   */
  useEffect(() => {
    ;(async () => {
      const prov = await getProviders().then((res) =>
        Object.values(res as Record<string, ClientSafeProvider>)
      )
      setProviders(prov)
    })()
  }, [])

  return (
    <Container className={styles.container}>
      <Card text='dark' className={styles.card}>
        <Card.Header className={styles.card_header}>
          <h1>Login</h1>
        </Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className='mt-3'>Email address</Form.Label>
              <Form.Control
                required
                type='email'
                name='email'
                value={data.email}
                onChange={handleChange}
                placeholder='Ex: todotest@gmail.com'
                className='bg-white text-black'
              />
              <Form.Control.Feedback type='invalid'>
                Please type a valid email.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label className='mt-3'>Password</Form.Label>
              <Form.Control
                required
                type='password'
                name='password'
                value={data.password}
                onChange={handleChange}
                placeholder='*********'
                className='bg-white text-black'
              />
              <Form.Control.Feedback type='invalid'>
                Please type a valid password.
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant='dark' className='my-3 w-100' type='submit'>
              Login
            </Button>
            {router.query.error && (
              <p className='text-center'>Invalid Credentials</p>
            )}
          </Form>
        </Card.Body>
        <Card.Footer className={styles.card_body}>
          {providers.length === 0 ? (
            <Spinner animation='grow' variant='light' />
          ) : (
            providers.map(
              (prov) =>
                prov.id !== 'credentials' && (
                  <Button
                    className='w-100'
                    key={prov.name}
                    size='lg'
                    variant='outline-dark'
                    onClick={() =>
                      signIn(prov.id, { redirect: true, callbackUrl: '/' })
                    }
                  >
                    Login with {prov.name}
                  </Button>
                )
            )
          )}
        </Card.Footer>
      </Card>
    </Container>
  )
}

/**
 * validate if there is a session active for
 * redirect to home page
 *
 * @param ctx
 */
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (session) return { redirect: { destination: '/', permanent: false } }
  else return { props: {} }
}

export default LoginPage
