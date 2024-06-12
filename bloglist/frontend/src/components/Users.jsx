import { useEffect } from 'react'
import { initializeUsers } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const users = useSelector(state => state.users)

  return <>
    <h2>Users</h2>

    <table>
      <thead>
        <tr>
          <td></td>
          <td><strong>blogs created</strong></td>
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
    </table>
  </>
}

export default Users