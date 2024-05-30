import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { State, StateStatus } from "../../model/state.model";
import { FaqTypeForm, FaqTypeItem } from "../../model/faqType.model";
import { AxiosError, AxiosResponse } from "axios";
import apiClient from "../../utils/http";
import { Response, isSuccess } from "../../model/http.model";
import { RootState } from "..";
import _ from "lodash";

interface FaqTypeState extends State {
    items: FaqTypeItem[],
    pendingItems: [],
}

interface FaqTypeResponse extends Response {
    data: FaqTypeItem[]
}

const initialState: FaqTypeState = {
    status: StateStatus.Idle,
    items: [],
    pendingItems: [],
    error: ""
}

export const fetchFaqType = createAsyncThunk(
    "faqType/fetchFaqType",
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


export const createFaqType = createAsyncThunk(
    "faqType/createFaqType",
    async (newFaqType: FaqTypeForm, thunkApi) => {
        try {
            const response = await apiClient.post("/faq-type", newFaqType);

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


export const batchCreateFaqTypes = createAsyncThunk(
    "faqType/batchCreateFaqTypes",
    async (_x, thunkApi) => {
        try {
            const state = thunkApi.getState() as RootState;
            const pendingItems = state.faqType.pendingItems;

            if (_.isEmpty(pendingItems)) {
                return
            }

            const response: AxiosResponse<FaqTypeResponse> = await apiClient.get("/faq-types", { items: pendingItems } as object);

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
            .addCase(createFaqType.pending, (state) => {
                state.status = StateStatus.Loading;
            })
            .addCase(createFaqType.fulfilled, (state, action) => {
                state.status = StateStatus.Succeeded;
                state.items = [...state.items, action.payload];
            })
            .addCase(createFaqType.rejected, (state, action) => {
                state.status = StateStatus.Failed;
                state.error = action.error.message;
            })
            .addCase(batchCreateFaqTypes.pending, (state) => {
                state.status = StateStatus.Loading;
            })
            .addCase(batchCreateFaqTypes.fulfilled, (state) => {
                state.status = StateStatus.Succeeded;
                // state.items = [...state.items, action.payload];
            })
            .addCase(batchCreateFaqTypes.rejected, (state, action) => {
                state.status = StateStatus.Failed;
                state.error = action.error.message;
            })
    }
});

// export const { } = faqTypeSlice.actions;

export default faqSlice.reducer;