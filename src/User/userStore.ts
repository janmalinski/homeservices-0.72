import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { showErrorToastAction } from '@src/Toast/toastStore';
import { getUser, updateUser, uploadUserAvatar } from './userApi';
import { UserDto } from './user.dto';

export interface IUserState {
  userFetchPending: boolean;
  errorFetchUser: string | null;
  userUpdatePending: boolean;
  errorUpdateUser: string | null;
  data: UserDto.userDetails | null;
  avatarPending: boolean;
  avatarError: string | null;
  fcmToken: string | null;
}

const initialState: IUserState = {
  userFetchPending: false,
  errorFetchUser: null,
  userUpdatePending: false,
  errorUpdateUser: null,
  data: null,
  avatarPending: false,
  avatarError: null,
  fcmToken: null,
};

interface IErrorStatus extends Error {
  response: {
    data: {
      message: string;
    };
  };
}

export const fetchUserThunk = createAsyncThunk(
  'user/fetch',
  async (_, thunkApi) => {
    try {
      const user = await getUser();
      return user;
    } catch (e) {
      const errorUser = e as IErrorStatus;
      const message = errorUser?.response?.data?.message;
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showErrorToastAction({ message }));
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const uploadUserAvatarThunk = createAsyncThunk(
  'user/uploadAvatar',
  async (avatarUrl: Parameters<typeof uploadUserAvatar>[0], thunkApi) => {
    try {
      const data = await uploadUserAvatar(avatarUrl);
      return data.avatarURL;
    } catch (e) {
      const errorUser = e as IErrorStatus;
      const message = errorUser?.response?.data?.message;
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showErrorToastAction({ message }));
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const updateUserThunk = createAsyncThunk(
  'user/update',
  async (args: Parameters<typeof updateUser>[0], thunkApi) => {
    try {
      const user = await updateUser(args);
      return user;
    } catch (e) {
      const errorUpdateUser = e as IErrorStatus;
      const message = errorUpdateUser?.response?.data?.message;
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showErrorToastAction({ message }));
      return thunkApi.rejectWithValue(message);
    }
  },
);

const userStore = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFcmTokenAction: (
      state,
      action: PayloadAction<string>,
    ) => {
      return {
        ...state,
        fcmToken: action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUserThunk.pending, state => {
      state.userFetchPending = true;
    });
    builder.addCase(fetchUserThunk.rejected, (state, { payload }) => {
      state.userFetchPending = false;
      state.errorFetchUser = payload as string;
    });
    builder.addCase(fetchUserThunk.fulfilled, (state, { payload }) => {
      state.userFetchPending = false;
      state.errorFetchUser = null;
      state.data = payload;
    });

    builder.addCase(uploadUserAvatarThunk.pending, state => {
      state.avatarPending = true;
    });
    builder.addCase(uploadUserAvatarThunk.rejected, (state, { payload }) => {
      state.avatarPending = false;
      state.avatarError = payload as string;
    });
    builder.addCase(uploadUserAvatarThunk.fulfilled, (state, { payload }) => {
      state.avatarPending = false;
      state.avatarError = null;
      state.data!.avatarUrl = payload;
    });

    builder.addCase(updateUserThunk.pending, state => {
      state.userUpdatePending = true;
    });
    builder.addCase(updateUserThunk.rejected, (state, { payload }) => {
      state.userUpdatePending = false;
      state.errorUpdateUser = payload as string;
    });
    builder.addCase(updateUserThunk.fulfilled, (state, { payload }) => {
      state.userUpdatePending = false;
      state.errorUpdateUser = null;
      state.data = payload;
    });
  },
});

export const {
  setFcmTokenAction
} = userStore.actions;

export default userStore.reducer;
