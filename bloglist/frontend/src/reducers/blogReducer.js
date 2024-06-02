import { createSlice } from '@reduxjs/toolkit'
import { setSuccessMessage } from './notificationReducer'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      const deletedBlog = action.payload

      console.log('Deleted blog:', deletedBlog)
      console.log('State:', state)
      return state.filter(blog => blog.id !== deletedBlog.id)
    },
    updateBlogData(state, action) {
      const updatedBlog = action.payload

      return state.map(blog =>
        blog.id !== updatedBlog.id
          ? blog
          : updatedBlog
      )
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const {
  appendBlog,
  removeBlog,
  updateBlogData,
  setBlogs
} = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  const message = `a new blog ${blog.title} by ${blog.author} added`

  return async dispatch => {
    const createdBlog = await blogService.create(blog)
    dispatch(appendBlog(createdBlog))
    dispatch(setSuccessMessage(message, 5))
  }
}

export const updateBlog = (id, newData) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(id, newData)
    dispatch(updateBlogData(updatedBlog))
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch(removeBlog(blog))
  }
}

export default blogSlice.reducer