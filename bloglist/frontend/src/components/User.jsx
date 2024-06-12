const User = ({ user }) => {
  if (!user) return (
    <h3>No user found</h3>
  )

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