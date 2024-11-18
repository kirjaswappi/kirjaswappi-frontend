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
    },
});

export const { setMessages } = notificationSlice.actions;
export default notificationSlice.reducer;
