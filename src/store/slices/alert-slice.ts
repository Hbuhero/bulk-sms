import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
    message: string;
    type: "success" | "warning" | "error" | "info" | null;
    isVisible: boolean;
}

const initialState: AlertState = {
    message: "",
    type: null,
    isVisible: false,
};

export const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        showAlert: (state, action: PayloadAction<{ message: string; type: "success" | "warning" | "error" | "info" }>) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
            state.isVisible = true;
        },
        hideAlert: (state) => {
            state.message = "";
            state.type = null;
            state.isVisible = false;
        },
    },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
