import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
      visibleLoading: (state, action) => {
        state.isOpen = true;
      },
      hideLoading: (state, action) => {
        state.isOpen = false
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { visibleLoading, hideLoading } = loadingSlice.actions
  export default loadingSlice.reducer