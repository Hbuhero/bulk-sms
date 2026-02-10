import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    accessToken: string | null;
    refreshToken: string | null;
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
    } | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    accessToken: null,
    refreshToken: null,
    user: null,
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ accessToken: string; refreshToken: string; user: any }>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.user = null;
            state.isAuthenticated = false;
        },
        setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        updateUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
    },
});

export const { login, logout, setTokens, updateUser } = authSlice.actions;

export default authSlice.reducer;
