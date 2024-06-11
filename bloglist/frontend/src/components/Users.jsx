import { useEffect } from 'react'
import { initializeUsers } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'


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
            <td>{u.name}</td>
            <td>{u.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
}

export default Users