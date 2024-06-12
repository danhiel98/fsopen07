const blogDetail = () => (
  <>
    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
      <li><a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a></li>
      <li><span className='likesCount'>likes {blog.likes}</span> <button onClick={handleLike}>like</button></li>
      <li>{blog.user && blog.user.name}</li>
    </ul>
    {sameUser &&
      <button onClick={handleDelete}>remove</button>
    }
  </>
)