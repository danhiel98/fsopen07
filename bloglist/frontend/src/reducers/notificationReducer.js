import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    removeMessage() {
      return null
    }
  }
})

export const { setMessage, removeMessage } = notificationSlice.actions

export const setSuccessMessage = (message, seconds) => {
  return async dispatch => {
    dispatch(setMessage({ content: message, type: 'success' }))
    setTimeout(() => {
      dispatch(removeMessage())
    }, seconds * 1000)
  }
}

export const setErrorMessage = (message, seconds) => {
  return async dispatch => {
    dispatch(setMessage({ content: message, type: 'error' }))
    setTimeout(() => {
      dispatch(removeMessage())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer