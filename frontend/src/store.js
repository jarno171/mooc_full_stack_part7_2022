import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import visibilityReducer from './reducers/visibilityReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    visibility: visibilityReducer,
    notification: notificationReducer,
  },
})

export default store