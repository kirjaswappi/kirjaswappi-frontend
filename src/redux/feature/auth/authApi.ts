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
                    headers: applicationJSON,
                };
            },
            onQueryStarted: async (_args, { queryFulfilled }) => {
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
        register: builder.mutation({
            query: (data) => {
                return {
                    url: "/users/signup",
                    method: "POST",
                    body: data,
                };
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
        sentOTP: builder.query({
            query: ({ email }) => {
                return {
                    url: `/send-otp?email=${email}`,
                    method: "GET",
                };
            },
        }),
        verifyOTP: builder.query({
            query: ({ email, otp }) => {
                return {
                    url: `/verify-otp?email=${email}&otp=${otp}`,
                    method: "GET",
                };
            },
        }),
        resetPassword: builder.mutation({
            query: (data) => {
                const { email } = data;
                return {
                    url: `/reset-password/${email}`,
                    method: "POST",
                    body: data,
                    headers: applicationJSON,
                };
            },
        }),
        deleteUser: builder.mutation({
            query: (id) => {
                return {
                    url: `/users/${id}`,
                    method: "DELETE",
                    // body: data,
                    headers: applicationJSON,
                };
            },
        }),
    }),
});

export const {
    useAuthenticateMutation,
    useRegisterMutation,
    useLoginMutation,
    useDeleteUserMutation,
    useLazySentOTPQuery,
    useLazyVerifyOTPQuery,
} = authApi;
