import Blog from './Blog'
import { setSuccessMessage, setErrorMessage } from '../reducers/notificationState'
import { useStateDispatch } from '../reducers/StateContext'
import { useUserValue } from '../reducers/userState'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

const BlogList = () => {
  const queryClient = useQueryClient()
  const stateDispatch = useStateDispatch()

  const likeMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: updatedBlog => {
      const blogs = queryClient.getQueryData(['blogs'])
      const queryData = blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog)
      queryClient.setQueryData(['blogs'], queryData)
      setSuccessMessage(stateDispatch, `You liked the blog ${updatedBlog.title}`)
    },
    onError: ({ response }) => {
      console.log(response.data.error)
      setErrorMessage(stateDispatch, 'there was an error liking the blog')
    }
  })

  const deleteMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: deletedId => {
      const blogs = queryClient.getQueryData(['blogs'])
      const queryData = blogs.filter(b => b.id !== deletedId)
      queryClient.setQueryData(['blogs'], queryData)
      setSuccessMessage(stateDispatch, 'blog deleted successfully')
    },
    onError: () => {
      setErrorMessage(stateDispatch, 'There was an error')
    }
  })

  const user = useUserValue()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1
  })

  if (result.isPending) {
    return <div>Loading...</div>
  }

  if (result.isError) {
    return <h1>Blog service not available</h1>
  }

  const blogs = result.data

  const handleLikeBlog = async (blog) => {
    likeMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const handleDeleteBlog = async (blog) => {
    deleteMutation.mutate(blog.id)
  }

  return (
    <div data-testid="blogs-list">
      {
        blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            likeBlog={handleLikeBlog}
            deleteBlog={handleDeleteBlog}
          />
        )
      }
    </div>
  )
}


export default BlogList