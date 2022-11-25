import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import visibilityReducer from './reducers/visibilityReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import errorReducer from './reducers/errorReducer'
import usernameReducer from './reducers/usernameReducer'
import passwordReducer from './reducers/passwordReducer'
import commentReducer from './reducers/commentReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    username: usernameReducer,
    password: passwordReducer,
    visibility: visibilityReducer,
    notification: notificationReducer,
    error: errorReducer,
    comment: commentReducer,
  },
})

export default store