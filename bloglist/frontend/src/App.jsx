import { useEffect } from 'react'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/activeUserReducer'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import User from './components/User'
import Blog from './components/Blog'

import {
  Container
} from 'react-bootstrap'

import {
  Route,
  Routes
} from 'react-router-dom'
import Users from './components/Users'
import Menu from './components/Menu'
import { useParam } from './hooks/useParam'
import { useLocalStorage } from './hooks/useLocalStorage'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const activeUser = useLocalStorage('loggedBlogappUser')
  const userFound = useParam(users, '/users/:id')
  const blogFound = useParam(blogs, '/blogs/:id')

  useEffect(() => {
    dispatch(initializeBlogs())

    if (activeUser) {
      dispatch(setUser(activeUser))
    }
  }, [])


  if (!user) return (
    <>
      <Notification />
      <LoginForm />
    </>
  )

  return (
    <Container>
      <Notification />
      <Menu user={user} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blogs/:id' element={<Blog blog={blogFound} />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User user={userFound} />} />
      </Routes>
    </Container>
  )
}

export default App