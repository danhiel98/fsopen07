const CommentList = ({ comments }) => {
  if (!comments.length) {
    return (
      <strong className="text-primary">There are not comments yet</strong>
    )
  }

  return (
    <>
      <ul>
        {comments.map(c => (
          <li key={c.id}>{c.content}</li>
        ))}
      </ul>
    </>
  )
}

export default CommentList