// bootstrap components
import { Spinner } from 'react-bootstrap'

// types
import { FC } from 'react'

/**
 * loader component for 8base loading state
 * used in _app file
 */
export const PageLoader: FC = () => (
  <div
    style={{ height: '85vh' }}
    className='w-100 d-flex align-items-center justify-content-center'
  >
    <Spinner animation='border' variant='light' />
  </div>
)
