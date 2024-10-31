import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IOpenInitialState {
    open: boolean;
}

const initialState: IOpenInitialState = {
    open: false,
};
const openSlice = createSlice({
    name: "open",
    initialState,
    reducers: {
        setOpen: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        },
    },
});

export const { setOpen } = openSlice.actions;
export default openSlice.reducer;
