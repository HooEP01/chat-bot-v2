import { configureStore } from "@reduxjs/toolkit";
import faqReducer from "./faq/faqSlice";
import faqTypeReducer from "./faqType/faqTypeSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
    reducer: {
        faq: faqReducer,
        faqType: faqTypeReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;