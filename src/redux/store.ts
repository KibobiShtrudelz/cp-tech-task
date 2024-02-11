import { configureStore } from '@reduxjs/toolkit'

import { testSliceReducer } from './slices/test-slice'

export const store = configureStore({
  reducer: {
    test: testSliceReducer
  }
})
