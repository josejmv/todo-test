// main tools
import { useState } from 'react'

// components
import { Sidebar } from 'components/molecules/Sidebar'
import { Navbar } from 'components/molecules/Navbar'

// types
import { FC } from 'react'

/**
 * shared components like navbar and
 * sidebar in all the web site
 */
export const Layout: FC = ({ children }) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Navbar setShow={setShow} />
      <Sidebar show={show} setShow={setShow} />
      <main>{children}</main>
    </>
  )
}
