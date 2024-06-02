import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { setSuccessMessage, setErrorMessage } from '../reducers/notificationReducer'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'

const BlogList = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const handleLikeBlog = async (blog) => {
    try {
      await dispatch(updateBlog(blog.id, { likes: blog.likes + 1 }))
      dispatch(setSuccessMessage(`You liked the blog ${blog.title}`, 4))
    } catch ({ response }) {
      dispatch(setErrorMessage(response.data.error, 5))
    }
  }

  const handleDeleteBlog = async (blog) => {
    try {
      await dispatch(deleteBlog(blog))
      dispatch(setSuccessMessage(`Blog ${blog.title} by ${blog.author} deleted`, 4))
    } catch ({ response }) {
      dispatch(setErrorMessage(response.data.error, 5))
    }
  }

  return (
    <div data-testid="blogs-list">
      {
        blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            likeBlog={handleLikeBlog}
            deleteBlog={handleDeleteBlog}
          />
        )
      }
    </div>
  )
}


export default BlogList