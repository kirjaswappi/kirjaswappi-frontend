import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
}

const initialState: IInitialState = {
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
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
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
                    // Check if error has a 'code' and 'message'
                    if (error.code === "invalidCredentials") {
                        errorMessage = "Invalid E-mail/Password.";
                    } else {
                        errorMessage = error.message;
                    }
                } else {
                    // Handle case where error is not an object
                    errorMessage = "An unknown error occurred";
                }
                state.loading = false;
                state.error = errorMessage;
                state.success = false;
            }
        );
        builder.addMatcher(authApi.endpoints.register.matchPending, (state) => {
            // console.log(action.payload)
            state.loading = true;
            state.error = null;
            state.success = false;
            // state.userInformation = {...action.payload}
        });
        builder.addMatcher(authApi.endpoints.register.matchPending, (state) => {
            // console.log(action.payload)
            state.loading = true;
            state.error = null;
            state.success = false;
            // state.userInformation = {...action.payload}
        });
        builder.addMatcher(
            authApi.endpoints.register.matchFulfilled,
            (state) => {
                // console.log(action.payload)
                state.loading = false;
                state.error = null;
                state.success = true;
                // state.userInformation = {...action.payload}
            }
        );
    },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
