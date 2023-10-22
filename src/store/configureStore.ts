// store.js

import { configureStore } from '@reduxjs/toolkit'
import apiReducer from '../features/apiSlice'

const store = configureStore({
  reducer: {
    apiData: apiReducer,
  },
})

export default store
