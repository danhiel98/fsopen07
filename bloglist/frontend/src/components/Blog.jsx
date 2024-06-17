import { useDispatch, useSelector } from 'react-redux'
import { setSuccessMessage, setErrorMessage, removeMessage } from '../reducers/notificationReducer'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import { Card, Button } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  if (!blog) return (
    <div className='d-flex justify-content-center'>
      <h3 className='text-danger'>No blog found</h3>
    </div>
  )

  const handleLikeBlog = async () => {
    dispatch(removeMessage())
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
    <div className='d-flex justify-content-center'>
      <div className='col-12 col-md-12 col-lg-10'>
        <Card className='p-4'>
          <div className='d-flex justify-content-between'>
            <h2>{blog.title}</h2>
            {sameUser &&
              <Button variant='danger' size='sm' onClick={handleDelete}>Remove</Button>
            }
          </div>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li><a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a></li>
            <li>
              <span className='likesCount'>{blog.likes} likes</span>{' '}
              <Button variant='success' size='sm' onClick={handleLikeBlog}>Like</Button>
            </li>
            <li>
              <strong>{blog.user && blog.user.name}</strong>
            </li>
          </ul>

          <h3>Comments</h3>
          <CommentForm blog={blog} />
          <CommentList comments={blog.comments} />
        </Card>
      </div>
    </div>
  )
}

export default Blog