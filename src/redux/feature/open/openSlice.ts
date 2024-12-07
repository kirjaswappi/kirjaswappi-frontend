import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IOpenInitialState {
    open: boolean;
    swapModal: boolean
}

const initialState: IOpenInitialState = {
    open: false,
    swapModal: false
};
const openSlice = createSlice({
    name: "open",
    initialState,
    reducers: {
        setOpen: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
        setSwapModal: (state, action: PayloadAction<boolean>) => {
            state.swapModal = action.payload;
        }
    },
});

export const { setOpen, setSwapModal } = openSlice.actions;
export default openSlice.reducer;
