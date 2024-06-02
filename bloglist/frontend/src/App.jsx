import { useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { unsetUser, setUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import TogglableBlog from './components/TogglableBlog'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()

    dispatch(unsetUser())
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
    <div>
      <h2>blogs</h2>
      <Notification />

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <TogglableBlog />
      <BlogList />
    </div >
  )
}

export default App