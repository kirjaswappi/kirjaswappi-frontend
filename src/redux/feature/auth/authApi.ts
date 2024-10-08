import { setCookie } from "../../../utility/cookies";
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
            onQueryStarted: async (_args, { queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        setCookie("user", data, 24);
                    }
                } catch (error) {
                    console.error("Can't set data in cookie. failed:", error);
                }
            },
        }),
        sentOTP: builder.query({
            query: ({ email }) => {
                return {
                    url: `/send-otp`,
                    method: "POST",
                    body: { email: email },
                };
            },
        }),
        verifyEmail: builder.mutation({
            query: ({ email, otp }) => {
                return {
                    url: `/users/verify-email`,
                    method: "POST",
                    body: { email: email, otp: otp },
                };
            },
        }),
        verifyOTP: builder.query({
            query: ({ email, otp }) => {
                return {
                    url: `/verify-otp`,
                    method: "POST",
                    body: { email: email, otp: otp },
                };
            },
        }),
        resetPassword: builder.mutation({
            query: (data) => {
                const { email } = data;
                const reset_password_data = {
                    newPassword: data?.newPassword,
                    confirmPassword: data?.confirmPassword,
                }
                return {
                    url: `/users/reset-password/${email}`,
                    method: "POST",
                    body: reset_password_data,
                    // headers: applicationJSON,
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
    useVerifyEmailMutation,
    useLazySentOTPQuery,
    useLazyVerifyOTPQuery,
    useResetPasswordMutation,
} = authApi;
