import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { State, StateStatus } from "../../model/state.model";
import { LoginForm, RegisterForm, User } from "../../model/user.model";
import apiClient from "../../utils/http";
import { AxiosError } from "axios";
import { isSuccess } from "../../model/http.model";
import { CustomToastNotify } from "../../components/CustomToast";

interface AuthState extends State {
    item: User,
    token: string,
}

const initialState: AuthState = {
    status: StateStatus.Idle,
    item: {} as User,
    error: "",
    token: ""
}

export const login = createAsyncThunk(
    "auth/login",
    async (loginForm: LoginForm, thunkApi) => {
        try {
            const response = await apiClient.post("/auth/login", loginForm);
            const { data, success, message } = response.data;

            if (isSuccess(response.data)) {
                CustomToastNotify(success, message);
                return thunkApi.fulfillWithValue(data);
            }
        } catch (error) {
            const err = error as AxiosError
            return thunkApi.rejectWithValue(err.response?.status);
        }
    }
)

// TODO: need implement register
export const register = createAsyncThunk(
    "auth/register",
    async (registerForm: RegisterForm, thunkApi) => {
        try {
            const response = await apiClient.post("/auth/register", registerForm);
            const { data, success, message } = response.data;

            if (isSuccess(response.data)) {
                CustomToastNotify(success, message);
                return thunkApi.fulfillWithValue(data);
            }
        } catch (error) {
            const err = error as AxiosError
            return thunkApi.rejectWithValue(err.response?.status);
        }
    }
)

// TODO: need implement logout
export const logout = createAsyncThunk(
    "auth/logout",
    async (_, thunkApi) => {
        try {
            const response = await apiClient.post("/auth/logout");
            const { data, success, message } = response.data;

            if (isSuccess(response.data)) {
                CustomToastNotify(success, message);
                return thunkApi.fulfillWithValue(data);
            }
        } catch (error) {
            const err = error as AxiosError
            return thunkApi.rejectWithValue(err.response?.status);
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = StateStatus.Loading;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = StateStatus.Succeeded;

                const { token = "", user = {} } = action.payload || {};

                if (!token || !user) {
                    state.status = StateStatus.Failed;
                    state.error = "Invalid response";
                    return;
                }

                state.token = token;
                state.item = user;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = StateStatus.Failed;
                state.error = action.error.message ?? "unknown error!";
            })
    }
});

export default authSlice.reducer;