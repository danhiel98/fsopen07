import PropTypes from 'prop-types'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { setSuccessMessage, setErrorMessage } from '../reducers/notificationState'
import { useStateDispatch } from '../reducers/StateContext'

const BlogForm = ({ blogCreated }) => {
  const stateDispatch = useStateDispatch()
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: newBlog => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      setSuccessMessage(stateDispatch, `a new blog ${newBlog.title} by ${newBlog.author} was added`)
      setTitle('')
      setAuthor('')
      setUrl('')

      blogCreated(newBlog)
    },
    onError: ({ response }) => {
      setErrorMessage(stateDispatch, 'there was an error creating the blog')
    }
  })

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    newBlogMutation.mutate({ title, author, url })
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        title:
        <input
          data-testid="title"
          type="text"
          name="Title"
          value={title}
          placeholder='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          data-testid="author"
          type="text"
          name="Author"
          value={author}
          placeholder='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          data-testid="url"
          type="url"
          name="Url"
          value={url}
          placeholder='URL'
          onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  blogCreated: PropTypes.func.isRequired
}

export default BlogForm