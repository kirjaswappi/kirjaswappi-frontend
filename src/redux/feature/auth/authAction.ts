

import { getUserData } from '../../../utility/getUser';
import { clearTokens, setTokens } from '../../../utility/localStorage/local.auth';
import { userLogin } from './authSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';



export interface IInitialState {
  loading: boolean
  userInfo: any
  userToken: string | null;
  error: string | null
  success: boolean
}

const initialState: IInitialState = {
  loading: false,
  userInfo: null,
  userToken:null,
  error: null,
  success: false,
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.success = false;
      clearTokens();
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.userToken = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    }, 
  },
  extraReducers: builder => {
    builder.addCase(userLogin.pending, state => {
      state.loading = true
      state.userInfo = null
      state.error= null
      state.success= false
    })
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      // set token in local storage
      setTokens(payload.access, payload.refresh)
      const user = getUserData(payload.access)
      state.loading = false
      state.success = true
      state.error= null
      state.userToken = payload.access
      state.userInfo = user;
    })
    builder.addCase(userLogin.rejected, (state, {payload}) => {
      state.loading = false
      state.success = false
      state.error = payload as string | null
    })
  },
})

export const { logout, setToken, setUserInfo } = authSlice.actions
export default authSlice.reducer



