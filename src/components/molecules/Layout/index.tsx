// main tools
import { useState } from 'react'

// components
import { Sidebar } from 'components/molecules/Sidebar'
import { Navbar } from 'components/molecules/Navbar'

// types
import { FC } from 'react'
import { LayoutType } from 'types/molecules'

/**
 * shared components like navbar and
 * sidebar in all the web site
 */
export const Layout: FC<LayoutType> = ({ setTaskList = null, children }) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Navbar setShow={setShow} />
      <Sidebar setTaskList={setTaskList} show={show} setShow={setShow} />
      <main>{children}</main>
    </>
  )
}
