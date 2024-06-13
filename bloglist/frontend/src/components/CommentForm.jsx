import { useDispatch } from 'react-redux'
import { useField } from '../hooks/useField'
import { createComment } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const comment = useField('text')

  const handleCommentSubmit = async (ev) => {
    ev.preventDefault()
    await dispatch(createComment(blog.id, comment.value))
    comment.onReset()
  }

  return (
    <>
      <form onSubmit={handleCommentSubmit}>
        <input {...comment} />
        <button>add comment</button>
      </form>
    </>
  )
}

export default CommentForm