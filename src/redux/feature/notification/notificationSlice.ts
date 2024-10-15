import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface INotificationInitialState {
    isShow: boolean;
    messageType: string | 'ERROR' | 'SUCCESS' | 'WARNING';
    message: string | null | undefined;
}

const initialState: INotificationInitialState = {
    isShow: false,
    messageType: '',
    message: ''
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
        setIsShow: (state, action: PayloadAction<boolean>) => {
            state.isShow = action.payload
        },
        setMessageType: (state, action: PayloadAction<string>) => {
            state.messageType = action.payload
        },
        setMessage: (state, action: PayloadAction<string | null | undefined>) => {
            state.message = action.payload
        },
    },
});

export const { setIsShow, setMessageType, setMessage, setMessages } = notificationSlice.actions;
export default notificationSlice.reducer;
