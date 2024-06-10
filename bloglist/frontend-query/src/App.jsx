import { useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import TogglableBlog from './components/TogglableBlog'
import { useStateDispatch } from './reducers/StateContext'
import {
  setUser,
  unsetUser,
  useUserValue
} from './reducers/userState'

const App = () => {
  const stateDispatch = useStateDispatch()
  const user = useUserValue()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setUser(stateDispatch, user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()

    unsetUser(stateDispatch)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  if (!user) return (
    <>
      <h2>blogs</h2>
      <Notification />
      <LoginForm />
    </>
  )

  return (
    <>
      <h2>blogs</h2>
      <Notification />

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <TogglableBlog />
      <BlogList />
    </>
  )
}

export default App