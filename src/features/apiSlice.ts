import { createSlice } from '@reduxjs/toolkit'

const apiSlice = createSlice({
  name: 'apiData',
  initialState: null,
  reducers: {
    setApiData: (state, action) => action.payload,
  },
})

export const { setApiData } = apiSlice.actions
export default apiSlice.reducer
