import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastVariant } from './ToastComponent/Interfaces';

interface IToastState {
  message: string | null;

  variant?: ToastVariant;
  isDismissable?: boolean;
  btnLabel?: string;
  btnCallback?: () => void;
  autoHideTimeout?: number;
}

type TShowToastPayload = Omit<IToastState, 'variant'>;

const DEFAULT_AUTOHIDE_TIMOUT = 3000;

const initialState: IToastState = {
  message: null,
};

const toastStore = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    hideGlobalToastAction: () => {
      return { ...initialState };
    },
    showSuccessToastAction: (
      state,
      action: PayloadAction<TShowToastPayload>,
    ) => {
      return {
        ...state,
        variant: 'success',
        ...action.payload,
        autoHideTimeout: DEFAULT_AUTOHIDE_TIMOUT,
      };
    },
    showWarningToastAction: (
      state,
      action: PayloadAction<TShowToastPayload>,
    ) => {
      return {
        ...state,
        variant: 'warning',
        ...action.payload,
      };
    },
    showErrorToastAction: (state, action: PayloadAction<TShowToastPayload>) => {
      return {
        ...state,
        variant: 'error',
        ...action.payload,
      };
    },
  },
});

export const {
  hideGlobalToastAction,
  showSuccessToastAction,
  showWarningToastAction,
  showErrorToastAction,
} = toastStore.actions;

export default toastStore.reducer;
