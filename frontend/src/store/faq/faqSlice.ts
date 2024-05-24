import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import apiClient from "../../utils/http";
import { Response, isSuccess } from "../../model/http.model";

interface FaqState {
    updateState: boolean,
    loading: boolean,
    items: FaqItem[],
    error: number,
}
interface FaqResponse extends Response {
    data: FaqItem[]
}

interface FaqItem {
    id: number,
    parent_id?: number,
    faq_type_id?: number,
    question: string,
    answer: string,
}

const initialState: FaqState = {
    updateState: false,
    loading: false,
    items: [],
    error: 0
}

export const fetchFaq = createAsyncThunk(
    "faq/fetchFaq",
    async (_, thunkApi) => {
        try {
            const response: FaqResponse = await apiClient.get("/faq");
            
            if (isSuccess(response)) {
                return thunkApi.fulfillWithValue(response.data);
            }
        } catch (error) {
            const err = error as AxiosError
            return thunkApi.rejectWithValue(err.response?.status);
        }
    }
)

const faqSlice = createSlice({
    name: "faq",
    initialState,
    reducers: {
        changeStateTrue: (state) => {
            state.updateState = true;
        },
        changeStateFalse: (state) => {
            state.updateState = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFaq.fulfilled, (state, action) => {
                state.items = [...action.payload as FaqItem[]];
            })
            .addCase(fetchFaq.rejected, (state, action) => {
                state.error = action.payload as number
            });
    }
});

// export const { } = faqSlice.actions;

export default faqSlice.reducer;