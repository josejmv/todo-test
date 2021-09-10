// bootstrap components
import { Navbar as BsNavbar, NavbarBrand, Button } from 'react-bootstrap'
import { ArrowRight } from 'react-bootstrap-icons'

// types
import { FC } from 'react'
import { NavbarType } from 'types/molecules'

export const Navbar: FC<NavbarType> = ({ setShow }) => (
  <BsNavbar sticky='top' collapseOnSelect expand='lg' className='bg-black'>
    <NavbarBrand>
      <Button onClick={() => setShow(true)} variant='outline'>
        <ArrowRight fontSize={32} />
      </Button>
    </NavbarBrand>
  </BsNavbar>
)
