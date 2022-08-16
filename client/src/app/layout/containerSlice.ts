import { createSlice } from '@reduxjs/toolkit'

export interface ContainerState {
  isFull: boolean
}

const initialState: ContainerState = {
  isFull: false
}

export const containerSlice = createSlice({
  name: 'container',
  initialState,
  reducers: {
    setcontainer: (state) => {
      state.isFull = !state.isFull
    },
  },
})

// Action creators are generated for each case reducer function
export const { setcontainer } = containerSlice.actions

