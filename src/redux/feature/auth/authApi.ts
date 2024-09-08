import { applicationJSON } from "../../../utility/headersConstant";
import { setTokens } from "../../../utility/localStorage";

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
            onQueryStarted: async (_args, {  queryFulfilled }) => {
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
                    url: "/users/login",
                    method: "POST",
                    body: data,
                };
            },
        }),
        resetPassword: builder.mutation({
            query: (data) => {
                const {email} = data
                return {
                    url: `/reset-password/${email}`,
                    method: "POST",
                    body: data,
                    headers: applicationJSON
                }
            }
        })
    }),
});

export const { useAuthenticateMutation, useLoginMutation } = authApi;
