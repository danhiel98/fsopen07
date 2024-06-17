import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const activeUserSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      const user = action.payload
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      return action.payload
    },
    unsetUser(state, action) {
      return null
    }
  }
})

export const { setUser, unsetUser } = activeUserSlice.actions

export const authenticate = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)

    dispatch(setUser(user))
  }
}


export default activeUserSlice.reducer
