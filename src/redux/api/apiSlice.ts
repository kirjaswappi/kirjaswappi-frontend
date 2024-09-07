import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isTokenExpired } from "../../utility/getUser";
import { getTokens, setToken } from "../../utility/localStorage";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_REACT_MAIN_API,
        prepareHeaders: async (headers, {endpoint}) => {
          if(endpoint === 'authenticate') return headers
            const { jwtToken, refreshToken } = getTokens();
            let token = jwtToken
            if (token && isTokenExpired(token)) {
              await fetch(`${import.meta.env.VITE_REACT_MAIN_API}/authenticate/refresh`, {
                method: 'POST',
                body: JSON.stringify({ refreshToken }),
                headers: { 'Content-Type': 'application/json'},
              }).then((res) => res.json()).then((data) => {
                setToken('jwtToken', data?.jwtToken)
                token = data?.jwtToken
              })
            } 
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: [],
    endpoints: () => ({}),
});
