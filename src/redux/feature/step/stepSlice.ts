import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IStepInitialState {
    step: number;
}

const initialState: IStepInitialState = {
    step: 0,
};
const stepSlice = createSlice({
    name: "step",
    initialState,
    reducers: {
        setStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload;
        },
    },
});

export const { setStep } = stepSlice.actions;
export default stepSlice.reducer;
