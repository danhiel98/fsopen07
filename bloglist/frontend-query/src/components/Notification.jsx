import { useNotificationValue } from '../reducers/notificationState'

const Notification = () => {
  const notification = useNotificationValue()

  return (
    notification &&
    <div className={`message ${notification.type}`}>
      {notification.content}
    </div>
  )
}

export default Notification