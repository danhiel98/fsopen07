import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return (
    notification &&
    <div className={`message ${notification.type}`}>
      {notification.content}
    </div>
  )
}

export default Notification