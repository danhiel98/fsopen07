import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const User = ({ user }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/users')
    }
  }, [])

  return (
    <>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map(b => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User