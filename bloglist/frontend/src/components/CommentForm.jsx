import { useDispatch } from 'react-redux'
import { useField } from '../hooks/useField'
import { createComment } from '../reducers/blogReducer'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { setErrorMessage } from '../reducers/notificationReducer'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const comment = useField('text')

  const handleCommentSubmit = async (ev) => {
    ev.preventDefault()
    try {
      await dispatch(createComment(blog.id, comment.value))
      comment.onReset()
    } catch (error) {
      dispatch(setErrorMessage('The comment was not added', 5))
    }
  }

  return (
    <>
      <Form onSubmit={handleCommentSubmit}>
        <Form.Group as={Row} className='d-flex align-items-center'>
          <Col sm={6}>
            <Form.Control {...comment} />
          </Col>
          <Form.Label column sm={4}>
            <Button size='sm' type='submit'>Add comment</Button>
          </Form.Label>
        </Form.Group>
      </Form>
    </>
  )
}

export default CommentForm