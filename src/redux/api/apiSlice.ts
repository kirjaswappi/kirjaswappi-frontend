import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isTokenExpired } from "../../utility/getUser";
import { getTokens } from "../../utility/localStorage";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_REACT_MAIN_API,
        prepareHeaders: async (headers, {endpoint}) => {
          console.log(endpoint)
          if(endpoint === 'authenticate') return headers
            const { jwtToken, refreshToken } = getTokens();
            console.log('error', refreshToken)
            if (jwtToken && isTokenExpired(jwtToken)) {
              const response = await fetch(`${import.meta.env.VITE_REACT_MAIN_API}/authenticate/refresh`, {
                method: 'POST',
                body: JSON.stringify({ refreshToken }),
                headers: { 'Content-Type': 'application/json' },
              });
              console.log(response)
            } else if (jwtToken) {
                headers.set("Authorization", `Bearer ${jwtToken}`);
            }
            return headers;
        },
    }),
    tagTypes: [],
    endpoints: () => ({}),
});
