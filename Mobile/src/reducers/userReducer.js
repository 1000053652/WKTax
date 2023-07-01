import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUser = createAsyncThunk('content/fetchContent', async () => {
  const res = await axios('https://jsonplaceholder.typicode.com/photos')
  const data = await res.data

  return data
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userData = action.payload
        state.isLoading = false
      })
      .addCase(fetchUser.rejected, state => {
        state.isLoading = false
      })
  },
})

export default userSlice.reducer
