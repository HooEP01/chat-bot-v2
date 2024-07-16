import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import faqReducer from "./faq/faqSlice";
import faqTypeReducer from "./faqType/faqTypeSlice";
import authReducer from "./auth/authSlice";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    faq: faqReducer,
    faqType: faqTypeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;