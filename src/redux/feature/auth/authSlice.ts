// import { createAsyncThunk } from '@reduxjs/toolkit'

import { createAsyncThunk } from "@reduxjs/toolkit";

// // import { setCookie } from '../../../utils/cookies/cookies.auth'

// export interface ISigningFormData {
//   email: string
//   password: string
// }

// interface IAuthResponse {
//   access: string
//   refresh: string
// }

// interface RefreshTokenResponse {
//   access: string
//   refresh: string
// }

// interface RefreshTokenError {
//   message: string
// }
// const backendURL = import.meta.env.VITE_API_URL

export const userLogin = createAsyncThunk(
    "auth/login",
    async (formData: any, { rejectWithValue }) => {
        try {
            await fetch(`${import.meta.env.VITE_REACT_MAIN_API}/authenticate`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => res.json())
                .then((res) => {
                    return res;
                })
                .catch((error) => console.log(error));
        } catch (error) {
            const castedError = error as any;
            if (castedError.response && castedError.response.data?.details[0]) {
                return rejectWithValue(castedError.response.data?.details[0]);
            }
            return rejectWithValue(castedError.message);
        }
    }
);

// export const refreshAuthToken = createAsyncThunk<
//   RefreshTokenResponse,
//   void,
//   {
//     rejectValue: RefreshTokenError
//   }
// >('auth/refreshToken', async (_, { dispatch }) => {
//   try {
//     const refreshToken = localStorage.getItem('refreshToken')
//     if (refreshToken) {
//       const resp = await fetch(`${backendURL}/token/refresh/`, {
//         method: 'POST',
//         body: JSON.stringify({ refresh: refreshToken }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//       const response = await resp.json()
//       const { access, refresh } = response.data
//       localStorage.setItem('userToken', access)
//       localStorage.setItem('refreshToken', refresh)
//       return response.data
//     } else {
//       dispatch(logout())
//       throw new Error('No refresh token found')
//     }
//   } catch (error) {
//     console.error(error)
//     // dispatch(logout())
//     throw error
//   }
// })
