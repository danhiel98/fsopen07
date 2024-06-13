const CommentList = ({ comments }) => {
  return (
    <>
      <h3>comments</h3>
      <ul>
        {comments.map(c => (
          <li key={c.id}>{c.content}</li>
        ))}
      </ul>
    </>
  )
}

export default CommentList