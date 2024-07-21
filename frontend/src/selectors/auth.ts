import { RootState } from "../store";

export const getIsAuth = () => (state: RootState) => state.auth.isAuth;
export const getToken = () => (state: RootState) => state.auth.token;
export const getStatus = () => (state: RootState) => state.auth.status;