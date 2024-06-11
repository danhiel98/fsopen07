import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './notificationReducer'
import blogReducer from './blogReducer'
import activeUserReducer from './activeUserReducer'
import userReducer from './userReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: activeUserReducer,
    users: userReducer
  }
})

export default store