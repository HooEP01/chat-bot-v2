import { configureStore } from "@reduxjs/toolkit";
import faqReducer from "./faq/faqSlice";
import faqTypeReducer from "./faqType/faqTypeSlice";

export const store = configureStore({
    reducer: {
        faq: faqReducer,
        faqType: faqTypeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;