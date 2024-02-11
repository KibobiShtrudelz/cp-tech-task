import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TestState = {
  isTesting: boolean
}

const initialState: TestState = {
  isTesting: true
}

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setIsStuck: (state, action: PayloadAction<boolean>) => {
      state.isTesting = action.payload
    }
  }
})

export const testSliceReducer = testSlice.reducer
export const { actions } = testSlice
