import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import messaging from '@react-native-firebase/messaging';

import { register, verifyRegistrationCode, login } from './authApi';
import {
  showErrorToastAction,
  showSuccessToastAction,
} from '@src/Toast/toastStore';
import { accessTokenExpiresAtStorage, accessTokenStorage, refreshTokenStorage } from './authStorage';
import { t } from 'i18next';
import { store } from '@src/store';

export interface IAuthState {
  registerError: string | null;
  registerPending: boolean;
  verificationEmailSent: boolean;
  verifyRegistrationCodeError: string | null;
  verifyRegistrationCodePending: boolean;
  registered: boolean;
  loginError: string | null;
  loginStatusChanged: boolean;
  logoutError: string | null;
  logoutPending: boolean;
  // logoutSuccess: boolean;
  authTokenExpiredError: string | null;
  authTokenExpiredPending: boolean;
  authTokenExpired: boolean;
  authenticated: boolean;
}

const initialState: IAuthState = {
  registerError: null,
  registerPending: false,
  verificationEmailSent: false,
  verifyRegistrationCodeError: null,
  verifyRegistrationCodePending: false,
  registered: false,
  loginError: null,
  loginStatusChanged: false,
  logoutError: null,
  logoutPending: false,
  // logoutSuccess: false,
  authTokenExpiredError: null,
  authTokenExpiredPending: false,
  authTokenExpired: false,
  authenticated: false,
};

interface IErrorStatus extends Error {
  response: {
    data: {
      message: string;
    };
  };
}

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (args: Parameters<typeof register>[0], thunkApi) => {
    try {
      const message = await register(args);
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showSuccessToastAction(message));
    } catch (e) {
      const error = e as IErrorStatus;
      const message = error?.response?.data?.message;
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showErrorToastAction({ message }));
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const verifyRegistrationCodeThunk = createAsyncThunk(
  'auth/verifyRegistrationCode',
  async (code: Parameters<typeof verifyRegistrationCode>[0], thunkApi) => {
    try {
      const message = await verifyRegistrationCode(code);
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showSuccessToastAction(message));
    } catch (e) {
      const error = e as IErrorStatus;
      const message = error?.response?.data?.message;
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showErrorToastAction({ message }));
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (args: Parameters<typeof login>[0], thunkApi) => {
    try {
      const data = await login(args);
      const {accessToken, accessTokenExpiresAt, refreshToken, } = data;
      await accessTokenStorage.write(accessToken);
      await refreshTokenStorage.write(refreshToken);
      await accessTokenExpiresAtStorage.write(String(accessTokenExpiresAt));
      return data;
    } catch (e) {
      const error = e as IErrorStatus;
      const message = error?.response?.data?.message;
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showErrorToastAction({ message }));
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      await accessTokenStorage.clearAll(); 
      await refreshTokenStorage.clearAll();
      await accessTokenExpiresAtStorage.clearAll();  

      await messaging().deleteToken();
      return {message: 'User looged out'};
    } catch (error) {
      //ADD SOME TRANSLATIONS  LATER
      thunkApi.dispatch(
        showErrorToastAction({ message: t('common.somethingWentWrong') }),
      );
      return thunkApi.rejectWithValue('Logout error');
    }
  },
);

// export const checkAuthTokenExpirationThunk = createAsyncThunk(
//   'auth/checkTokenExpiration',
//   async (_, thunkApi) => {
//     try {
//       const authTokenExpiriesIn = store.getState().auth.authTokenExpiriesIn;

//       if (
//         authTokenExpiriesIn !== null &&
//         authTokenExpiriesIn > Math.floor(Date.now() / 1000)
//       ) {
//         return false;
//       } else if (
//         authTokenExpiriesIn !== null &&
//         authTokenExpiriesIn < Math.floor(Date.now() / 1000)
//       ) {
//         thunkApi.dispatch(logoutThunk());
//         return true;
//       }
//     } catch (error) {
//       //ADD SOME TRANSLATIONS  LATER
//       thunkApi.dispatch(
//         showErrorToastAction({ message: t('common.somethingWentWrong') }),
//       );
//       return thunkApi.rejectWithValue('Check token expiration check error');
//     }
//   },
// );

const authStore = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(registerThunk.pending, state => {
      state.registerPending = true;
    });
    builder.addCase(registerThunk.rejected, (state, { payload }) => {
      state.registerPending = false;
      state.registerError = payload as string;
    });
    builder.addCase(registerThunk.fulfilled, state => {
      state.registerPending = false;
      state.registerError = null;
      state.verificationEmailSent = true;
    });

    builder.addCase(verifyRegistrationCodeThunk.pending, state => {
      state.verifyRegistrationCodePending = true;
    });
    builder.addCase(
      verifyRegistrationCodeThunk.rejected,
      (state, { payload }) => {
        state.verifyRegistrationCodePending = false;
        state.verifyRegistrationCodeError = payload as string;
      },
    );
    builder.addCase(verifyRegistrationCodeThunk.fulfilled, state => {
      state.verifyRegistrationCodePending = false;
      state.verifyRegistrationCodeError = null;
      state.registered = true;
    });
    builder.addCase(loginThunk.rejected, (state, { payload }) => {
      state.loginError = payload as string;
    });
    builder.addCase(loginThunk.fulfilled, state => {
      state.loginError = null;
      // state.logoutSuccess = false;
      state.loginStatusChanged = !state.loginStatusChanged;

      state.authenticated = true;
    });

    builder.addCase(logoutThunk.pending, state => {
      state.logoutPending = true;
    });
    builder.addCase(logoutThunk.rejected, (state, { payload }) => {
      state.logoutPending = false;
      state.logoutError = payload as string;
    });
    builder.addCase(logoutThunk.fulfilled, state => {
      state.logoutPending = false;
      state.logoutError = null;
      // state.logoutSuccess = true;
      state.loginStatusChanged = !state.loginStatusChanged;
      state.authenticated = false;
    });

    // builder.addCase(checkAuthTokenExpirationThunk.pending, state => {
    //   state.authTokenExpiredPending = true;
    // });
    // builder.addCase(
    //   checkAuthTokenExpirationThunk.rejected,
    //   (state, { payload }) => {
    //     state.authTokenExpiredPending = false;
    //     state.authTokenExpiredError = payload as string;
    //   },
    // );
    // builder.addCase(
    //   checkAuthTokenExpirationThunk.fulfilled,
    //   (state, { payload }) => {
    //     state.authTokenExpiredPending = false;
    //     state.authTokenExpiredError = null;
    //     state.authTokenExpired = payload as boolean;
    //   },
    // );
  },
});

export default authStore.reducer;
