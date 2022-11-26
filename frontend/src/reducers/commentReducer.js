import { createSlice } from '@reduxjs/toolkit'

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    blogId: '',
    comment: ''
  },
  reducers: {
    setComment(state, action) {
      return {
        blogId: action.payload.blogId,
        comment: action.payload.comment,
      }
    },
    resetComment(state, action) {
      return {
        blogId: '',
        comment: '',
      }
    }
  }
})


export const { setComment, resetComment } = commentSlice.actions
export default commentSlice.reducer