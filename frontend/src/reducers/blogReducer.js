import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const sortBlogsInPlace = (blogsToSort) => {
  blogsToSort.sort((a, b) => {
    return a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : 0
  })

  return blogsToSort
}

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
    addLike(state, action) {
      const findBlog = state.find((blog) => blog.id === action.payload)
      findBlog.likes += 1

      return sortBlogsInPlace(state)
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    }
  },
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(sortBlogsInPlace(blogs)))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = {
      title: content.title,
      author: content.author,
      url: content.url,
    }

    const newReturnedBlog = await blogService.create(newBlog, content.user)

    dispatch(addBlog(newReturnedBlog))
  }
}


export const { incrementLike, addBlog, setBlogs, addLike, removeBlog } = blogSlice.actions
export default blogSlice.reducer
