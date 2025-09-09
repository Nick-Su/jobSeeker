import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { shiftsApi } from '../api/shiftsApi'

export const store = configureStore({
  reducer: {
    [shiftsApi.reducerPath]: shiftsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shiftsApi.middleware),
})

setupListeners(store.dispatch)
