import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authenticate } from '../reducers/userReducer'
import { setErrorMessage } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await dispatch(authenticate({ username, password }))

      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
      dispatch(setErrorMessage('Wrong credentials', 5))
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid="username"
          type="text"
          name="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid="password"
          type="password"
          name="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}


export default LoginForm