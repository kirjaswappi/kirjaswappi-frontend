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
        favGenres?: string[];
    };
    otp: any[];
    userEmail: string;
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
        favGenres: [],
    },
    otp: Array(6).fill(""),
    userEmail: "",
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
            state.userEmail = ""
            state.success = false
        },
        setOtp: (state, action) => {
            state.otp = action.payload;
        },
        setUserEmail: (state, action) => {
            state.userEmail = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setVerify: (state, action) => {
            state.error = action.payload;
        },
        setAuthMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
        setAuthSuccess: (state, action: PayloadAction<boolean>) => {
            state.success = action.payload;
        },
        setUserInformation : (state, action) => {
            state.userInformation = { ...initialState.userInformation, ...action.payload }
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
                console.log(action.payload)
                const { id, email } = action.payload
                state.loading = false;
                state.error = null;
                state.success = true;
                state.userInformation = { ...initialState.userInformation, id, email };
                state.message = 'Login Successfully Done.'
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
        builder.addMatcher(authApi.endpoints.getUserProfileImage.matchPending, (state, action) => {
            console.log(state, action)
        });
        builder.addMatcher(
            authApi.endpoints.getUserProfileImage.matchFulfilled,
            (state, action) => {
                // console.log(action.payload)
                
            }
        );
        builder.addMatcher(
            authApi.endpoints.getUserProfileImage.matchRejected,
            (state, action: PayloadAction<any>) => {
                console.log(state, action)
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
            (state) => {
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

export const { setOtp, setUserEmail, setError, logout, setAuthMessage, setAuthSuccess, setUserInformation } = authSlice.actions;
export default authSlice.reducer;
