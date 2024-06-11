import { useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { unsetUser, setUser } from './reducers/activeUserReducer'
import LoginForm from './components/LoginForm'
import Home from './components/Home'

import {
  Route,
  Routes,
  Link
} from 'react-router-dom'
import Users from './components/Users'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <>
      <Link to="/" style={padding}>blogs</Link>
      <Link to="/users" style={padding}>users</Link>
    </>
  )
}

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
      <Menu />

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
      </Routes>

    </div >
  )
}

export default App