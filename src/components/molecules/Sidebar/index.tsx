// main tools
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/client'

// bootstrap components
import { Spinner, Button } from 'react-bootstrap'

// prime components
import { Sidebar as PrSidebar } from 'primereact/sidebar'
import { Avatar } from 'primereact/avatar'
import { Divider } from 'primereact/divider'

// styles
import styles from 'styles/components/sidebar.module.scss'

// types
import { FC } from 'react'
import { SidebarType } from 'types/molecules'

export const Sidebar: FC<SidebarType> = ({ show, setShow }) => {
  const [avatarState, setAvatarState] = useState({})
  const [session, loading] = useSession()

  useEffect(() => {
    if (session) {
      if (session.user.image) setAvatarState({ image: session.user.image })
      else setAvatarState({ label: session.user.name[0].toUpperCase() })
    }
  }, [session, loading])

  return (
    <PrSidebar
      blockScroll
      className={styles.container}
      visible={show}
      onHide={() => setShow(false)}
    >
      {loading ? (
        <Spinner animation='grow' variant='primary' />
      ) : (
        session && (
          <div>
            <Avatar
              shape='circle'
              size='xlarge'
              style={{ backgroundColor: '#2196F3', color: '#ffffff' }}
              {...avatarState}
            />
            <p>{session.user.name}</p>
            <Divider />
            <h3>Todo Tasks</h3>
          </div>
        )
      )}
      <Button
        variant='outline-primary'
        type='button'
        onClick={() => signOut({ callbackUrl: '/login' })}
      >
        Sign out
      </Button>
    </PrSidebar>
  )
}
