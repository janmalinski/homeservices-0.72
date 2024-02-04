import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import i18n from 'i18next';

import { getRoles, getTypesOfEmployment } from './assessmentApi';
import { showErrorToastAction } from '@src/Toast/toastStore';

// import { signOutThunk } from '../Auth/authStore';

export interface IPayload {
  id: string;
  name: string;
}

export interface IRoleState {
  roles: IPayload[];
  rolesPending: boolean;
  rolesError: string | null;
}

export interface ITypesOfEmploymentState {
  typesOfEmployment: IPayload[];
  typesOfEmploymentPending: boolean;
  typesOfEmploymentError: string | null;
}

const initialState: IRoleState & ITypesOfEmploymentState = {
  roles: [],
  rolesPending: false,
  rolesError: '',
  typesOfEmployment: [],
  typesOfEmploymentPending: false,
  typesOfEmploymentError: '',
};

interface IErrorStatus extends Error {
  response: {
    data: {
      message: string;
    };
  };
}

export const fetchRolesThunk = createAsyncThunk(
  'roles/fetch',
  async (_, thunkApi) => {
    try {
      const response = await getRoles();
      const roles = response.data.roles;
      if (roles.length === 0) {
        thunkApi.dispatch(
          showErrorToastAction({
            message: i18n.t('common.somethingWentWrong'),
          }),
        );
        return thunkApi.rejectWithValue('Something went wrong');
      }

      return roles;
    } catch (e) {
      const error = e as IErrorStatus;
      console.log("ERROR", error)
      thunkApi.dispatch(
        showErrorToastAction({ message: i18n.t('common.somethingWentWrong') }),
      );
      const message = error?.response?.data?.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const fetchTypesOfEmploymentThunk = createAsyncThunk(
  'typesofemployment/fetch',
  async (_, thunkApi) => {
    try {
      const response = await getTypesOfEmployment();
      const typesOfEmployment = response.data.typeemployments;
      if (typesOfEmployment.length === 0) {
        thunkApi.dispatch(
          showErrorToastAction({
            message: i18n.t('common.somethingWentWrong'),
          }),
        );
        return thunkApi.rejectWithValue('Something went wrong');
      }
      return typesOfEmployment;
    } catch (e) {
      const error = e as IErrorStatus;
      const message = error?.response?.data?.message;
      thunkApi.dispatch(
        showErrorToastAction({ message: i18n.t('common.somethingWentWrong') }),
      );
      return thunkApi.rejectWithValue(message);
    }
  },
);

const assessmentStore = createSlice({
  name: 'assessment',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRolesThunk.pending, state => {
      state.rolesPending = true;
      state.rolesError = null;
    });
    builder.addCase(fetchRolesThunk.rejected, (state, { payload }) => {
      state.rolesPending = false;
      state.rolesError = payload as string;
    });
    builder.addCase(fetchRolesThunk.fulfilled, (state, { payload }) => {
      state.rolesPending = false;
      state.rolesError = null;
      state.roles = payload;
    });
    builder.addCase(fetchTypesOfEmploymentThunk.pending, state => {
      state.typesOfEmploymentPending = true;
      state.typesOfEmploymentError = null;
    });
    builder.addCase(
      fetchTypesOfEmploymentThunk.rejected,
      (state, { payload }) => {
        state.typesOfEmploymentPending = false;
        state.typesOfEmploymentError = payload as string;
      },
    );
    builder.addCase(
      fetchTypesOfEmploymentThunk.fulfilled,
      (state, { payload }) => {
        state.typesOfEmploymentPending = false;
        state.typesOfEmploymentError = null;
        state.typesOfEmployment = payload;
      },
    );
    //   builder.addCase(signOutThunk.fulfilled, () => ({ ...initialState }));
  },
});

export default assessmentStore.reducer;
