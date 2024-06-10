import { useState } from 'react'
import { setErrorMessage } from '../reducers/notificationState'
import { useStateDispatch } from '../reducers/StateContext'
import { authenticate } from '../reducers/userState'

const LoginForm = () => {
  const stateDispatch = useStateDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await authenticate(stateDispatch, { username, password })

      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage(stateDispatch, 'Wrong credentials', 5)
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