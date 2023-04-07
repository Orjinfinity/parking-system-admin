import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, LocalStorageKeys } from '../../interfaces';
import { errorMessage, ILoginProps, login } from '../../services';

interface InitialState {
  loading: boolean;
  isAuthenticated: boolean;
  user: IUser;
  error: string;
}

const initialState: InitialState = {
  loading: false,
  isAuthenticated: false,
  user: {} as IUser,
  error: '',
};

const LoginRoles = ['ROLE_ADMIN', 'ROLE_APARTMENTADMIN', 'ROLE_MODERATOR'];

export const loginAction = createAsyncThunk(
  'auth/login',
  (payload: ILoginProps) => login(payload).then((response) => response.data)
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = '';
    },
    logout: () => {
      localStorage.removeItem(LocalStorageKeys.AuthToken);
      localStorage.removeItem(LocalStorageKeys.User);
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(loginAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      loginAction.fulfilled,
      (
        state,
        action: PayloadAction<{
          accessToken: string;
          email: string;
          id: number;
          roles: Array<string>;
          username: string;
        }>
      ) => {
        const { accessToken, email, id, username, roles } = action.payload;
        const user = { email, id, username, roles };
        const isIncludeRole = roles.some(role => LoginRoles.includes(role));
        state.loading = false;
        state.error = '';
        if(isIncludeRole) {
          state.user = user;
          state.isAuthenticated = true;
          localStorage.setItem(LocalStorageKeys.AuthToken, accessToken);
          localStorage.setItem(LocalStorageKeys.User, JSON.stringify(user));
        } else {
          state.isAuthenticated = false;
          errorMessage(`${roles[0].replace('ROLE_', '')} rolünün giriş yetkisi bulunmamaktadır.`)
        }
      }
    );
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.user = {} as IUser;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default authSlice.reducer;
export const { checkUser, logout } = authSlice.actions;
