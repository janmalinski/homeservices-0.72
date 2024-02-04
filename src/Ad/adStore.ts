import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { showErrorToastAction } from '@src/Toast/toastStore';
import { getServices, createAd, updateAd, getAds } from './adApi';
import { AdDto } from './ad.dto';

export interface IAddState {
  servicesPending: boolean;
  servicesError: string | null;
  services: AdDto.Service[] | null;
  adPending: boolean;
  adError: string | null;
  updatePending: boolean;
  updateError: string | null;
  ad: AdDto.AdDetails | null;
  adsPending: boolean;
  adsError: string | null;
  ads: AdDto.AdDetails[] | null;
}

const initialState: IAddState = {
  servicesPending: false,
  servicesError: null,
  services: null,
  adPending: false,
  adError: null,
  updatePending: false,
  updateError: null,
  ad: null,
  adsPending: false,
  adsError: null,
  ads: null,
};

interface IErrorStatus extends Error {
  response: {
    data: {
      message: string;
    };
  };
}

export const fetchServicesThunk = createAsyncThunk(
  'services/fetch',
  async (_, thunkApi) => {
    try {
      const services = await getServices();
      return services;
    } catch (e) {
      const error = e as IErrorStatus;
      const message = error?.response?.data?.message;
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showErrorToastAction({ message }));
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const createAdThunk = createAsyncThunk(
  'ad/create',
  async (args: Parameters<typeof createAd>[0], thunkApi) => {
    try {
      const ad = await createAd(args);
      return ad;
    } catch (e) {
      const error = e as IErrorStatus;
      const message = error?.response?.data?.message;
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showErrorToastAction({ message }));
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const updateAdThunk = createAsyncThunk(
  'ad/update',
  async (args: Parameters<typeof updateAd>[0], thunkApi) => {
    try {
      const ad = await updateAd(args);
      return ad;
    } catch (e) {
      const error = e as IErrorStatus;
      const message = error?.response?.data?.message;
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showErrorToastAction({ message }));
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const fetchAdsThunk = createAsyncThunk(
  'ads/fetch',
  async (_, thunkApi) => {
    try {
      const ads = await getAds();
      return ads;
    } catch (e) {
      const error = e as IErrorStatus;
      const message = error?.response?.data?.message;
      thunkApi.dispatch(showErrorToastAction({ message }));
      return thunkApi.rejectWithValue(message);
    }
  },
);

const adStore = createSlice({
  name: 'ad',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchServicesThunk.pending, state => {
      state.servicesPending = true;
    });
    builder.addCase(fetchServicesThunk.rejected, (state, { payload }) => {
      state.servicesPending = false;
      state.servicesError = payload as string;
    });
    builder.addCase(fetchServicesThunk.fulfilled, (state, { payload }) => {
      state.servicesPending = false;
      state.servicesError = null;
      state.services = payload;
    });

    builder.addCase(createAdThunk.pending, state => {
      state.adPending = true;
    });
    builder.addCase(createAdThunk.rejected, (state, { payload }) => {
      state.adPending = false;
      state.adError = payload as string;
    });
    builder.addCase(createAdThunk.fulfilled, (state, { payload }) => {
      state.adPending = false;
      state.adError = null;
      state.ad = payload;
    });

    builder.addCase(updateAdThunk.pending, state => {
      state.updatePending = true;
    });
    builder.addCase(updateAdThunk.rejected, (state, { payload }) => {
      state.updatePending = false;
      state.updateError = payload as string;
    });
    builder.addCase(updateAdThunk.fulfilled, (state, { payload }) => {
      state.updatePending = false;
      state.updateError = null;
      state.ad = payload;
    });

    builder.addCase(fetchAdsThunk.pending, state => {
      state.adsPending = true;
    });
    builder.addCase(fetchAdsThunk.rejected, (state, { payload }) => {
      state.adsPending = false;
      state.adsError = payload as string;
    });
    builder.addCase(fetchAdsThunk.fulfilled, (state, { payload }) => {
      state.adsPending = false;
      state.adsError = null;
      state.ads = payload;
    });
  },
});

export default adStore.reducer;
