// bootstrap components
import { Spinner } from 'react-bootstrap'

// types
import { FC } from 'react'

export const PageLoader: FC = () => (
  <div
    style={{ height: '85vh' }}
    className='w-100 d-flex align-items-center justify-content-center'
  >
    <Spinner animation='border' variant='primary' />
  </div>
)
