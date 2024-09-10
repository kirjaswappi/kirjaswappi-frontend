import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

export interface IInitialState {
    loading: boolean;
    error: null | string;
    message: null | string;
    success: boolean;
    userInformation: {
        id?: string,
        firstName?: string,
        lastName: string,
        email: string,
        streetName?: null,
        houseNumber?: null,
        zipCode?: number,
        city?: null,
        country?: null,
        phoneNumber?: null,
        aboutMe?: null,
        favGenres?: null
    };
}

const initialState: IInitialState = {
    loading: false,
    error: null,
    message: null,
    success: false,
    userInformation: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        streetName: null,
        houseNumber: null,
        zipCode: 0,
        city: null,
        country: null,
        phoneNumber: null,
        aboutMe: null,
        favGenres: null
    }
  }
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(authApi.endpoints.login.matchPending, (state) =>{
            state.loading = true
            state.error = null
            state.success = false
        })
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) =>{
            // console.log(action.payload)
            state.loading = false
            state.error = null
            state.success = true
            state.userInformation = {...action.payload}
        })
        builder.addMatcher(authApi.endpoints.register.matchPending, (state, action) =>{
            // console.log(action.payload)
            state.loading = true
            state.error = null
            state.success = false
            // state.userInformation = {...action.payload}
        })
        builder.addMatcher(authApi.endpoints.register.matchPending, (state, action) =>{
            // console.log(action.payload)
            state.loading = true
            state.error = null
            state.success = false
            // state.userInformation = {...action.payload}
        })
        builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) =>{
            console.log(action.payload)
            state.loading = false
            state.error = null
            state.success = true
            // state.userInformation = {...action.payload}
        })
    },
  })
  
  export const {  } = authSlice.actions
  export default authSlice.reducer
  
  