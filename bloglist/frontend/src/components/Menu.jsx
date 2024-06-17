import {
  Button,
  Container,
  Nav,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle
} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { unsetUser } from '../reducers/activeUserReducer'

const Menu = ({ user }) => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const handleLogout = async (event) => {
    event.preventDefault()

    dispatch(unsetUser())
    window.localStorage.removeItem('loggedBlogappUser')
  }

  return (
    <Navbar expand="lg" className='bg-body-tertiary'>
      <Container>
        <NavbarBrand as={Link} to='/'>
          Blog App
        </NavbarBrand>
        <NavbarToggle aria-controls='menu-navbar' />
        <NavbarCollapse id='menu-navbar' className='justify-content-end'>
          <Nav variant='underline' className="me-auto">
            <NavLink active={pathname === '/'} as={Link} to="/">Blogs</NavLink>
            <NavLink active={pathname === '/users'} as={Link} to="/users">Users</NavLink>
          </Nav>
          <Navbar.Text>
            Signed in as: {user.name}{' '}
            <Button onClick={handleLogout} variant='dark' size='sm'>Log out</Button>
          </Navbar.Text>
        </NavbarCollapse>
      </Container>
    </Navbar>
  )
}

export default Menu