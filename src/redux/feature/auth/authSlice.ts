import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearCookie } from "../../../utility/cookies";
import { authApi } from "./authApi";
interface IErrorPayload {
    error?: {
        code?: string;
        message?: string;
    };
}

export interface IInitialState {
    loading: boolean;
    error: undefined | null | string;
    message: null | string;
    success: boolean;
    userInformation: {
        id?: string;
        firstName?: string;
        lastName: string;
        email: string;
        streetName?: null;
        houseNumber?: null;
        zipCode?: number;
        city?: null;
        country?: null;
        phoneNumber?: null;
        aboutMe?: null;
        favGenres?: null;
    };
    otp: any[];
    resetEmail: string;
    isVerify: boolean;
}

export const initialState: IInitialState = {
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
        favGenres: null,
    },
    otp: Array(6).fill(""),
    resetEmail: "",
    isVerify: false,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            clearCookie('user')
            state.userInformation = initialState.userInformation
            state.loading = false
            state.error = null
            state.message = null
            state.otp = []
            state.resetEmail = ""
            state.success = false
        },
        setOtp: (state, action) => {
            state.otp = action.payload;
        },
        setResetEmail: (state, action) => {
            state.resetEmail = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setVerify: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchPending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.userInformation = { ...action.payload };
            }
        );
        builder.addMatcher(
            authApi.endpoints.login.matchRejected,
            (state, action: PayloadAction<any>) => {
                const error = (action.payload?.data as IErrorPayload)?.error;

                let errorMessage: string | undefined;

                if (typeof error === "object" && error !== null) {
                    errorMessage = error.message;
                }
                state.loading = false;
                state.error = errorMessage;
                state.success = false;
            }
        );
        builder.addMatcher(authApi.endpoints.register.matchPending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
            state.isVerify= false
        });
        builder.addMatcher(
            authApi.endpoints.register.matchFulfilled,
            (state, action) => {
                console.log(action.payload)
                state.loading = false;
                state.error = null;
                state.success = true;
                state.message = 'OTP has been sent to you email'
            }
        );
        builder.addMatcher(
            authApi.endpoints.register.matchRejected,
            (state, action: PayloadAction<any>) => {
                const error = (action.payload?.data);
                let errorMessage: string | undefined;
                if (typeof error === "object" && error !== null) {
                    errorMessage = error.error.message 
                }

                state.loading = false;
                state.error = errorMessage;
                state.success = false;
            }
        );
        builder.addMatcher(authApi.endpoints.sentOTP.matchPending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addMatcher(
            authApi.endpoints.sentOTP.matchFulfilled,
            (state) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.message = 'OTP has been sent to email.'
            }
        );
        builder.addMatcher(
            authApi.endpoints.sentOTP.matchRejected,
            (state, action) => {
                const error = (action.payload?.data as IErrorPayload)?.error;
                let errorMessage: string | undefined;
                if (typeof error === "object" && error !== null) {
                    errorMessage = error.message;
                }
                state.loading = false;
                state.error = errorMessage;
                state.success = false;
            }
        );
        builder.addMatcher(
            authApi.endpoints.verifyEmail.matchPending,
            (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            }
        );
        builder.addMatcher(
            authApi.endpoints.verifyEmail.matchFulfilled,
            (state, action) => {
                const data = action.payload
                state.loading = false;
                state.error = null;
                state.message = data?.message;
                state.success = true;
            }
        );
        builder.addMatcher(
            authApi.endpoints.verifyEmail.matchRejected,
            (state, action: PayloadAction<any>) => {
                const error = (action.payload?.data as IErrorPayload)?.error;
                let errorMessage: string | undefined;
                console.log(error)
                if (typeof error === "object" && error !== null) {
                    errorMessage = error.message;
                }
                console.log(errorMessage);
                state.loading = false;
                state.error = errorMessage;
                state.message = "";
                state.success = false;
                
            }
        );
        builder.addMatcher(
            authApi.endpoints.verifyOTP.matchPending,
            (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            }
        );
        builder.addMatcher(
            authApi.endpoints.verifyOTP.matchFulfilled,
            (state, action) => {
                const data = action.payload
                state.loading = false;
                state.error = null;
                state.message = data?.message;
                state.success = true;
            }
        );
        builder.addMatcher(
            authApi.endpoints.verifyOTP.matchRejected,
            (state, action: PayloadAction<any>) => {
                const error = (action.payload?.data as IErrorPayload)?.error;
                let errorMessage: string | undefined;
                if (typeof error === "object" && error !== null) {
                    errorMessage = error.message;
                }

                state.loading = false;
                state.error = errorMessage;
                state.message = "";
                state.success = false;
                
            }
        );
        builder.addMatcher(
            authApi.endpoints.resetPassword.matchPending,
            (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            }
        );
        builder.addMatcher(
            authApi.endpoints.resetPassword.matchFulfilled,
            (state, action) => {
                const data = action.payload
                console.log(data)
                state.loading = false;
                state.error = null;
                state.message = data?.message;
                state.success = true;
            }
        );
        builder.addMatcher(
            authApi.endpoints.resetPassword.matchRejected,
            (state, action: PayloadAction<any>) => {
                const error = (action.payload?.data as IErrorPayload)?.error;
                let errorMessage: string | undefined;
                
                if (typeof error === "object" && error !== null) {
                    errorMessage = error.message;
                }
                // console.log(errorMessage);
                state.loading = false;
                state.error = errorMessage;
                state.message = "";
                state.success = false;
                
            }
        );
    },
});

export const { setOtp, setResetEmail, setError, logout } = authSlice.actions;
export default authSlice.reducer;
