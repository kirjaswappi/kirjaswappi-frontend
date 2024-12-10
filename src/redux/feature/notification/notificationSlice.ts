import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface INotificationInitialState {
    isShow: boolean;
    messageType: string | 'ERROR' | 'SUCCESS' | 'WARNING';
    message: string | null | undefined;
    showAlert: boolean;
    alertMessage: string | null | undefined;
    alertType:  string | null | undefined;
}

const initialState: INotificationInitialState = {
    isShow: false,
    messageType: '',
    message: '',
    showAlert: false,
    alertMessage: "",
    alertType: ""
};
const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<{type: string, isShow: boolean, message: string | undefined | null}>) => {
            const { isShow, message, type } = action.payload
            state.isShow = isShow;
            state.message = message
            state.messageType = type 
        },
        setAlert: (
            state,
            action: PayloadAction<{ showAlert: boolean; message?: string; alertType?: string }>
        ) => {
            const { showAlert, message, alertType } = action.payload;
            state.showAlert = showAlert;
            state.message = message;
            state.alertType = alertType
        },
    },
});

export const { setMessages, setAlert } = notificationSlice.actions;
export default notificationSlice.reducer;
