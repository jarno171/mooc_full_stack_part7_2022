import { createSlice } from '@reduxjs/toolkit'

const commentSlice = createSlice({
  name: 'comment',
  initialState: '',
  reducers: {
    setComment(state, action) {
      return action.payload
    },
    resetComment(state, action) {
      return ''
    }
  }
})


export const { setComment, resetComment } = commentSlice.actions
export default commentSlice.reducer