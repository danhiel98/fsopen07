import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div data-testid="blogs-list">
      {
        blogs.map(blog =>
          <div key={blog.id} className='blog-data' style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </div>
        )
      }
    </div >
  )
}


export default BlogList