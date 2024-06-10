import loginService from '../services/login'
import blogService from '../services/blogs'
import { useContext } from 'react'
import context from './StateContext'

export const useUserValue = () => {
  const stateAndDispatch = useContext(context)
  return stateAndDispatch[0].user
}


export const setUser = (dispatch, user) => {
  dispatch({
    type: 'SET_USER',
    payload: user
  })
}

export const unsetUser = (dispatch) => {
  dispatch({ type: 'UNSET_USER' })
}

export const authenticate = async (dispatch, credentials) => {

  const user = await loginService.login(credentials)

  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  blogService.setToken(user.token)
  setUser(dispatch, user)
}
