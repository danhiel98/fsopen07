import { useDispatch, useSelector } from 'react-redux'
import { setSuccessMessage, setErrorMessage } from '../reducers/notificationReducer'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  if (!blog) return (
    <h3>No blog found</h3>
  )

  const handleLikeBlog = async () => {
    try {
      await dispatch(updateBlog(blog.id, { likes: blog.likes + 1 }))
      dispatch(setSuccessMessage(`You liked the blog ${blog.title}`, 4))
    } catch ({ response }) {
      dispatch(setErrorMessage(response.data.error, 5))
    }
  }

  const handleDeleteBlog = async () => {
    try {
      await dispatch(deleteBlog(blog))
      dispatch(setSuccessMessage(`Blog ${blog.title} by ${blog.author} deleted`, 4))
    } catch ({ response }) {
      dispatch(setErrorMessage(response.data.error, 5))
    }
  }

  const sameUser = user && blog.user && user.username === blog.user.username

  const handleDelete = async () => {
    const result = confirm(`Remove blog ${blog.title} by ${blog.author}?`)

    if (result) {
      handleDeleteBlog()
    }
  }

  return (
    <>
      <h2>{blog.title}</h2>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        <li><a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a></li>
        <li><span className='likesCount'>likes {blog.likes}</span> <button onClick={handleLikeBlog}>like</button></li>
        <li>{blog.user && blog.user.name}</li>
      </ul>
      {sameUser &&
        <button onClick={handleDelete}>remove</button>
      }
    </>
  )
}

export default Blog