import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <ListGroup>
      {
        blogs.map(blog =>
          <ListGroup.Item
            className='link-primary'
            key={blog.id}
            as={Link} to={`/blogs/${blog.id}`}>
            {blog.title}
          </ListGroup.Item>
        )
      }
    </ListGroup>
  )
}


export default BlogList