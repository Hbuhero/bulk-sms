import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import alertSlice from "./slices/alert-slice";

const persistConfig = {
    key: 'engage-hub-blast-root',
    storage,
    whitelist: ['user'], // Only persist user state
};

const rootReducer = combineReducers({
    user: authSlice,
    alert: alertSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatcher = typeof store.dispatch;
export const persistor = persistStore(store);
