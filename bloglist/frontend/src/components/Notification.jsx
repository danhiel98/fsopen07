import { Alert, Toast, ToastContainer } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { removeMessage } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  const handleClose = (ev) => {
    ev.preventDefault()
    dispatch(removeMessage())
  }

  return (
    notification &&
    <ToastContainer className='p-3'
      position='bottom-end'
      style={{ zIndex: 1 }}>
      <Toast onClose={handleClose}>
        <Toast.Header>
          <strong className={`me-auto text-${notification.type}`}>{notification.type.toUpperCase()}</strong>
        </Toast.Header>
        <Toast.Body>
          {notification.content}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default Notification