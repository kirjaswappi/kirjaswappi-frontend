import { createAsyncThunk } from '@reduxjs/toolkit'
import { logout } from './authAction'

// import { setCookie } from '../../../utils/cookies/cookies.auth'

export interface ISigningFormData {
  email: string
  password: string
}

interface IAuthResponse {
  access: string
  refresh: string
}

interface RefreshTokenResponse {
  access: string
  refresh: string
}

interface RefreshTokenError {
  message: string
}
const backendURL = import.meta.env.VITE_API_URL

export const userLogin = createAsyncThunk<
  IAuthResponse,
  ISigningFormData,
  { rejectValue: string }
>('auth/login', async (formData: ISigningFormData, { rejectWithValue }) => {
  try {
    const { email, password } = formData
    const userData = { email, password }

    const resp = await fetch(`${backendURL}/token/`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // if response is not ok then return error message
    if (!resp.ok) {
      const data = await resp.json()
      return rejectWithValue(`${data.message}`)
    }
    // response is ok than return data
    const response = await resp.json()
    return response.data
  } catch (error) {
    const castedError = error as any
    if (castedError.response && castedError.response.data?.details[0]) {
      return rejectWithValue(castedError.response.data?.details[0])
    }
    return rejectWithValue(castedError.message)
  }
})

export const refreshAuthToken = createAsyncThunk<
  RefreshTokenResponse,
  void,
  {
    rejectValue: RefreshTokenError
  }
>('auth/refreshToken', async (_, { dispatch }) => {
  try {
    const refreshToken = localStorage.getItem('refreshToken')
    if (refreshToken) {
      const resp = await fetch(`${backendURL}/token/refresh/`, {
        method: 'POST',
        body: JSON.stringify({ refresh: refreshToken }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const response = await resp.json()
      const { access, refresh } = response.data
      localStorage.setItem('userToken', access)
      localStorage.setItem('refreshToken', refresh)
      return response.data
    } else {
      dispatch(logout())
      throw new Error('No refresh token found')
    }
  } catch (error) {
    console.error(error)
    dispatch(logout())
    throw error
  }
})
