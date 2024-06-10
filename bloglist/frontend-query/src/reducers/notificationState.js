import { useContext } from 'react'
import context from './StateContext'

export const useNotificationValue = () => {
  const stateAndDispatch = useContext(context)
  return stateAndDispatch[0].notification
}

export const setSuccessMessage = (dispatch, content, seconds = 5) => {
  dispatch({
    type: 'SET_NOTIFICATION',
    payload: {
      type: 'success',
      content
    }
  })
  setTimeout(() => {
    dispatch({ type: 'REMOVE_NOTIFICATION' })
  }, seconds * 1000)
}

export const setErrorMessage = (dispatch, content, seconds = 5) => {
  dispatch({
    type: 'SET_NOTIFICATION',
    payload: {
      type: 'error',
      content
    }
  })
  setTimeout(() => {
    dispatch({ type: 'REMOVE_NOTIFICATION' })
  }, seconds * 1000)
}