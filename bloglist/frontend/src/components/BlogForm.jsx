import PropTypes from 'prop-types'
import { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Form onSubmit={handleCreateBlog}>
      <Form.Group as={Row} className="mb-3" controlId="titleInput">
        <Form.Label column sm={2}>Title</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="authorInput">
        <Form.Label column sm={2}>Author</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="urlInput">
        <Form.Label column sm={2}>URL</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="url"
            placeholder="URL"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </Col>
      </Form.Group>
      <div className='d-flex justify-content-end'>
        <Button type="submit">Create</Button>
      </div>
    </Form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm