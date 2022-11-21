import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    incrementLike(state, action) {
      const blogToUpdate = state.find((blog) => blog.id === action.payload)
      blogToUpdate.likes += 1
    },
    addBlog(state, action) {
      return state.concat(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { incrementLike, addBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer
