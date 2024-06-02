import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { setErrorMessage } from '../reducers/notificationReducer'

const TogglableBlog = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const handleCreateBlog = async (blogObject) => {
    try {
      await dispatch(createBlog(blogObject))

      blogFormRef.current.toggleVisibility()
    } catch (error) {
      dispatch(setErrorMessage('There was an error creating the resource.', 5))
    }
  }

  return (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={handleCreateBlog} />
    </Togglable>
  )
}

export default TogglableBlog
