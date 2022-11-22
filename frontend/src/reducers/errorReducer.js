import { createSlice } from '@reduxjs/toolkit'

const errorSlice = createSlice({
  name: 'notification',
  initialState: "",
  reducers: {
    setError(state, action) {
      return action.payload
    },
    resetError(state, action) {
      return ""
    }
  }
})

export const createError = content => {
  return dispatch => {
    dispatch(setError(content))

    setTimeout(() => {
      dispatch(resetError())
    }, 5000)
  }
}

export const { setError, resetError } = errorSlice.actions
export default errorSlice.reducer