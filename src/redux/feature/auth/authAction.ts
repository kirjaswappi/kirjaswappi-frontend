

import { createSlice } from '@reduxjs/toolkit';



export interface IInitialState {
  loading: boolean
  error: string | null
  success: boolean
}

const initialState: IInitialState = {
  loading: false,
  error: null,
  success: false,
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  // extraReducers: builder => {
      
  // },
})

export const {  } = authSlice.actions
export default authSlice.reducer



