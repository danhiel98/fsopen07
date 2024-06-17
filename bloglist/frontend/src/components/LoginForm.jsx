import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authenticate } from '../reducers/activeUserReducer'
import { setErrorMessage } from '../reducers/notificationReducer'
import {
  Button,
  Col,
  Container,
  Form,
  Row
} from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await dispatch(authenticate({ username, password }))

      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(setErrorMessage('Wrong credentials', 5))
    }
  }

  return (
    <Container>
      <h1 className='text-center mt-4'>Blogs App</h1>
      <h3 className='text-center'>Login</h3>
      <Form onSubmit={handleLogin}>
        <Row className='justify-content-center'>
          <Col xs={12} md={8} xl={6}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Username'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </Form.Group>
            <div className='d-grid gap-2 mt-3'>
              <Button variant='primary' type="submit">Login</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}


export default LoginForm