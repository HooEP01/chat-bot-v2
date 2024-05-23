import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface FaqState {
    updateState: boolean,
    loading: boolean,
    items: FaqItem[],
    error: number,
}

interface Response {
    code: number,
    success: boolean,
    message: string,
}

interface FaqResponse extends Response {
    data: FaqItem[]
}

interface FaqItem {
    question: string,
    answer: string,
    type: string,
    upvotes: number
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
            const response: FaqResponse = await axios.get("https://localhost:8080/api/faq");
            if (response && response.success == true) {
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