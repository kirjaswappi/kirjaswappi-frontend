import { applicationJSON } from "../../../utility/headersConstant";
import { getToken, setTokens } from "../../../utility/localStorage";

import { api } from "../../api/apiSlice";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        authenticate: builder.mutation<any, any>({
            query: (data) => {
                return {
                    url: "/authenticate",
                    method: "POST",
                    body: data,
                    headers: applicationJSON
                };
            },
            onQueryStarted: async (_agrs, {  queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        setTokens(data.jwtToken, data.refreshToken);
                    }
                } catch (error) {
                    console.error("Authentication failed:", error);
                }
            },
        }),
        login: builder.mutation({
            query: (data) => {
                return {
                    url: "/user/login",
                    method: "POST",
                    body: data,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getToken('jwtToken')}`
                    }
                };
            },
        }),
    }),
});

export const { useAuthenticateMutation, useLoginMutation } = authApi;
