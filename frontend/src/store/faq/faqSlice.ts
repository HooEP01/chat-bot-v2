import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import apiClient from "../../utils/http";
import { Response, isSuccess } from "../../model/http.model";
import { FaqForm, FaqItem } from "../../model/faq.model";
import { State, StateStatus } from "../../model/state.model";

interface FaqState extends State {
    items: FaqItem[],
}

interface FaqResponse extends Response {
    data: FaqItem[]
}

const initialState: FaqState = {
    status: StateStatus.Idle,
    items: [],
    error: ""
}

export const fetchFaq = createAsyncThunk(
    "faq/fetchFaq",
    async (_, thunkApi) => {
        try {
            const response: AxiosResponse<FaqResponse> = await apiClient.get("/faq");

            if (isSuccess(response.data)) {
                // TODO: need improve
                return thunkApi.fulfillWithValue(response.data.data);
            }
        } catch (error) {
            const err = error as AxiosError
            return thunkApi.rejectWithValue(err.response?.status);
        }
    }
)

export const createFaq = createAsyncThunk(
    "faq/createFaq",
    async (newFaq: FaqForm, thunkApi) => {
        try {
            const response = await apiClient.post("/faq", newFaq)

            if (isSuccess(response.data)) {
                return thunkApi.fulfillWithValue(response.data.data);
            }
        } catch (error) {
            const err = error as AxiosError
            return thunkApi.rejectWithValue(err.response?.status);
        }
    }
)

export const updateFaq = createAsyncThunk(
    "faq/updateFaq",
    async (editFaq: FaqForm, thunkApi) => {
        try {
            const response = await apiClient.post(`/faq/${editFaq.id}`, editFaq)

            if (isSuccess(response.data)) {
                return thunkApi.fulfillWithValue(response.data.data);
            }
        } catch (error) {
            const err = error as AxiosError
            return thunkApi.rejectWithValue(err.response?.status);
        }
    }
)

export const deleteFaq = createAsyncThunk(
    "faq/deleteFaq",
    async (id, thunkApi) => {
        try {
            const response = await apiClient.delete(`/faq/${id}`);
            if (isSuccess(response.data)) {
                return thunkApi.fulfillWithValue(response.data.data);
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFaq.pending, (state) => {
                state.status = StateStatus.Loading;
            })
            .addCase(fetchFaq.fulfilled, (state, action) => {
                state.status = StateStatus.Succeeded;
                state.items = [...action.payload as FaqItem[]];
            })
            .addCase(fetchFaq.rejected, (state, action) => {
                state.status = StateStatus.Failed;
                state.error = action.error.message;
            })
            .addCase(createFaq.pending, (state) => {
                state.status = StateStatus.Loading;
            })
            .addCase(createFaq.fulfilled, (state, action) => {
                state.status = StateStatus.Succeeded;
                state.items = [...state.items, ...action.payload];
            })
            .addCase(createFaq.rejected, (state, action) => {
                state.status = StateStatus.Failed;
                state.error = action.error.message;
            })
            .addCase(updateFaq.pending, (state) => {
                state.status = StateStatus.Loading;
            })
            .addCase(updateFaq.fulfilled, (state, action) => {
                state.status = StateStatus.Succeeded;
                state.items = [...state.items, ...action.payload];
            })
            .addCase(updateFaq.rejected, (state, action) => {
                state.status = StateStatus.Failed;
                state.error = action.error.message;
            })
            .addCase(deleteFaq.pending, (state) => {
                state.status = StateStatus.Loading;
            })
            .addCase(deleteFaq.fulfilled, (state, action) => {
                state.status = StateStatus.Succeeded;
                state.items = [...state.items, ...action.payload];
            })
            .addCase(deleteFaq.rejected, (state, action) => {
                state.status = StateStatus.Failed;
                state.error = action.error.message;
            });
    }
});

// export const { } = faqSlice.actions;

export default faqSlice.reducer;