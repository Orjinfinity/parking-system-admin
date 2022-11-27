import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, LocalStorageKeys } from "../../interfaces";
import { ILoginProps, login } from "../../services";

interface InitialState {
    loading: boolean;
    isAuthenticated: boolean;
    user: IUser;
    error: string
}

const initialState: InitialState = {
    loading: false,
    isAuthenticated: false,
    user: {} as IUser,
    error: ''
}

export const loginAction = createAsyncThunk('auth/login', (payload: ILoginProps) => login(payload).then(response => response.data))

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checkUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = ''
        },
        logout: state => {
            state.user = {} as IUser;
            state.isAuthenticated = false;
            state.loading = false;
            localStorage.removeItem(LocalStorageKeys.AuthToken)
            localStorage.removeItem(LocalStorageKeys.User)
        }
    },
    extraReducers(builder) {
        builder.addCase(loginAction.pending, state => {
            state.loading = true
        })
        builder.addCase(loginAction.fulfilled, (state, action: PayloadAction<{
            accessToken: string;
            email: string;
            id: number;
            roles: Array<string>;
            username: string;
        }>) => {
            const { accessToken, email, id, username, roles } = action.payload;
            const user = { email, id, username, roles };
            state.loading = false;
            state.error = ''
            state.user = user;
            state.isAuthenticated = true;
            localStorage.setItem(LocalStorageKeys.AuthToken, accessToken)
            localStorage.setItem(LocalStorageKeys.User, JSON.stringify(user))
        })
        builder.addCase(loginAction.rejected, (state, action) => {
            state.loading = false;
            state.user = {} as IUser;
            state.error = action.error.message || 'Something went wrong'
        })
    },
})

export default authSlice.reducer
export const { checkUser, logout } = authSlice.actions