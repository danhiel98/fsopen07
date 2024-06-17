import { useEffect } from 'react'
import { initializeUsers } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'


const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const users = useSelector(state => state.users)

  return <>
    <h1>Users</h1>

    <Table>
      <thead>
        <tr>
          <td><strong>Name</strong></td>
          <td><strong>Blogs created</strong></td>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td>
              <Link to={`/users/${u.id}`}>{u.name}</Link>
            </td>
            <td>{u.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </>
}

export default Users