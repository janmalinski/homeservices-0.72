import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/store';

const selectToast = (state: RootState) => state.toast;

export const selectIsGlobalToastVisible = createSelector(
  selectToast,
  s => !!s.message,
);

export const selectGlobalToastState = createSelector(selectToast, s => s);
