import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { State, StateStatus } from "../../model/state.model";
import { FaqTypeItem } from "../../model/faqType.model";
import { AxiosError, AxiosResponse } from "axios";
import apiClient from "../../utils/http";
import { Response, isSuccess } from "../../model/http.model";

interface FaqTypeState extends State {
    items: FaqTypeItem[],
}

interface FaqTypeResponse extends Response {
    data: FaqTypeItem[]
}

const initialState: FaqTypeState = {
    status: StateStatus.Idle,
    items: [],
    error: ""
}

export const fetchFaqType = createAsyncThunk(
    "faq/fetchFaqType",
    async (_, thunkApi) => {
        try {
            const response: AxiosResponse<FaqTypeResponse> = await apiClient.get("/faq-type");

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


const faqSlice = createSlice({
    name: "faq",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFaqType.pending, (state) => {
                state.status = StateStatus.Loading;
            })
            .addCase(fetchFaqType.fulfilled, (state, action) => {
                state.status = StateStatus.Succeeded;
                state.items = [...action.payload as FaqTypeItem[]];
            })
            .addCase(fetchFaqType.rejected, (state, action) => {
                state.status = StateStatus.Failed;
                state.error = action.error.message;
            })
    }
});

// export const { } = faqTypeSlice.actions;

export default faqSlice.reducer;