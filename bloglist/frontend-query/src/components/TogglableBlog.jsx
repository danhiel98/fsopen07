import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useRef } from 'react'
import { setSuccessMessage } from '../reducers/notificationState'
import { useStateDispatch } from '../reducers/StateContext'

const TogglableBlog = () => {
  const stateDispatch = useStateDispatch()
  const blogFormRef = useRef()

  const handleBlogCreated = async (blog) => {
    setSuccessMessage(stateDispatch, `a new blog ${blog.title} by ${blog.author} added`)

    blogFormRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm blogCreated={handleBlogCreated} />
    </Togglable>
  )
}

export default TogglableBlog
