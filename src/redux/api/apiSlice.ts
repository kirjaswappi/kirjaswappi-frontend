import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { getUserData } from '../../utility/getUser'
import { logout, setToken, setUserInfo } from '../feature/auth/authAction'
import { refreshAuthToken } from '../feature/auth/authSlice'


const baseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
) => {
  const result = await fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  })(args, api, extraOptions)
  if (result?.error?.status === 401) {
    const refreshResult = await api.dispatch(refreshAuthToken()).unwrap()
    if (refreshResult) {
      // token set in setToken
      api.dispatch(setToken(refreshResult.access))
      // decode user and data store in setUserInfo
      api.dispatch(setUserInfo(getUserData(refreshResult.access)))

      return await fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL })(
        args,
        api,
        extraOptions,
      )
    } else {
      api.dispatch(logout())
    }
  } else if (result?.error?.status === 'FETCH_ERROR') {
    api.dispatch(logout())
  }
  return result
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery as any,
  tagTypes: [],
  endpoints: () => ({}),
})
