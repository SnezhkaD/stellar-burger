import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi,
  TLoginData,
  TRegisterData
} from '../utils/burger-api';
import { TUser } from '../utils/types';

type TInitialState = {
  user: TUser;
  isLoading: boolean;
  isAuthChecked: boolean;
  errorText: string;
  isInit: boolean;
};

export const initialState: TInitialState = {
  user: { name: '', email: '' },
  isLoading: false,
  isAuthChecked: false,
  errorText: '',
  isInit: false
};

export const fetchLoginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => loginUserApi(data)
);

export const fetchRegisterUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const getUserThunk = createAsyncThunk('user/get', async () =>
  getUserApi()
);

export const fetchLogout = createAsyncThunk('user/logout', async () =>
  logoutApi()
);

export const fetchUpdateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init(state) {
      state.isInit = true;
    },
    setErrorText(state, action: PayloadAction<string>) {
      state.errorText = action.payload;
    },
    deleteErrorText(state) {
      state.errorText = '';
    }
  },
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectErrorText: (state) => state.errorText,
    selectIsInit: (state) => state.isInit
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errorText = action.error.message!;
      })
      .addCase(fetchRegisterUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errorText = action.error.message!;
      })
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = false;
        state.user = { name: '', email: '' };
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = { name: '', email: '' };
          state.isAuthChecked = false;
        }
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.user;
        }
      })
      .addCase(fetchLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.isLoading = true;
      });
  }
});
export const {
  selectIsLoading,
  selectUser,
  selectIsAuthChecked,
  selectErrorText,
  selectIsInit
} = userSlice.selectors;

export const { init, setErrorText, deleteErrorText } = userSlice.actions;
export default userSlice.reducer;
